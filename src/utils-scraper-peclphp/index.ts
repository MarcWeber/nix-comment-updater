/* todo move into own package
 requires
    "xpath",
    "xmldom",
    "axios",
*/
import axios from "axios";

import xpath from "xpath";
import * as parse5 from "parse5";
// @ts-ignore
import * as xmlserializer from "xmlserializer";
// @ts-ignore
import xmldom from "xmldom";


import utils_debug from 'utils-debug'
const log = utils_debug('utils-scraper-pecl-php');

type State = "stable" | "beta" // ... ?

export type Release = {
    version: string,
    state: State,
    release_date_str: string // YYYY-MM-DD
    source_url: string
}

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <title>PECL :: Package :: xdebug</title>
    <link rel="shortcut icon" href="/favicon.ico">
    <link rel="alternate" type="application/rss+xml" title="RSS feed" href="https://pecl.php.net/feeds/latest.rss">
    <link rel="stylesheet" href="/css/style.css">
    </head>

<body >

<div><a id="TOP"></a></div>

<table class="head" cellspacing="0" cellpadding="0" width="100%">
    <tr>
        <td class="head-logo">
            <a href="/"><img src="/img/peclsmall.gif" alt="PECL :: The PHP Extension Community Library" width="106" height="55" style="margin: 5px;"></a><br>
        </td>

        <td class="head-menu">

                            <a href="/login.php" class="menuBlack">Login</a>
            
            &nbsp;|&nbsp;
            <a href="/packages.php" class="menuBlack">Packages</a>
            &nbsp;|&nbsp;
            <a href="/support.php" class="menuBlack">Support</a>
            &nbsp;|&nbsp;
            <a href="/bugs/" class="menuBlack">Bugs</a>

        </td>
    </tr>

    <tr>
        <td class="head-search" colspan="2">
            <form method="post" action="/search.php">
                <p class="head-search"><span class="accesskey">S</span>earch for
                    <input class="small" type="text" name="search_string" value="" size="20" accesskey="s">
                    in the
                    <select name="search_in" class="small">
                        <option value="packages">Packages</option>
                        <option value="site">This site (using Google)</option>
                        <option value="developers">Developers</option>
                        <option value="pecl-dev">Developer mailing list</option>
                        <option value="pecl-cvs">SVN commits mailing list</option>
                    </select>
                    <input type="image" src="/img/small_submit_white.gif" alt="search" style="vertical-align: middle;">&nbsp;<br>
                </p>
            </form>
        </td>
    </tr>
</table>

<table class="middle" cellspacing="0" cellpadding="0">
    <tr>
        <td class="sidebar_left">
            <ul class="side_pages">
    <li class="side_page"><a href="/" >Home</a></li>
    <li class="side_page"><a href="/news/" >News</a></li>
</ul>

            <strong>Documentation:</strong>

<ul class="side_pages">
    <li class="side_page"><a href="/support.php" >Support</a></li>
</ul>

            <strong>Downloads:</strong>

<ul class="side_pages">
    <li class="side_page">
        <a href="/packages.php" >Browse Packages</a>
    </li>

    <li class="side_page">
        <a href="/package-search.php" >Search Packages</a>
    </li>

    <li class="side_page">
        <a href="/package-stats.php" >Download Statistics</a>
    </li>
</ul>

            
                    </td>

        <td class="content">
            
<a href="/packages.php">Top Level</a> :: <a href="/packages.php?catpid=25&catname=PHP">PHP</a>
    :: xdebug


<h2 style="text-align:center">
    xdebug        </h2>


<table cellpadding="0" cellspacing="1" style="width: 90%; border: 0px;">
    <tr>
        <td style="background-color: #000000">
            <table cellpadding="2" cellspacing="1" style="width: 100%; border: 0px;">
                <tr style="background-color: #CCCCCC;">
                    <th colspan="2">Package Information</th>
                </tr>

                <tr>
                    <th valign="top" style="background-color: #cccccc">Summary</th>
                    <td valign="top" style="background-color: #e8e8e8">Xdebug is a debugging and productivity extension for PHP</td>
                </tr>

                <tr>
                    <th valign="top" style="background-color: #cccccc">Maintainers</th>
                    <td valign="top" style="background-color: #e8e8e8">
                                                    Derick Rethans                                                            &lt;<a href="/account-mail.php?handle=derick">
                                    derick at php dot net                                </a>&gt;
                                                        (lead)
                                                            [<a href="/wishlist.php/derick">wishlist</a>]
                                                        [<a href="/user/derick">details</a>]<br>
                                            </td>
                </tr>

                <tr>
                    <th valign="top" style="background-color: #cccccc">License</th>
                    <td valign="top" style="background-color: #e8e8e8">BSD style</td>
                </tr>

                <tr>
                    <th valign="top" style="background-color: #cccccc">Description</th>
                    <td valign="top" style="background-color: #e8e8e8">Xdebug and provides a range of features to improve the PHP development<br />
