export type nix_path_key = "nixos"|"nixpkgs"|"nixos-config" | string
import spawn from "utils-spawn";
import fs from "fs";
import path from "path";

export const NIX_PATH: Record<nix_path_key, string> =
    Object.fromEntries((process.env['NIX_PATH'] ?? "").split(":").map((x) => x.split('=')))

export const PATH = process.env['PATH']!.split(':')

export const build_path = (path: string) =>
     spawn(['nix-build', '-A', path, NIX_PATH.nixpkgs], { }).promise.then((x) => x.out.trim())

export const nixpkgs_executable = async (executable: string) => {
    let d: Record< string, Promise<string>> = {}
    if (!(executable in d)){
        d[executable] = ( async ():Promise<string> => {
            for (let p of PATH ) {
                if (fs.existsSync(path.join(p, executable))){
                    return executable
                }
            }
            const A: Record< string, string> = {
                'nix-prefetch-git': 'nix-prefetch-git',
                'nix-prefetch-github': 'nix-prefetch-github',
                'ruby': 'ruby',
            }
            if (executable in A) {
                return `${ await build_path(A[executable])}/bin/${executable}`
            } else throw `${executable} not in path`
        })()
    }
    return d[executable]
}

// nix function calls can be represented by ['__call', func_name, .. args]
export const to_nix = (x:any):string => {

    const a = (x:any, np: boolean): string => {

        // maybe parenthesses
        const mp = (x: string) => np ? `(${x})` : x

        if (typeof x === 'object'){
            if (Array.isArray(x)){
                if (x[0] == '__call'){
                    return mp( [x[1], x.slice(2).map((x) => a(x, true)) ].join(" "))
                } else {
                    return `[${ x.map((x) => a(x, true)).join(" ")}]`
                }
            } else {

                const key_values = Object.entries(x).filter((x) => x[0] != '__outer').map((l) =>
                    `${l[0]} = ${a(l[1], false)}; `)

                return (x.__outer)
                    ? key_values.join("\n")
                    : `{ ${ key_values.join(" ")}}`
            }
        } else {
            // string bool etc
            return JSON.stringify(x)
        }
    }
    return a(x, false)

}
