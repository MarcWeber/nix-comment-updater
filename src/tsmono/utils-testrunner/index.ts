// replace deep-equal with lodash/isEqual?
import equal from "deep-equal"
import { exception_to_str } from "u-exception-to-string";
/* usage

import {run_tests_print} from 'u-testrunner';

await run_tests_print({
  'description': 'test',
  'timeout' : 2000,
}, async (runner) => {

  const d = (s: string) => runner.describe(`demo expectation ${s})

  {
    const p = d("should succeed")
    setTimeout(() => {p.resolve(); }, 200);
  }


  { // this is a notice, not a failure
    const p = d("should be implemented later")
    p.todo()
  }

  {
    const p = d("this expectation fails")
    p.fail()
  }

  {
    const p = d("should be true")
    p.expect_true(true)
  }

  {
    const p = d(`should cause exception "fail"`)
    p.expect_exception(() => throw "fail")
    // p.expect_exception(() => throw "fail", /^fail$/)
    // p.expect_exception(() => throw "fail", (e) => e.toString is fail or such )
  }

  {
    const p = d(`should cause promise faling with exception "fail"`)
       p.expect_exception(async () => throw "fail")
    // p.expect_exception(async () => throw "fail", /^fail$/)
    // p.expect_exception(async () => throw "fail", (e) => e.toString is fail or such )

  }

  {
    const p = d(`should be deep equal`)
    p.expect_deep_equal([1,2], [1,2])
  }

  // if this function fails, it test case will have a failure, too
  throw "failure"

})

To run in browser
use run, then tests_failed and result_to_string to get test result

==

Why not use chai, https://github.com/avajs/ava or something similar?
Because this is less code - its most simple by design :)

copy_results can be used to integrate serialized test resutls run somewhere
else eg in the browser into main test result.

What's really missing is allowing to run 'some' tests only.
But this highly depends on the what is to be tested.


const cases = ['that_block', 'another_block']


await run_tests_print({
  'description': 'test',
  'timeout' : 2000,
}, async (runner) => {
    if (cases.includes("that_block'))
        run_that_block_tests(runner)
    ...
})

*/
interface TestState {
    label: string;
    promise: PromiseLike<any>|undefined;
}

// serializable state representing test result (e.g. JSON)
export type TestsResult = {
    failed: Array<{label: string, failure: any}>,
    todo: Array<string>,
    passed: string[],
    timedout: string[],
}

export const copy_results = (from: TestsResult, to: TestsResult, prefix: string) => {
    const addp = (x: string) => `${prefix}${x}`
    to.failed    = [...to.failed, ...from.failed.map(x => ({...x, label: `${prefix}${x.label}`}))]
    to.passed = [...to.passed, ...from.passed.map(addp)]
    to.timedout  = [...to.timedout,  ...from.timedout.map(addp)]
    to.todo      = [...to.todo, ...from.todo.map(addp)]
}

const tests_result = () => ({
    failed: [],
    todo: [],
    passed: [],
    timedout: [] // gets populated at end of run()
})

export type TestsState = {
    _nr : number, // internal

    running: {[key: number]: TestState},
    result: TestsResult
}
export const tests_state = (): TestsState => ({
    _nr: 0,
    running: {},
    result: tests_result()
})

export const tests_failed = (result: TestsResult) => result.failed.length > 0 || result.timedout.length > 0

export const result_to_string = (tr:TestsResult) => {
    let r: string[] = []
    r.push(`passed: ${tr.passed.length}`)

    const add = (label: string, list: string[]) => {
        if (list.length > 0){
            r.push(`=== ${label}\n`)
        }
    }

    tr.failed.forEach((v, i) => {
        r.push(`failed: ${v.label}`);
        r = [" ", ...r, ...exception_to_str(v.failure).split("\n")];
    });

    tr.todo.forEach((v, i) => {
        r.push(`todo: ${v}`);
    });

    (tr.timedout ??[]).forEach((v, i) => {
        r.push(`timedout: ${v}`);
    });

    return r
}

export const print_tests_results = (result: TestsResult, description?: string) => {
    if (tests_failed(result))
        console.log(`=== :-( tests failed ${description}`, result_to_string(result));
    else
        console.log(`=== :-) tests passed ${description}`, result_to_string(result));
}
export const run_tests_print = async (c: Config, f: Test) => {
    console.log(`== ${c.description}`)
    print_tests_results(await run(c, f))
}

export interface Config {
    description: string;
    timeout: number;
    report_period?: number;
    report_state?: (state: TestsState) => void;
}

export type ExpectException = RegExp | ((e:any) => void)

export interface Runner {
    "promise": (p: Promise<any>, label?: string) => void,
        "state": TestsState, // for showing progress every x seconds or so ?
        "todo": (x: string) => void
        "describe": (label: string) => {
            "resolve": () => void,
            "todo": () => void,
            "fail": (x: string) => void,
            "expect_true": (x: boolean, reason?: string) => void, // TODO: drop reason ?
            "expect_all_true": (...x: boolean[]) => void,
            "expect_deep_equal": <T>(a: T, b: T, strict?: boolean) => void,
            "expect_exception": <T>(f: () => void, expect_exception?: ExpectException) => void,
            "expect_failing_promise": <T>(f: () => Promise<any>, expect_exception?: ExpectException) => Promise<void>,
        }
    "finally": (x: () => void) => void,
}

