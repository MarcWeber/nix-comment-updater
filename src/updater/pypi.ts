/*
 * maybe add somethnig like date 2021-10-01 cause being latest means trouble ?
 * This way more stable results eventually can be produced ?
 */
import { UpdateBlockFunction } from ".."
import spawn from "utils-spawn";
import { action } from "/utils"
import { nix_prefetch_github, nix_prefetch_github_args } from "utils-nix/nix-prefetch-github";
import to_nix from "utils-nix/to_nix";
import { extra_keys } from ".";
import { first_matching } from "utils-select-version"

import axios from "axios";

export type PyPiJson =
{
    updater: "pypi",
    name: string,
    version?: string,

    src_fetcher?:  "fetchurl" | "fetchPypi",

    add_version?: true,
    add_meta?: true,

    full_derivation?: true,

    noSetupPy?: true,
}

// https://github.com/proger/python2nix/blob/master/python2nix/__main__.py


// 
export const pip_compare_versions = (version: string, p: string) => {
}


export const LICENSE_MAP: Record< string, string> = {
    'APL2': 'licenses.asl20',
    'ASL 2': 'licenses.asl20',
    'Apache 2.0': 'licenses.asl20',
    'BSD License': 'licenses.bsd',
    'BSD or Apache License, Version 2.0': 'licenses.bsd',
    'BSD': 'licenses.bsd',
    'GPL2': 'licenses.gpl2',
    'MIT licence': 'licenses.mit',
    'MIT License': 'licenses.mit',
    'MIT license': 'licenses.mit',
    'MIT': 'licenses.mit',
    'PSF or ZPL': 'licenses.psfl',
    'PSF': 'licenses.psfl',
    'http://www.apache.org/licenses/LICENSE-2.0': 'licenses.asl20',
    'http://www.opensource.org/licenses/mit-license.php': 'licenses.mit',
}

export const updater: UpdateBlockFunction<PyPiJson> = async (o) => {
    const j = o.json

    if (j.updater == 'pypi') {

        return action(`github ${JSON.stringify(j)} ${o.region.filename}`, async () => {

            j.src_fetcher = j.src_fetcher ?? "fetchPypi"

            const ppurl = `https://pypi.org/pypi/${j.name}/json`

            const rep = await axios.get(ppurl)
            // console.log(JSON.stringify(rep.data, undefined, 2));
            if (rep.status != 200) throw `status is ${rep.status}`

            const res = rep.data

            const info = res.info

            const version = j.version ?? info.version

            const releases = Object.entries(res.releases).map(([k,v]) => ({version: k, ...(v as any)[0]}))

            let d: any
            if (version in res.releases){
                d = res.releases[version]
            } else {
                d = first_matching(version, releases, (x) => x.version)
                if (!d) throw `no version found matching ${version}, versions: ${releases.map((x) => x.version)}}`
                console.log(`found ${JSON.stringify(d, undefined, 2)}`);
            }

            let call: any

            if (j.src_fetcher == "fetchPypi"){
                call = ['__call', 'fetchPypi', {
                    "__inherit": [null, 'pname', 'version'],
                    "sha256": d.digests.sha256
                }]

                // might be healthy to add always cause its used in mkPythonDerivation
                j.extra_keys = j.extra_keys ?? []
                if (!('pname'   in j.extra_keys)) j.extra_keys.push('pname')
                if (!('version' in j.extra_keys)) j.extra_keys.push('version')

            } else {
                call = ['__call', 'fetchurl', {
                    sha256: d.digests.sha256,
                    url: d.url
                }]
            }

            const pname = j.name

            const meta = () => ({
                meta : {
                    'description': info.description,
                    'license': ['__raw', LICENSE_MAP[res.license] ?? "undefined"],
                    'homepage': info.homepage,
                }
            })

            const noSetupPy = () => j.noSetupPy
                    ? {
                        phases: ["unpackPhase", "installPhase"],
                        // is it common that there are _test.py files as in python-typings ..?
                        // TODO: move such code into nixpkgs once its stable if
                        // its not there already
                        installPhase: `
                          find
                          t=$out/lib/\${python.libPrefix}/site-packages/${j.name};
                          mkdir -p $t;
                          if [ -f PKG-INFO -a -d src ]; then
                            echo 'PKG-INFO and src found'
                            set -x
                            \${pkgs.rsync}/bin/rsync -ra ./src/ $t/;
                            \${pkgs.rsync}/bin/rsync -ra ./ $t/;
                          else
                          echo "default"
                            \${pkgs.rsync}/bin/rsync -ra $src/src/${j.name}/ $t/;
                          fi
                          `
                    }
                    : {}

            return j.full_derivation
            ? to_nix(['__call', 'buildPythonPackage', {
                src: call,
                ...meta(),
                ...extra_keys({version: d.version, pname}, {extra_keys: ['name', 'version']}),
                ...noSetupPy()
            }])
            : to_nix({ __outer: true, src: call, ...noSetupPy(), ...(j.add_meta ? meta() : {}), ...extra_keys({version: d.version, pname}, j)})

        })
    }
}



