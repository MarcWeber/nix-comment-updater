// should be moved into it's own package to drop chalk dependency ?
import { Config, Test, result_to_string, TestsResult, tests_failed, run } from 'u-testrunner';
import chalk from "chalk"

export const print_tests_results = (result: TestsResult, description?: string) => {
    if (tests_failed(result))
        console.log(chalk.red(`tests failed ${description}`), result_to_string(result).join("\n"));
    else
        console.log(chalk.green(`tests succeeded ${description}`), chalk.green(result_to_string(result).join("\n")));
}

export const run_tests_print = async (c: Config, f: Test) => {
    console.log(chalk.green(`tests ${c.description}`))
    print_tests_results(await run(c, f))
};
