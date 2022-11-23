import { UpdateBlockFunction } from ".."
import { action } from "/utils"
import { NIX_PATH} from "utils-nix"
import to_nix from "utils-nix/to_nix"
import { ExtraKeys, extra_keys } from ".";
import { nix_prefetch_url } from "utils-nix/nix-prefetch-url";


export type FetchurlJson =
{
    fetchurl_url: string,
}

export const updater: UpdateBlockFunction<FetchurlJson> = async (o) => {
     const j = o.json as FetchurlJson
    if ('fetchurl_url' in o.json) {

        return action(`fetchurl ${j.fetchurl_url}`, async () => {


            const r = await nix_prefetch_url({url: j.fetchurl_url})

            return to_nix(["__call", "fetchurl", {
                url: j.fetchurl_url,
                sha256: r.sha256
            }])

        })
    }
}
