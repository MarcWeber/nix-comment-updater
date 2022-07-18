import { to_nix } from "/utils-nix"

export type ExtraKeys = "version" | "pname" | "name"

export const extra_keys = (o: any, json: {extra_keys?: ExtraKeys[]}) => {
    const ek = json.extra_keys ?? []

    return {
        ...(ek.includes("version") ?  {version: o.version} : {}),
        ...(ek.includes("pname") ?  {pname: o.pname}: {}),
        ...(ek.includes("name") ?  {name: `${o.pname}-${o.version}`} : {})
    }
}