/* {{{
{"info":{"author":"Nick Boyd Greenfield", 
  "author_email":"boyd.greenfield@gmail.com", 
  "bugtrack_url":null, 
  "classifiers":["Development Status :: 4 - Beta", 
  "Environment :: Web Environment", 
  "Framework :: IPython", 
  "Intended Audience :: Developers", 
  "License :: OSI Approved :: MIT License", 
  "Operating System :: OS Independent", 
  "Programming Language :: Python", 
  "Topic :: Database", 
  "Topic :: Database :: Front-Ends"], 
  "description":"``query``\n---------\n\n``query`` is a simple module for quickly, 
    interactively exploring a SQL\ndatabase. Together with IPython, 
  it supports quick tab-completion of table\nand column names, 
  convenience methods for quickly looking at data (e.g., 
      \n``.head()``, 
      ``.tail()``), 
  and the ability to get a rich interactive database\nconnection up in only 2 lines by setting a few required environmental\nvariables.\n\n.. image:: https://travis-ci.org/boydgreenfield/query.svg?branch=v0.1.4\n\n\nDemo in 2 lines\n```````````````\n\nExplore the included demo database:\n\n.. code:: python\n\n    from query import QueryDb\n    db = QueryDb(demo=True)\n\n\nReal-world use case in 2 lines\n``````````````````````````````\n\nOr set a few environmental variables (``QUERY_DB_DRIVER``, 
    \n``QUERY_DB_HOST``, 
  ``QUERY_DB_PORT``, 
  ``QUERY_DB_NAME``, 
  and\n``QUERY_DB_PASS``) and get started just as quickly:\n\n.. code:: python\n\n    from query import QueryDB  # capital 'B' is OK too :)\n    db = QueryDB()\n\n\nInteractive example\n```````````````````\n.. image:: https://github.com/boydgreenfield/query/raw/v0.1.2/docs/images/interactive_demo.gif?raw=True\n\n\n\nLinks\n`````\n* `Code and additional details on Github: <http://github.com/boydgreenfield/query/>`_", 
    "description_content_type":null, 
  "docs_url":null, 
  "download_url":"UNKNOWN", 
  "downloads":{"last_day":-1, 
    "last_month":-1, 
    "last_week":-1}, 
  "home_page":"http://github.com/boydgreenfield/query/", 
  "keywords":null, 
  "license":"MIT", 
  "maintainer":null, 
  "maintainer_email":null, 
  "name":"query", 
  "package_url":"https://pypi.org/project/query/", 
  "platform":"any", 
  "project_url":"https://pypi.org/project/query/", 
  "project_urls":{"Download":"UNKNOWN", 
    "Homepage":"http://github.com/boydgreenfield/query/"}, 
  "release_url":"https://pypi.org/project/query/0.1.4/", 
  "requires_dist":null, 
  "requires_python":null, 
  "summary":"Quick interactive exploration of SQL databases.", 
  "version":"0.1.4", 
  "yanked":false, 
  "yanked_reason":null}, 
  "last_serial":1499633, 
  "releases":{
  "0.1.0":[{"comment_text":"", 
    "digests":{"md5":"f06c3f47f0e8ed4db96f8d6c5304a2dd", 
      "sha256":"04de6306d80005deadfd703bc3e7fcf1f34ee68e2f01f6237d4259fa27acd46b"}, 
    "downloads":-1, 
    "filename":"query-0.1.0.tar.gz", 
    "has_sig":false, 
    "md5_digest":"f06c3f47f0e8ed4db96f8d6c5304a2dd", 
    "packagetype":"sdist", 
    "python_version":"source", 
    "requires_python":null, 
    "size":386944, 
    "upload_time":"2014-05-09T06:48:17", 
    "upload_time_iso_8601":"2014-05-09T06:48:17.458511Z", 
    "url":"https://files.pythonhosted.org/packages/8d/62/528d94d187d992ebaed2b3b82ac366c1843471f6fed27f1fc64be7054fc7/query-0.1.0.tar.gz", 
    "yanked":false, 
    "yanked_reason":null}], 
  "0.1.1":[{"comment_text":"", 
    "digests":{"md5":"955d8bf1bbebc4d61f35486a01c6df4e", 
      "sha256":"55e3031bf0408ea3828ae97cd97d4531c9fb851c62d03761b7ff3c91beac13b5"}, 
    "downloads":-1, 
    "filename":"query-0.1.1.tar.gz", 
    "has_sig":false, 
    "md5_digest":"955d8bf1bbebc4d61f35486a01c6df4e", 
    "packagetype":"sdist", 
    "python_version":"source", 
    "requires_python":null, 
    "size":387060, 
    "upload_time":"2014-05-09T17:04:37", 
    "upload_time_iso_8601":"2014-05-09T17:04:37.953791Z", 
    "url":"https://files.pythonhosted.org/packages/67/8f/a9462bdf77cf6deec90dd32911203e695d3f1a2370c1a55668d586d45cff/query-0.1.1.tar.gz", 
    "yanked":false, 
    "yanked_reason":null}], 
  "0.1.2":[{"comment_text":"", 
    "digests":{"md5":"b0eaf86fc45b0f0bec250f59d958a6e9", 
      "sha256":"a526839829c4bd96d8517edbcd73603c92e0674f9641929cf9c3bec409a0ff54"}, 
    "downloads":-1, 
    "filename":"query-0.1.2.tar.gz", 
    "has_sig":false, 
    "md5_digest":"b0eaf86fc45b0f0bec250f59d958a6e9", 
    "packagetype":"sdist", 
    "python_version":"source", 
    "requires_python":null, 
    "size":387085, 
    "upload_time":"2014-05-09T21:38:37", 
    "upload_time_iso_8601":"2014-05-09T21:38:37.039786Z", 
    "url":"https://files.pythonhosted.org/packages/8d/d1/94b9c0a4d9217e0939136c8011cd59fa2966def84e24cd64965829daaa61/query-0.1.2.tar.gz", 
    "yanked":false, 
    "yanked_reason":null}], 
  "0.1.3":[{"comment_text":"", 
    "digests":{"md5":"754f1e13cfd56c1a2d824862aca0ce40", 
      "sha256":"6d1016e49c0f98051802377b40334d3671c43dd3c62b19f795d979085e158745"}, 
    "downloads":-1, 
    "filename":"query-0.1.3.tar.gz", 
    "has_sig":false, 
    "md5_digest":"754f1e13cfd56c1a2d824862aca0ce40", 
    "packagetype":"sdist", 
    "python_version":"source", 
    "requires_python":null, 
    "size":387227, 
    "upload_time":"2014-05-30T16:29:11", 
    "upload_time_iso_8601":"2014-05-30T16:29:11.590185Z", 
    "url":"https://files.pythonhosted.org/packages/43/7e/6b4b213cbbb6fd80badd621477f92518fb7cc716173a047f3ed4e2658a87/query-0.1.3.tar.gz", 
    "yanked":false, 
    "yanked_reason":null}], 
  "0.1.4":[{"comment_text":"", 
    "digests":{"md5":"68efe98baa91b0b3617c553a999276a4", 
      "sha256":"d7ea720b2646c0fe7ea632c5443e86b86e1624od7b6786d5096627e5204efe992e"}, 
      de 
    "downloads":-1, 
    "filename":"query-0.1.4.tar.gz", 
    "has_sig":false, 
    "md5_digest":"68efe98baa91b0b3617c553a999276a4", 
    "packagetype":"sdist", 
    "python_version":"source", 
    "requires_python":null, 
    "size":387035, 
    "upload_time":"2015-04-10T18:51:23", 
    "upload_time_iso_8601":"2015-04-10T18:51:23.028937Z", 
    "url":"https://files.pythonhosted.org/packages/e1/1e/3fb4dc69ff757c9c0e107f7620b08051d856beee0db3e8be443f6e213401/query-0.1.4.tar.gz", 
    "yanked":false, 
    "yanked_reason":null}]}, 
  "urls":[{"comment_text":"", 
    "digests":{"md5":"68efe98baa91b0b3617c553a999276a4", 
      "sha256":"d7ea720b2646c0fe7ea632c5443e86b86e16247b6786d5096627e5204efe992e"}, 
    "downloads":-1, 
    "filename":"query-0.1.4.tar.gz", 
    "has_sig":false, 
    "md5_digest":"68efe98baa91b0b3617c553a999276a4", 
    "packagetype":"sdist", 
    "python_version":"source", 
    "requires_python":null, 
    "size":387035, 
    "upload_time":"2015-04-10T18:51:23", 
    "upload_time_iso_8601":"2015-04-10T18:51:23.028937Z", 
    "url":"https://files.pythonhosted.org/packages/e1/1e/3fb4dc69ff757c9c0e107f7620b08051d856beee0db3e8be443f6e213401/query-0.1.4.tar.gz", 
    "yanked":false, 
    "yanked_reason":null}], 
  "vulnerabilities":[]
  }
}}} */
