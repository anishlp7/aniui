/**
 * AdSense, for the domain rather than for this site.
 *
 * Nothing on aniui.dev is monetised and nothing here renders an ad unit. This
 * exists because AdSense approves a *root domain* and every subdomain under it
 * at once: the site being monetised is academy.aniui.dev, and the only way to
 * get it approved is for aniui.dev to carry the tag and the ads.txt file. So
 * the docs site is the one that gets verified and Academy is the one that
 * earns.
 *
 * Two consequences worth knowing before changing anything here:
 *
 * - `public/ads.txt` has to stay on this domain. Crawling starts at the root,
 *   and a subdomain's own ads.txt is only read when the root file names it with
 *   a SUBDOMAIN line. Academy serves its own copy, and Google will never look
 *   at it.
 * - Auto ads must stay off in the dashboard. They apply to the whole domain,
 *   subdomains included, and they choose their own placements — which sooner or
 *   later means an ad inside Academy's exam room, beside the timer, on a paper
 *   somebody paid for.
 *
 * The publisher ID is hardcoded rather than read from the environment because
 * it is public — it ships in the script URL on every page of every AdSense site
 * — and a verification tag that silently vanishes because a deploy is missing a
 * variable is the exact failure this needs not to have.
 */
export const ADSENSE_CLIENT = "ca-pub-2679552542273749";
