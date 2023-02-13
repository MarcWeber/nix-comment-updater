import { UpdateBlockFunction } from ".."
import { action } from "/utils"
import { NIX_PATH} from "../utils-nix"
import to_nix from "u-nix/to_nix"
import { ExtraKeys, extra_keys, AddMeta, FullDerivation } from ".";
import { nix_prefetch_url } from "u-nix/nix-prefetch-url";
import { releases_by_name, Release } from "../utils-scraper-peclphp"


export type PeclJson =
{
    updater: "pecl",
    name: string,
    version?: "latest_unstable" | string,
    full_derivation?: true,
} & ExtraKeys & AddMeta & FullDerivation

export const updater: UpdateBlockFunction<PeclJson> = async (o) => {
    const j = o.json as PeclJson
    if (j.updater == 'pecl') {
        const pname = j.name
        const releases = await releases_by_name(pname);
        console.log("releases", releases);
        let release = (() => {
            if (j.version == "latest_unstable"){
                return releases[0]
            } else if (j.version){
                return releases.find((x) => x.version == j.version)
            } else {
                return releases.find((x) => x.state == "stable")
            }
        })()
        if (!release){
            throw `no relaese found for ${JSON.stringify(j)}`
        }

        const version = release.version
        const url = release.source_url

        const r = await nix_prefetch_url({url})

        const meta = () => ({
            // TODO
        })

        const sha256 = r.sha256

        return j.full_derivation
            ? to_nix(['__call', 'buildPecl', {
                pname, version, sha256,
                ...meta(),
                ...extra_keys({version, pname}, {extra_keys: ['name', 'version']}),
            }])
            : to_nix({ __outer: true, ...(j.add_meta ? meta() : {}), pname, version, sha256})

    }
}