experience.<br />
<br />
Step Debugging<br />
    A way to step through your code in your IDE or editor while the script is<br />
    executing.<br />
<br />
Improvements to PHP&#039;s error reporting<br />
    An improved var_dump() function, stack traces for Notices, Warnings, Errors<br />
    and Exceptions to highlight the code path to the error<br />
<br />
Tracing<br />
    Writes every function call, with arguments and invocation location to disk.<br />
    Optionally also includes every variable assignment and return value for<br />
    each function.<br />
<br />
Profiling<br />
    Allows you, with the help of visualisation tools, to analyse the<br />
    performance of your PHP application and find bottlenecks.<br />
<br />
Code Coverage Analysis<br />
    To show which parts of your code base are executed when running unit tests<br />
    with PHP Unit.</td>
                </tr>

                                    <tr>
                        <th valign="top" style="background-color: #cccccc">Homepage</th>
                        <td valign="top" style="background-color: #e8e8e8">
                            <a href="https://xdebug.org/">
                                https://xdebug.org/                            </a>
                        </td>
                    </tr>
                
                
                
            </table>
        </td>
    </tr>
</table>


<br>
<table border="0" cellspacing="3" cellpadding="3" height="48" width="90%" align="center">
    <tr>
        <td align="center">[ <a href="/get/xdebug">Latest Tarball</a> ]</td>
        <td align="center">[
                            <a href="/package-changelog.php?package=xdebug">
                    Changelog
                </a>
                    ]</td>
        <td align="center">
            [ <a href="/package-stats.php?pid=214&amp;rid=&amp;cid=25">
                View Statistics
            </a> ]
        </td>
    </tr>
    <tr>
        <td align="center">
                            [ <a href="https://github.com/xdebug/xdebug" target="_blank">Browse Source</a> ]
                    </td>

        <td align="center">
                            [ <a href="https://bugs.xdebug.org">Package Bugs</a> ]
                    </td>

        <td align="center">
                            [ <a href="https://xdebug.org/docs/">
                    View Documentation
                </a> ]
                    </td>
    </tr>

    </table>

