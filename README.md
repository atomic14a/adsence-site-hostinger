# InsureWise — Insurance Blog

A professional, AdSense-ready insurance blog website built with pure HTML5, CSS3, and Vanilla JavaScript. Deployable directly to GitHub Pages.

## 📋 Overview

- **Niche:** Health Insurance & Car Insurance
- **Stack:** Pure HTML5 + CSS3 + Vanilla JS (no frameworks, no backend)
- **Hosting:** GitHub Pages
- **Brand:** InsureWise

## 🗂️ File Structure

```
insurance-blog/
├── index.html                    ← Homepage
├── sitemap.xml                   ← XML sitemap (submit to Google)
├── robots.txt                    ← SEO robots file
├── css/
│   ├── style.css                 ← Main styles + design system
│   └── responsive.css            ← Mobile/tablet breakpoints
├── js/
│   └── main.js                   ← All JavaScript interactions
├── ads/
│   └── ads-config.js             ← ⚡ ALL AD CODES GO HERE
└── pages/
    ├── health-insurance.html
    ├── car-insurance.html
    ├── resources.html
    ├── about.html
    ├── contact.html
    ├── privacy-policy.html
    ├── disclaimer.html
    ├── terms.html
    ├── sitemap.html
    └── articles/
        ├── best-health-insurance-2025.html
        ├── cheap-health-insurance.html
        ├── health-insurance-self-employed.html
        ├── best-car-insurance-2025.html
        ├── lower-car-insurance-premium.html
        └── full-coverage-vs-liability.html
```

## 🚀 Deploying to GitHub Pages

1. Create a new GitHub repository (e.g., `insurance-blog`)
2. Upload all files to the repository root
3. Go to **Settings → Pages → Source → Deploy from branch → main**
4. Your site will be live at: `https://yourusername.github.io/insurance-blog/`

### Update Your Domain

After deploying, replace all instances of `yourusername.github.io/insurance-blog` with your actual GitHub Pages URL (or custom domain).

## 💰 Adding AdSense Ads

All ad codes are managed in a **single file**: `ads/ads-config.js`

1. Sign up for Google AdSense at [adsense.google.com](https://adsense.google.com)
2. Get approved (requires Privacy Policy + Disclaimer pages — ✅ already included)
3. Create ad units in AdSense and copy the code
4. Open `ads/ads-config.js`
5. Paste your ad code into the corresponding zone:

```javascript
const ADS = {
  header: `<ins class="adsbygoogle" ...></ins><script>...</script>`,
  sidebar: `<ins class="adsbygoogle" ...></ins><script>...</script>`,
  // ... etc
};
```

The ads will automatically appear on ALL pages.

## 📊 SEO Setup

1. **Submit your sitemap** to Google Search Console:
   - Go to [Google Search Console](https://search.google.com/search-console)
   - Add your property: `https://yourusername.github.io/insurance-blog/`
   - Submit sitemap: `https://yourusername.github.io/insurance-blog/sitemap.xml`

2. **Update canonical URLs** in each HTML file — search for `yourusername` and replace with your actual GitHub username.

3. **Update robots.txt** — replace `yourusername` with your actual GitHub username.

## ✉️ Contact Form

The contact form is configured for [Formspree](https://formspree.io):

1. Create a free Formspree account
2. Create a new form and copy your form ID
3. In `pages/contact.html`, replace `YOUR_FORM_ID` in the form action URL

## 🎨 Customization

- **Colors:** Edit CSS variables in `css/style.css` (`:root` section)
- **Brand Name:** Search & replace `InsureWise` across all HTML files
- **New Articles:** Copy any article template and update content, SEO tags, and ad zones

## 📱 Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Hamburger menu for mobile
- ✅ Reading progress bar
- ✅ Back-to-top button
- ✅ FAQ accordion
- ✅ Social share buttons
- ✅ Newsletter form
- ✅ Centralized ad management
- ✅ SEO meta tags on every page
- ✅ Open Graph tags for social sharing
- ✅ JSON-LD Article schema on all 6 articles
- ✅ XML sitemap
- ✅ Privacy Policy, Disclaimer, Terms pages

## 📄 License

© 2025 InsureWise. All rights reserved.
