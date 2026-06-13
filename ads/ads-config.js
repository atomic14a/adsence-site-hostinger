/**
 * InsureWise — Centralized Ads Configuration
 * ============================================
 * HOW TO USE:
 *  1. Replace the empty strings below with your actual AdSense ad unit HTML.
 *  2. Each key corresponds to a <div id="ad-XXXX"> container in the HTML files.
 *  3. Save this file — ads will auto-inject on every page that loads it.
 *
 * Example AdSense code to paste in each zone:
 *  '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXXXXXX"
 *       data-ad-slot="XXXXXXXXXX" data-ad-format="auto" data-full-width-responsive="true"></ins>
 *   <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>'
 */

const ADS = {
  // Top of page — 728x90 Leaderboard
  header: `<!-- InsureWise Header Ad (728x90) — Paste AdSense code here -->`,

  // Bottom of page — 728x90 Leaderboard
  footer: `<!-- InsureWise Footer Ad (728x90) — Paste AdSense code here -->`,

  // Before article body — 728x90 or Responsive
  beforeArticle: `<!-- InsureWise Before-Article Ad — Paste AdSense code here -->`,

  // In the middle of article — In-article native ad
  betweenArticle: `<!-- InsureWise Between-Article Ad — Paste AdSense code here -->`,

  // After article — 728x90 or Responsive
  afterArticle: `<!-- InsureWise After-Article Ad — Paste AdSense code here -->`,

  // Sidebar — 300x250 Rectangle / Responsive
  sidebar: `<!-- InsureWise Sidebar Ad (300x250) — Paste AdSense code here -->`,

  // Homepage mid-section — 728x90 or Responsive
  homepage: `<!-- InsureWise Homepage Ad — Paste AdSense code here -->`,

  // In-feed ad between post grid rows
  inFeed: `<!-- InsureWise In-Feed Ad — Paste AdSense code here -->`,

  // Text-based ad zone
  textAd: `<!-- InsureWise Text Ad — Paste AdSense code here -->`,

  // Popunder ad — fires on page load (injected into <head>)
  popunder: `<!-- InsureWise Popunder — Paste popunder script tag here -->`
};

/**
 * injectAd(zoneKey, containerId)
 * Injects the ad HTML from ADS[zoneKey] into the element with id=containerId.
 * Automatically re-executes any <script> tags inside the injected HTML.
 *
 * @param {string} zoneKey    - Key from the ADS object (e.g. 'header', 'sidebar')
 * @param {string} containerId - The id of the target <div> (e.g. 'ad-header')
 */
function injectAd(zoneKey, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const adCode = ADS[zoneKey];
  if (!adCode || adCode.trim() === '' || adCode.startsWith('<!--')) {
    // In development mode, show a placeholder
    container.innerHTML = `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 90px;
        background: #f8fafc;
        border: 1px dashed #cbd5e1;
        border-radius: 8px;
        color: #94a3b8;
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-family: sans-serif;
        padding: 16px;
      ">Advertisement — ${zoneKey}</div>`;
    return;
  }

  // Insert ad HTML
  container.innerHTML = adCode;

  // Re-execute any <script> tags inside the injected HTML
  const scripts = container.querySelectorAll('script');
  scripts.forEach(oldScript => {
    const newScript = document.createElement('script');
    Array.from(oldScript.attributes).forEach(attr => {
      newScript.setAttribute(attr.name, attr.value);
    });
    newScript.textContent = oldScript.textContent;
    oldScript.parentNode.replaceChild(newScript, oldScript);
  });
}

/**
 * injectPopunder()
 * Injects the popunder script tag into document.head.
 * Fires on page load — paste your popunder provider's script in ADS.popunder
 */
function injectPopunder() {
  const popCode = ADS.popunder;
  if (!popCode || popCode.startsWith('<!--')) return;

  const div = document.createElement('div');
  div.innerHTML = popCode;
  const scripts = div.querySelectorAll('script');
  scripts.forEach(script => {
    const newScript = document.createElement('script');
    Array.from(script.attributes).forEach(attr => {
      newScript.setAttribute(attr.name, attr.value);
    });
    newScript.textContent = script.textContent;
    document.head.appendChild(newScript);
  });
}

/**
 * Auto-inject all ads on DOMContentLoaded
 * Maps each ad zone key to its container div ID
 */
document.addEventListener('DOMContentLoaded', function () {
  // Map of zone key → container element ID
  const adMappings = {
    header:          'ad-header',
    footer:          'ad-footer',
    beforeArticle:   'ad-before-article',
    betweenArticle:  'ad-between-article',
    afterArticle:    'ad-after-article',
    sidebar:         'ad-sidebar',
    homepage:        'ad-homepage',
    inFeed:          'ad-infeed',
    textAd:          'ad-text'
  };

  // Inject each ad zone
  Object.entries(adMappings).forEach(([zoneKey, containerId]) => {
    injectAd(zoneKey, containerId);
  });

  // Inject popunder
  injectPopunder();
});