<br>

    <table cellpadding="0" cellspacing="1" style="width: 90%; border: 0px;">
        <tr>
            <td style="background-color: #000000">
                <table cellpadding="2" cellspacing="1" style="width: 100%; border: 0px;">
                    <tr style="background-color: #CCCCCC;">
                        <th colspan="5">Available Releases</th>
                    </tr>

            <tr>
            <th valign="top" style="background-color: #ffffff">Version</th>
            <th valign="top" style="background-color: #ffffff">State</th>
            <th valign="top" style="background-color: #ffffff">Release Date</th>
            <th valign="top" style="background-color: #ffffff">Downloads</th>
            <th valign="top" style="background-color: #ffffff">&nbsp;</th>
        </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;3&period;2&period;0alpha3">3&period;2&period;0alpha3</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2022-08-24</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-3.2.0alpha3.tgz">xdebug-3.2.0alpha3.tgz</a> (238.5kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=3&period;2&period;0alpha3">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;3&period;2&period;0alpha2">3&period;2&period;0alpha2</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2022-07-25</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-3.2.0alpha2.tgz">xdebug-3.2.0alpha2.tgz</a> (238.4kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=3&period;2&period;0alpha2">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;3&period;2&period;0alpha1">3&period;2&period;0alpha1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2022-07-20</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-3.2.0alpha1.tgz">xdebug-3.2.0alpha1.tgz</a> (238.3kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=3&period;2&period;0alpha1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;3&period;1&period;5">3&period;1&period;5</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2022-06-06</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-3.1.5.tgz">xdebug-3.1.5.tgz</a> (226.6kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=3&period;1&period;5">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;3&period;1&period;4">3&period;1&period;4</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2022-04-04</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-3.1.4.tgz">xdebug-3.1.4.tgz</a> (226.3kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=3&period;1&period;4">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;3&period;1&period;3">3&period;1&period;3</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2022-02-01</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-3.1.3.tgz">xdebug-3.1.3.tgz</a> (224.8kB)&nbsp;&nbsp;<a href="/package/xdebug/3.1.3/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=3&period;1&period;3">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;3&period;1&period;2">3&period;1&period;2</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2021-12-01</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-3.1.2.tgz">xdebug-3.1.2.tgz</a> (224.6kB)&nbsp;&nbsp;<a href="/package/xdebug/3.1.2/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=3&period;1&period;2">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;3&period;1&period;1">3&period;1&period;1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2021-10-15</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-3.1.1.tgz">xdebug-3.1.1.tgz</a> (224.3kB)&nbsp;&nbsp;<a href="/package/xdebug/3.1.1/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=3&period;1&period;1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;3&period;1&period;0">3&period;1&period;0</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2021-10-04</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-3.1.0.tgz">xdebug-3.1.0.tgz</a> (223.8kB)&nbsp;&nbsp;<a href="/package/xdebug/3.1.0/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=3&period;1&period;0">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;3&period;1&period;0beta2">3&period;1&period;0beta2</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2021-09-07</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-3.1.0beta2.tgz">xdebug-3.1.0beta2.tgz</a> (222.6kB)&nbsp;&nbsp;<a href="/package/xdebug/3.1.0beta2/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=3&period;1&period;0beta2">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;3&period;1&period;0beta1">3&period;1&period;0beta1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2021-09-06</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-3.1.0beta1.tgz">xdebug-3.1.0beta1.tgz</a> (222.4kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=3&period;1&period;0beta1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;3&period;0&period;4">3&period;0&period;4</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2021-04-08</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-3.0.4.tgz">xdebug-3.0.4.tgz</a> (210.8kB)&nbsp;&nbsp;<a href="/package/xdebug/3.0.4/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=3&period;0&period;4">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;3&period;0&period;3">3&period;0&period;3</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2021-02-22</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-3.0.3.tgz">xdebug-3.0.3.tgz</a> (210.9kB)&nbsp;&nbsp;<a href="/package/xdebug/3.0.3/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=3&period;0&period;3">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;3&period;0&period;2">3&period;0&period;2</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2021-01-04</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-3.0.2.tgz">xdebug-3.0.2.tgz</a> (210.8kB)&nbsp;&nbsp;<a href="/package/xdebug/3.0.2/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=3&period;0&period;2">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;3&period;0&period;1">3&period;0&period;1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2020-12-04</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-3.0.1.tgz">xdebug-3.0.1.tgz</a> (209.4kB)&nbsp;&nbsp;<a href="/package/xdebug/3.0.1/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=3&period;0&period;1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;3&period;0&period;0">3&period;0&period;0</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2020-11-25</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-3.0.0.tgz">xdebug-3.0.0.tgz</a> (185.7kB)&nbsp;&nbsp;<a href="/package/xdebug/3.0.0/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=3&period;0&period;0">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;3&period;0&period;0RC1">3&period;0&period;0RC1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2020-11-16</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-3.0.0RC1.tgz">xdebug-3.0.0RC1.tgz</a> (184.9kB)&nbsp;&nbsp;<a href="/package/xdebug/3.0.0RC1/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=3&period;0&period;0RC1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;3&period;0&period;0beta1">3&period;0&period;0beta1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2020-10-14</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-3.0.0beta1.tgz">xdebug-3.0.0beta1.tgz</a> (184.6kB)&nbsp;&nbsp;<a href="/package/xdebug/3.0.0beta1/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=3&period;0&period;0beta1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;9&period;8">2&period;9&period;8</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2020-09-28</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.9.8.tgz">xdebug-2.9.8.tgz</a> (239.5kB)&nbsp;&nbsp;<a href="/package/xdebug/2.9.8/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;9&period;8">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;9&period;7">2&period;9&period;7</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2020-09-16</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.9.7.tgz">xdebug-2.9.7.tgz</a> (239.4kB)&nbsp;&nbsp;<a href="/package/xdebug/2.9.7/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;9&period;7">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;9&period;6">2&period;9&period;6</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2020-05-29</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.9.6.tgz">xdebug-2.9.6.tgz</a> (238.2kB)&nbsp;&nbsp;<a href="/package/xdebug/2.9.6/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;9&period;6">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;9&period;5">2&period;9&period;5</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2020-04-25</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.9.5.tgz">xdebug-2.9.5.tgz</a> (238.0kB)&nbsp;&nbsp;<a href="/package/xdebug/2.9.5/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;9&period;5">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;9&period;4">2&period;9&period;4</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2020-03-23</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.9.4.tgz">xdebug-2.9.4.tgz</a> (238.0kB)&nbsp;&nbsp;<a href="/package/xdebug/2.9.4/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;9&period;4">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;9&period;3">2&period;9&period;3</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2020-03-13</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.9.3.tgz">xdebug-2.9.3.tgz</a> (237.8kB)&nbsp;&nbsp;<a href="/package/xdebug/2.9.3/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;9&period;3">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;9&period;2">2&period;9&period;2</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2020-01-31</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.9.2.tgz">xdebug-2.9.2.tgz</a> (237.3kB)&nbsp;&nbsp;<a href="/package/xdebug/2.9.2/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;9&period;2">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;9&period;1">2&period;9&period;1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2020-01-16</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.9.1.tgz">xdebug-2.9.1.tgz</a> (237.9kB)&nbsp;&nbsp;<a href="/package/xdebug/2.9.1/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;9&period;1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;9&period;0">2&period;9&period;0</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2019-12-09</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.9.0.tgz">xdebug-2.9.0.tgz</a> (237.2kB)&nbsp;&nbsp;<a href="/package/xdebug/2.9.0/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;9&period;0">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;8&period;1">2&period;8&period;1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2019-12-02</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.8.1.tgz">xdebug-2.8.1.tgz</a> (232.6kB)&nbsp;&nbsp;<a href="/package/xdebug/2.8.1/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;8&period;1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;8&period;0">2&period;8&period;0</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2019-10-31</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.8.0.tgz">xdebug-2.8.0.tgz</a> (232.5kB)&nbsp;&nbsp;<a href="/package/xdebug/2.8.0/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;8&period;0">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;8&period;0beta2">2&period;8&period;0beta2</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2019-08-26</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.8.0beta2.tgz">xdebug-2.8.0beta2.tgz</a> (232.4kB)&nbsp;&nbsp;<a href="/package/xdebug/2.8.0beta2/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;8&period;0beta2">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;8&period;0beta1">2&period;8&period;0beta1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2019-07-25</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.8.0beta1.tgz">xdebug-2.8.0beta1.tgz</a> (231.7kB)&nbsp;&nbsp;<a href="/package/xdebug/2.8.0beta1/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;8&period;0beta1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;8&period;0alpha1">2&period;8&period;0alpha1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2019-06-28</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.8.0alpha1.tgz">xdebug-2.8.0alpha1.tgz</a> (230.5kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;8&period;0alpha1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;7&period;2">2&period;7&period;2</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2019-05-06</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.7.2.tgz">xdebug-2.7.2.tgz</a> (225.6kB)&nbsp;&nbsp;<a href="/package/xdebug/2.7.2/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;7&period;2">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;7&period;1">2&period;7&period;1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2019-04-05</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.7.1.tgz">xdebug-2.7.1.tgz</a> (225.2kB)&nbsp;&nbsp;<a href="/package/xdebug/2.7.1/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;7&period;1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;7&period;0">2&period;7&period;0</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2019-03-06</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.7.0.tgz">xdebug-2.7.0.tgz</a> (224.9kB)&nbsp;&nbsp;<a href="/package/xdebug/2.7.0/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;7&period;0">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;7&period;0RC2">2&period;7&period;0RC2</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2019-02-15</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.7.0RC2.tgz">xdebug-2.7.0RC2.tgz</a> (224.1kB)&nbsp;&nbsp;<a href="/package/xdebug/2.7.0RC2/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;7&period;0RC2">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;7&period;0RC1">2&period;7&period;0RC1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2019-02-01</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.7.0RC1.tgz">xdebug-2.7.0RC1.tgz</a> (221.9kB)&nbsp;&nbsp;<a href="/package/xdebug/2.7.0RC1/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;7&period;0RC1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;7&period;0beta1">2&period;7&period;0beta1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2018-09-20</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.7.0beta1.tgz">xdebug-2.7.0beta1.tgz</a> (221.0kB)&nbsp;&nbsp;<a href="/package/xdebug/2.7.0beta1/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;7&period;0beta1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;6&period;1">2&period;6&period;1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2018-08-01</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.6.1.tgz">xdebug-2.6.1.tgz</a> (277.3kB)&nbsp;&nbsp;<a href="/package/xdebug/2.6.1/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;6&period;1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;7&period;0alpha1">2&period;7&period;0alpha1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2018-04-03</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.7.0alpha1.tgz">xdebug-2.7.0alpha1.tgz</a> (277.9kB)&nbsp;&nbsp;<a href="/package/xdebug/2.7.0alpha1/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;7&period;0alpha1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;6&period;0">2&period;6&period;0</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2018-01-29</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.6.0.tgz">xdebug-2.6.0.tgz</a> (277.0kB)&nbsp;&nbsp;<a href="/package/xdebug/2.6.0/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;6&period;0">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;6&period;0RC2">2&period;6&period;0RC2</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2018-01-23</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.6.0RC2.tgz">xdebug-2.6.0RC2.tgz</a> (277.0kB)&nbsp;&nbsp;<a href="/package/xdebug/2.6.0RC2/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;6&period;0RC2">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;6&period;0beta1">2&period;6&period;0beta1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2017-12-28</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.6.0beta1.tgz">xdebug-2.6.0beta1.tgz</a> (273.1kB)&nbsp;&nbsp;<a href="/package/xdebug/2.6.0beta1/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;6&period;0beta1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;6&period;0alpha1">2&period;6&period;0alpha1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2017-12-02</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.6.0alpha1.tgz">xdebug-2.6.0alpha1.tgz</a> (269.9kB)&nbsp;&nbsp;<a href="/package/xdebug/2.6.0alpha1/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;6&period;0alpha1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;5&period;5">2&period;5&period;5</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2017-06-21</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.5.5.tgz">xdebug-2.5.5.tgz</a> (272.9kB)&nbsp;&nbsp;<a href="/package/xdebug/2.5.5/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;5&period;5">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;5&period;4">2&period;5&period;4</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2017-05-15</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.5.4.tgz">xdebug-2.5.4.tgz</a> (272.8kB)&nbsp;&nbsp;<a href="/package/xdebug/2.5.4/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;5&period;4">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;5&period;3">2&period;5&period;3</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2017-04-18</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.5.3.tgz">xdebug-2.5.3.tgz</a> (272.5kB)&nbsp;&nbsp;<a href="/package/xdebug/2.5.3/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;5&period;3">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;5&period;2">2&period;5&period;2</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2017-04-17</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.5.2.tgz">xdebug-2.5.2.tgz</a> (272.5kB)&nbsp;&nbsp;<a href="/package/xdebug/2.5.2/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;5&period;2">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;5&period;1">2&period;5&period;1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2017-02-26</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.5.1.tgz">xdebug-2.5.1.tgz</a> (271.8kB)&nbsp;&nbsp;<a href="/package/xdebug/2.5.1/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;5&period;1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;5&period;0">2&period;5&period;0</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2016-12-04</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.5.0.tgz">xdebug-2.5.0.tgz</a> (261.4kB)&nbsp;&nbsp;<a href="/package/xdebug/2.5.0/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;5&period;0">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;5&period;0RC1">2&period;5&period;0RC1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2016-11-12</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.5.0RC1.tgz">xdebug-2.5.0RC1.tgz</a> (260.8kB)&nbsp;&nbsp;<a href="/package/xdebug/2.5.0RC1/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;5&period;0RC1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;4&period;1">2&period;4&period;1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2016-08-02</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.4.1.tgz">xdebug-2.4.1.tgz</a> (259.3kB)&nbsp;&nbsp;<a href="/package/xdebug/2.4.1/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;4&period;1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;4&period;0">2&period;4&period;0</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2016-03-04</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.4.0.tgz">xdebug-2.4.0.tgz</a> (258.6kB)&nbsp;&nbsp;<a href="/package/xdebug/2.4.0/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;4&period;0">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;4&period;0RC4">2&period;4&period;0RC4</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2016-01-27</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.4.0RC4.tgz">xdebug-2.4.0RC4.tgz</a> (258.3kB)&nbsp;&nbsp;<a href="/package/xdebug/2.4.0RC4/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;4&period;0RC4">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;4&period;0RC3">2&period;4&period;0RC3</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2015-12-12</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.4.0RC3.tgz">xdebug-2.4.0RC3.tgz</a> (257.8kB)&nbsp;&nbsp;<a href="/package/xdebug/2.4.0RC3/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;4&period;0RC3">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;4&period;0RC2">2&period;4&period;0RC2</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2015-12-03</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.4.0RC2.tgz">xdebug-2.4.0RC2.tgz</a> (257.3kB)&nbsp;&nbsp;<a href="/package/xdebug/2.4.0RC2/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;4&period;0RC2">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;4&period;0RC1">2&period;4&period;0RC1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2015-11-21</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.4.0RC1.tgz">xdebug-2.4.0RC1.tgz</a> (256.9kB)&nbsp;&nbsp;<a href="/package/xdebug/2.4.0RC1/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;4&period;0RC1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;4&period;0beta1">2&period;4&period;0beta1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2015-11-09</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.4.0beta1.tgz">xdebug-2.4.0beta1.tgz</a> (263.0kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;4&period;0beta1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;3&period;3">2&period;3&period;3</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2015-11-09</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.3.3.tgz">xdebug-2.3.3.tgz</a> (262.1kB)&nbsp;&nbsp;<a href="/package/xdebug/2.3.3/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;3&period;3">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;3&period;2">2&period;3&period;2</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2015-03-22</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.3.2.tgz">xdebug-2.3.2.tgz</a> (260.0kB)&nbsp;&nbsp;<a href="/package/xdebug/2.3.2/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;3&period;2">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;3&period;1">2&period;3&period;1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2015-02-24</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.3.1.tgz">xdebug-2.3.1.tgz</a> (260.0kB)&nbsp;&nbsp;<a href="/package/xdebug/2.3.1/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;3&period;1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;3&period;0">2&period;3&period;0</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2015-02-22</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.3.0.tgz">xdebug-2.3.0.tgz</a> (259.9kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;3&period;0">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;2&period;7">2&period;2&period;7</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2015-01-22</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.2.7.tgz">xdebug-2.2.7.tgz</a> (250.4kB)&nbsp;&nbsp;<a href="/package/xdebug/2.2.7/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;2&period;7">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;2&period;6">2&period;2&period;6</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2014-11-15</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.2.6.tgz">xdebug-2.2.6.tgz</a> (250.2kB)&nbsp;&nbsp;<a href="/package/xdebug/2.2.6/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;2&period;6">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;2&period;5">2&period;2&period;5</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2014-04-29</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.2.5.tgz">xdebug-2.2.5.tgz</a> (249.8kB)&nbsp;&nbsp;<a href="/package/xdebug/2.2.5/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;2&period;5">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;2&period;4">2&period;2&period;4</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2014-03-01</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.2.4.tgz">xdebug-2.2.4.tgz</a> (249.8kB)&nbsp;&nbsp;<a href="/package/xdebug/2.2.4/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;2&period;4">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;2&period;3">2&period;2&period;3</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2013-05-22</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.2.3.tgz">xdebug-2.2.3.tgz</a> (244.7kB)&nbsp;&nbsp;<a href="/package/xdebug/2.2.3/windows"><img src="/img/windows-icon.png" />DLL</a></td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;2&period;3">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;2&period;2">2&period;2&period;2</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2013-03-23</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.2.2.tgz">xdebug-2.2.2.tgz</a> (244.3kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;2&period;2">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;2&period;1">2&period;2&period;1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2012-07-14</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.2.1.tgz">xdebug-2.2.1.tgz</a> (242.2kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;2&period;1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;2&period;0">2&period;2&period;0</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2012-05-08</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.2.0.tgz">xdebug-2.2.0.tgz</a> (241.9kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;2&period;0">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;2&period;0RC2">2&period;2&period;0RC2</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2012-04-28</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.2.0RC2.tgz">xdebug-2.2.0RC2.tgz</a> (238.9kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;2&period;0RC2">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;2&period;0RC1">2&period;2&period;0RC1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2012-03-13</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.2.0RC1.tgz">xdebug-2.2.0RC1.tgz</a> (238.6kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;2&period;0RC1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;1&period;4">2&period;1&period;4</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2012-03-13</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.1.4.tgz">xdebug-2.1.4.tgz</a> (301.5kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;1&period;4">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;1&period;3">2&period;1&period;3</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2012-01-26</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.1.3.tgz">xdebug-2.1.3.tgz</a> (300.3kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;1&period;3">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;1&period;2">2&period;1&period;2</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2011-07-28</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.1.2.tgz">xdebug-2.1.2.tgz</a> (297.1kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;1&period;2">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;1&period;1">2&period;1&period;1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2011-03-30</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.1.1.tgz">xdebug-2.1.1.tgz</a> (296.1kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;1&period;1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;1&period;1RC1">2&period;1&period;1RC1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2011-03-22</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.1.1RC1.tgz">xdebug-2.1.1RC1.tgz</a> (296.0kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;1&period;1RC1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;1&period;0">2&period;1&period;0</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2010-06-29</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.1.0.tgz">xdebug-2.1.0.tgz</a> (294.3kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;1&period;0">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;1&period;0RC1">2&period;1&period;0RC1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2010-04-06</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.1.0RC1.tgz">xdebug-2.1.0RC1.tgz</a> (292.0kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;1&period;0RC1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;1&period;0beta3">2&period;1&period;0beta3</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2010-02-27</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.1.0beta3.tgz">xdebug-2.1.0beta3.tgz</a> (291.2kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;1&period;0beta3">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;1&period;0beta2">2&period;1&period;0beta2</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2010-02-03</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.1.0beta2.tgz">xdebug-2.1.0beta2.tgz</a> (290.8kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;1&period;0beta2">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;1&period;0beta1">2&period;1&period;0beta1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2010-01-02</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.1.0beta1.tgz">xdebug-2.1.0beta1.tgz</a> (288.7kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;1&period;0beta1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;0&period;5">2&period;0&period;5</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2009-07-13</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.0.5.tgz">xdebug-2.0.5.tgz</a> (282.5kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;0&period;5">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;0&period;4">2&period;0&period;4</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2008-12-30</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.0.4.tgz">xdebug-2.0.4.tgz</a> (281.7kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;0&period;4">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;0&period;3">2&period;0&period;3</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2008-04-09</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.0.3.tgz">xdebug-2.0.3.tgz</a> (279.6kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;0&period;3">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;0&period;2">2&period;0&period;2</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2007-11-11</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.0.2.tgz">xdebug-2.0.2.tgz</a> (273.1kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;0&period;2">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;0&period;1">2&period;0&period;1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2007-10-21</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.0.1.tgz">xdebug-2.0.1.tgz</a> (272.5kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;0&period;1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;0&period;0">2&period;0&period;0</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2007-07-18</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.0.0.tgz">xdebug-2.0.0.tgz</a> (266.0kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;0&period;0">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;0&period;0RC4">2&period;0&period;0RC4</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2007-05-17</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.0.0RC4.tgz">xdebug-2.0.0RC4.tgz</a> (262.9kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;0&period;0RC4">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;0&period;0RC3">2&period;0&period;0RC3</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2007-01-31</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.0.0RC3.tgz">xdebug-2.0.0RC3.tgz</a> (255.6kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;0&period;0RC3">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;0&period;0RC2">2&period;0&period;0RC2</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2006-12-24</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.0.0RC2.tgz">xdebug-2.0.0RC2.tgz</a> (253.7kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;0&period;0RC2">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;0&period;0RC1">2&period;0&period;0RC1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2006-10-08</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.0.0RC1.tgz">xdebug-2.0.0RC1.tgz</a> (246.4kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;0&period;0RC1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;0&period;0beta6">2&period;0&period;0beta6</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2006-06-30</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.0.0beta6.tgz">xdebug-2.0.0beta6.tgz</a> (236.3kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;0&period;0beta6">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;0&period;0beta5">2&period;0&period;0beta5</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2005-12-31</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.0.0beta5.tgz">xdebug-2.0.0beta5.tgz</a> (225.0kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;0&period;0beta5">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;0&period;0beta4">2&period;0&period;0beta4</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2005-09-24</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.0.0beta4.tgz">xdebug-2.0.0beta4.tgz</a> (223.0kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;0&period;0beta4">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;0&period;0beta3">2&period;0&period;0beta3</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2005-05-12</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.0.0beta3.tgz">xdebug-2.0.0beta3.tgz</a> (193.2kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;0&period;0beta3">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;0&period;0beta2">2&period;0&period;0beta2</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2004-11-28</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.0.0beta2.tgz">xdebug-2.0.0beta2.tgz</a> (191.0kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;0&period;0beta2">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;2&period;0&period;0beta1">2&period;0&period;0beta1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2004-09-15</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-2.0.0beta1.tgz">xdebug-2.0.0beta1.tgz</a> (188.6kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=2&period;0&period;0beta1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;1&period;3&period;2">1&period;3&period;2</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2004-06-30</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-1.3.2.tgz">xdebug-1.3.2.tgz</a> (150.0kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=1&period;3&period;2">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;1&period;3&period;1">1&period;3&period;1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2004-04-06</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-1.3.1.tgz">xdebug-1.3.1.tgz</a> (149.9kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=1&period;3&period;1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;1&period;3&period;0">1&period;3&period;0</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2003-12-26</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-1.3.0.tgz">xdebug-1.3.0.tgz</a> (149.4kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=1&period;3&period;0">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;1&period;3&period;0rc2">1&period;3&period;0rc2</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2003-11-08</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-1.3.0rc2.tgz">xdebug-1.3.0rc2.tgz</a> (149.5kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=1&period;3&period;0rc2">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;1&period;3&period;0rc1">1&period;3&period;0rc1</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">beta</td>
                <td valign="top" style="background-color: #e8e8e8">2003-09-18</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-1.3.0rc1.tgz">xdebug-1.3.0rc1.tgz</a> (155.8kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=1&period;3&period;0rc1">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

                    
            <tr>
                <th valign="top" style="background-color: #cccccc">
                    <a href="/package/xdebug&sol;1&period;2&period;0">1&period;2&period;0</a>
                </th>
                <td valign="top" style="background-color: #e8e8e8">stable</td>
                <td valign="top" style="background-color: #e8e8e8">2003-06-08</td>
                <td valign="top" style="background-color: #e8e8e8"><a href="/get/xdebug-1.2.0.tgz">xdebug-1.2.0.tgz</a> (57.2kB)</td>
                <td valign="top" style="background-color: #e8e8e8">
                    <small>
                    [
                        <a href="/package-changelog.php?package=xdebug&release=1&period;2&period;0">
                            Changelog
                        </a>
                    ]
                    </small>
                </td>
            </tr>

            
                </table>
            </td>
        </tr>
    </table>

    <br><br>

<table cellpadding="0" cellspacing="1" style="width: 90%; border: 0px;">
    <tr>
        <td style="background-color: #000000">
            <table cellpadding="2" cellspacing="1" style="width: 100%; border: 0px;">
                <tr style="background-color: #CCCCCC;">
                    <th colspan="2">Dependencies</th>
                </tr>

    
                                                                                                        
            <tr>
                <th valign="top" style="background-color: #cccccc">Release 3.2.0alpha3:</th>
                <td valign="top" style="background-color: #e8e8e8">PHP Version: PHP version 8.2.99 or older<br />PHP Version: PHP 8.0.0 or newer<br />PEAR Package: <a href="https://pear.php.net/package/PEAR">PEAR</a> 1.9.1 or newer<br /></td>
            </tr>
            
                                                                                                        
            <tr>
                <th valign="top" style="background-color: #cccccc">Release 3.2.0alpha2:</th>
                <td valign="top" style="background-color: #e8e8e8">PHP Version: PHP version 8.2.99 or older<br />PHP Version: PHP 8.0.0 or newer<br />PEAR Package: <a href="https://pear.php.net/package/PEAR">PEAR</a> 1.9.1 or newer<br /></td>
            </tr>
            
                                                                                                        
            <tr>
                <th valign="top" style="background-color: #cccccc">Release 3.2.0alpha1:</th>
                <td valign="top" style="background-color: #e8e8e8">PHP Version: PHP version 8.2.99 or older<br />PHP Version: PHP 8.0.0 or newer<br />PEAR Package: <a href="https://pear.php.net/package/PEAR">PEAR</a> 1.9.1 or newer<br /></td>
            </tr>
            
            <tr>
            <td style="background-color: #e8e8e8" colspan="2">
                Dependencies for older releases can be found on the release overview page.
            </td>
        </tr>
                </table>
        </td>
    </tr>
</table>


        </td>

        
    </tr>
</table>

<table class="foot" cellspacing="0" cellpadding="0">
    <tr>
        <td class="foot-bar" colspan="2">
            <a href="/about/privacy.php" class="menuBlack">PRIVACY POLICY</a>
            &nbsp;|&nbsp;
            <a href="/credits.php" class="menuBlack">CREDITS</a>
            <br>
        </td>
    </tr>

    <tr>
        <td class="foot-copy">
            <small>
                <a href="/copyright.php">Copyright &copy; 2001-2022 The PHP Group</a><br>
                All rights reserved.<br>
            </small>
        </td>
        <td class="foot-source">
            <small>
                Last updated: Mon Jun 01 07:05:01 2020 UTC<br>
                Bandwidth and hardware provided by: <a href="https://www.pair.com/">pair Networks</a>
            </small>
        </td>
    </tr>
</table>

</body>
</html>`

export const releases_by_name = async (name: string):Promise<Release[]> => {
    const pecl_url = `https://pecl.php.net/package/${name}`
    const rep = await axios.get(pecl_url)
    // const doc = new DomParser(rep.data)

    const document = parse5.parse(rep.data);
    const xhtml = xmlserializer.serializeToString(document);
    const doc = new xmldom.DOMParser().parseFromString(xhtml);
    // const doc = (new xmldom.DOMParser()).parseFromString(html)
    const select = xpath.useNamespaces({"x": "http://www.w3.org/1999/xhtml"});

    let header = 0;

    const releases: Release[] = []

    const trs = select('//x:th[text() = "Version"]/../../x:tr', doc) as Node[]
    console.log(trs.length);

    for (let tr of trs) {
        if (header < 2){
            if (header == 2){
                console.log(tr);
                // let's get headlines
                const ths = select('./x:th', tr) as Node[]
                const headlines = JSON.stringify(ths.map((node) => node.textContent))
                const expectedHeadlines =  JSON.stringify(["Version", "State", "Release Date", "Downloads", ""])
                log.assert(headlines == expectedHeadlines, `found headlines ${headlines} didn't match expected headlines ${expectedHeadlines}`)
            }
            header ++;
        } else {
            const tds = select('./x:td', tr) as Node[]
            const ths = select('./x:th', tr) as Node[]

            const version = ths[0].textContent!.trim() as string
            const state = tds[0].textContent as State
            const release_date_str = tds[1].textContent as string
            // @ts-ignore
            const source_url = `https://pecl.php.net${tds[2].childNodes[0].getAttribute("href")}`
            // const changelog_url = `https://pecl.php.net${tds[2].childNodes[0].getAttribute("a")}`
            releases.push({version, state, release_date_str, source_url})
        }
    }
    return releases
}
