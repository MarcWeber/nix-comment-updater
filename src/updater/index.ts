import { to_nix } from "/utils-nix"

export type ExtraKeys = "version" | "name" | "name_with_version"

export const extra_keys = (o: any, json: {extra_keys?: ExtraKeys[]}) => {
    const ek = json.extra_keys ?? []

    return {
        ...(ek.includes("version") ?  {version: o.version} : {}),
        ...(ek.includes("name") ?  {name: o.name}: {}),
        ...(ek.includes("name_with_version") ?  {name: `${o.name}-${o.version}`} : {})
    }
}
