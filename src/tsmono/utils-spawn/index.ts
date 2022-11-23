/* spawn a process within one line:
 * await spawn('sleep', ['20']).p
 *
 */
import { ChildProcess, spawn } from "child_process";
import chalk from "chalk";
import fs from "fs";

const spawn_ = (cmd_and_args: string[], o: {
    title?: string,
    echo?: true,
    logfile?: string | true,
    exitcodes?: number[],
    cwd?: string
    stdin_string?: string
} = {}) => {
    const echo = o.echo ?? true
    const title = o.title || JSON.stringify(cmd_and_args)
    const logfile = o.logfile === true ? `${title}.log` : o.logfile
    const exitcodes = o.exitcodes || [0]

    let y: ChildProcess |undefined = undefined
    const promise = new Promise<{out: string, code: number}>((r,j) => {
        let out = ""
        y = spawn(cmd_and_args[0], cmd_and_args.slice(1), {
            stdio: [ 'pipe', 'pipe', 1],
            ...('cwd' in o ? { cwd: o.cwd } : {})
        })
        y.stdout?.on("data", (s) => { out += s; if (echo) console.log(""+s);})
        y.stderr?.on("data", (s) => { out += s; if (echo) console.log(""+s);})

        if (o.stdin_string) y.stdin!.write(o.stdin_string)

        y.on("close", (code, signal) => {
            if (code == 0) { r({code, out}); }
            if (logfile) fs.writeFileSync(logfile, out)
            console.log(`== ${title} exited with : ${code} `);
            if (!echo) console.log(out);
            if (exitcodes.includes(code as number))
                console.log(chalk.green(`${title} exited gracefully`));
            else
                console.log(chalk.red(`${title} exited with code ${code}`));
            j(`code ${code}`)
        })
    });

    return {
        promise,
        kill: () => y?.kill()
    }
}

export default spawn_
