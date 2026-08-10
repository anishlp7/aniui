/**
 * Consent defaults for Google's advertising tags.
 *
 * The AdSense script loads on this site for verification, which means it loads
 * for European visitors too. No ad unit here requests an ad, so in practice it
 * has little to set — but "in practice" is not the standard the EEA applies,
 * and the cost of being right is six lines that run before the tag does.
 *
 * A mirror of the same file in AniUI Academy. The two sites are one domain as
 * far as AdSense is concerned, so they should not disagree about this.
 *
 * The dialog itself is Google's, from the "Privacy & messaging" tab in AdSense:
 * serving personalised ads to the EEA needs a *certified* CMP, which a banner
 * written by hand would not be. These defaults only cover the gap before that
 * CMP has loaded and answered, when an early tag would otherwise assume it may
 * set whatever it likes.
 */

/** The EEA, plus the UK and Switzerland. */
const CONSENT_REQUIRED_REGIONS = [
  // EU member states
  "AT", "BE", "BG", "CY", "CZ", "DE", "DK", "EE", "ES", "FI", "FR", "GR",
  "HR", "HU", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PL", "PT", "RO",
  "SE", "SI", "SK",
  // The rest of the EEA
  "IS", "LI", "NO",
  // Not EEA, same requirement
  "GB", "CH",
] as const;

/**
 * Runs in `<head>`, ahead of any Google tag.
 *
 * `wait_for_update` holds Google's tags for 500ms in case a CMP is about to
 * answer, rather than reading silence as refusal. Outside those regions the
 * defaults are `granted`, which is a judgement about where consent is required
 * up front and the line to move if that judgement changes.
 */
export const consentInitScript = `
(function(){
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  window.gtag = window.gtag || gtag;
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    region: ${JSON.stringify([...CONSENT_REQUIRED_REGIONS])},
    wait_for_update: 500
  });
  gtag('consent', 'default', {
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    analytics_storage: 'granted'
  });
})();
`.trim();
