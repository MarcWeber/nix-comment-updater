import to_nix from "utils-nix/to_nix"

export type ExtraKey = "version" | "pname" | "name"
export type ExtraKeys = { extra_keys: ExtraKey[] }
export type AddMeta = { add_meta?: true }
export type FullDerivation = { full_derivation?: true }

export const extra_keys = (o: any, json: {extra_keys?: ExtraKey[]}) => {
    const ek = json.extra_keys ?? []

    return {
        ...(ek.includes("version") ?  {version: o.version} : {}),
        ...(ek.includes("pname") ?  {pname: o.pname}: {}),
        ...(ek.includes("name") ?  {name: `${o.pname}-${o.version}`} : {})
    }
}