export type Test = (runner: Runner) => Promise<void>;

// export type EExceptionWhileRunningMatchExpectedException = {
//     error: string,
//     exception_to_be_matched: any,
//     caught_exception: any
// }

export const run = (
    cfg: Config,
    f: Test,
    o?: {state?: TestsState} // allow reusing state for multiple runs
): Promise<TestsResult> => {
    const finallies: Array<() => void>   = [];
    const state: TestsState = o?.state ?? tests_state()
    let timer: any;

    return new Promise((resolve, reject) => {

        const end_run = (why: string) => {
            clearTimeout(timer);
            state.result.timedout = Object.values(state.running).map(x => x.label)
            resolve(state.result);
            finallies.forEach((z) => z());
        };

        const track = (label: string) => {
            const next = state._nr++;
            state.running[next] = {
                promise: undefined,
                label,
            };

            return (p: PromiseLike<any|void>) => {
                state.running[next].promise = p;
                const done = () => {
                    delete state.running[next];
                    // console.log(`deleted ${nr}`)
                    if (Object.keys(state.running).length === 0) { end_run("no more running"); }
                };
                p.then(
                    (x) => { state.result.passed.push(`ok: ${label}`); done(); },
                    (x) => {
                        const e_str = exception_to_str(x)
                        console.log("failed", x, e_str)
                        state.result.failed.push({label, failure: e_str }); done(); },
                );
            };
        };
        const step = cfg.report_period || cfg.timeout;
        const print_and_restart = (timeout: number, first?: boolean) => {
            if (cfg.report_state && !first) { cfg.report_state(state); }
            if (timeout === 0) {
                end_run("ending run due to timeout");
            } else {
                timer = setTimeout(() => { print_and_restart(timeout - step); }, step);
            }
        };
        timer = setTimeout(() => { print_and_restart(cfg.timeout, true); } );

        const describe = (label: string) => {
            const d: any = {};
            d.promise = new Promise<void>((r, j) => {
                const assert_true = (b: boolean, reason?: string) => { if (b) { r(); } else { j(reason || "no reason given"); } };
                const expect_all_true = (...b: boolean[]) => {
                    const errs = []
                    for (let [k,v] of b.entries()) if (!v) errs.push(`argument ${k + 1} failed`);
                    if (errs.length > 0) j(errs.join(",\n"))
                    r()
                };

                const _expect_exception = (e:any, expect_exception?: ExpectException) => {
                    if (expect_exception) {
                        if (expect_exception instanceof RegExp) {
                            if (e.toString().match(expect_exception)) r();
                            else j({
                                error: `Expected exception to match given regex ${expect_exception}`,
                                exception: e
                            })
                        } else {
                            try {
                                expect_exception(e)
                                r()
                            } catch (e) {
                                j({
                                    'error': 'exception while looking at expected exception',
                                    'exception': e
                                })
                            }
                            // try {
                            //     if (expect_exception(e)) r();
                            //     else j(`got exception ${e} but not the one matching function`)
                            // } catch (e2){
                            //     j({
                            //         error: "exception-while-running-match-exception",
                            //         exception_to_be_matched: e,
                            //         caught_exception: e2,
                            //     } as EExceptionWhileRunningMatchExpectedException)
                            // }
                        }
                    }
                    else r() // we got any exception don't care what
                }

                d.resolve = r;
                d.todo = () => { r(); state.result.todo.push(label) };
                d.fail = j;
                d.expect_true = assert_true
                d.expect_all_true = expect_all_true
                d.expect_exception = (f: () => any, expect_exception?: ExpectException) => {
                    try {
                        f()
                        j(`exception expected`)
                    } catch (e){
                        _expect_exception(e, expect_exception)
                    }
                }
                d.expect_failing_promise = (f: () => Promise<any>, expect_exception?: RegExp | ((e:any) => boolean)) => {
                    const p = f()
                    return p.then(
                        () => j(`exception expected matching ${expect_exception?.toString()}`),
                        (e: any) => {
                            debugger;
                            _expect_exception(e, expect_exception)
                        })
                }

                d.expect_deep_equal = <T>(a: T, b: T, strict?: boolean) => {
                    assert_true(equal(a, b, { strict: !!strict }), `a to deep equal b\na:${JSON.stringify(a)}\nb:${JSON.stringify(b)}`)
                };
            });

            track(`${label}`)(d.promise);
            return d;
        };

        const promise = (p: Promise<any>, label?: string) => {
            // if you don't pass a lable use stack which will lead to the failing code
            const stack = (new Error()).stack
            return track(label ? label : stack!.toString())(p);
        };

        promise(
            f({
                promise, describe, state,
                todo: (s: string) => describe(s).todo(),
                finally: (z) => { finallies.push(z); },
            }), "test function runs without exception and returns within timeout"
        );
    });

};
