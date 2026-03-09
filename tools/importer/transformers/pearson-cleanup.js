/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Pearson site-wide cleanup.
 * Selectors from captured DOM of https://www.pearson.com/en-gb/schools/secondary/parents-learners.html
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove cookie consent banner (found: #onetrust-consent-sdk at line 5178 of cleaned.html)
    // Remove login iframes (found: #pi_op_frame_pearson, #pi_rp_frame at lines 5-8)
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '#pi_op_frame_pearson',
      '#pi_rp_frame',
    ]);
  }

  if (hookName === H.after) {
    // Remove header navigation (found: <header> at line 9)
    // Remove footer (found: <footer> at line 4747)
    // Remove skip-nav link (found: a.skip-nav at line 2)
    // Remove back-to-top button (found: a.to-top-button at line 4743)
    // Remove accessibility announcement div (found: #accessibility__announcement at line 4741)
    // Remove iframes, link tags, noscript
    WebImporter.DOMUtils.remove(element, [
      'header',
      'footer',
      'a.skip-nav',
      'a.to-top-button',
      '#accessibility__announcement',
      'iframe',
      'link',
      'noscript',
    ]);
  }
}
