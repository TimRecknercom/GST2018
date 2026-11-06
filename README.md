

# Google Santa Tracker (2018 Archival Recreation)

> [!WARNING]
> **Heads Up / FYI:** This project is preserved for archival and experimental purposes. It is **not easy to run out-of-the-box** because it relies on web standards and backend APIs from 2018 that have since been deprecated or completely removed by modern browser vendors and Google. Expect troubleshooting, quirks, or browser-specific security blocks when testing.

An archival preservation wrapper for the **2018 edition of Google Santa Tracker**. 

This repository allows the original 2018 WebComponents/Polymer client to run in modern environments by intercepting network traffic, polyfilling retired web standards, and simulating the December 2018 timeline.

---

## Technical Requirements & Prerequisites

Because this project emulates a legacy web application, standard double-clicking (`file:///...`) will not work due to browser Cross-Origin Resource Sharing (CORS) restrictions.

### Browser Compatibility
* **Chromium-based browsers (Chrome, Edge, Brave, Opera):** Version 80+ requires the included `webcomponents-lite.js` polyfill to process legacy `<link rel="import">` elements.
* **Firefox:** Supported via the WebComponents polyfill.
* **Safari:** Limited support; legacy custom element registration may throw intermittent lifecycle errors.
* **Internet Explorer:** Unsupported (uses modern ES6 syntax in monkey-patches).

### Hosting & Server Requirements
* **HTTP / HTTPS Context:** Must be served over a local or remote web server (`localhost` or a web host like GitHub Pages, Netlify, or Vercel).
* **Active Internet Connection:** Required on the initial load to download original asset bundles from Google's static CDN (`maps.gstatic.com`).
* **Node.js (Optional, for local CLI hosting):** Node.js 18+ if serving locally via `npx serve` or testing Netlify serverless functions.

---

## Why Modern Browsers Break the 2018 App

When loaded without modification today, the 2018 tracker fails due to three major ecosystem changes:

1. **HTML Imports Were Deprecated & Removed:** The 2018 client relies heavily on `<link rel="import" href="...">` (Polymer v1/WebComponents v0). Chromium removed native HTML Imports in 2020. Without a polyfill, custom elements like `<santa-app>` fail to register, resulting in a blank blue screen.
2. **Decommissioned & Shifted APIs:** Google's live Santa API (`santa-api.appspot.com`) no longer serves 2018 route structures, and third-party dependencies (like Panoramio city photos) have been permanently shut down.
3. **Hardcoded Timeline Dates:** The original application unlocks games day-by-day throughout December 2018 and triggers Santa's flight on Christmas Eve 2018. In any other year, the app sits in a permanent post-flight or pre-launch idle state.

---

## How This Project Fixes It

* **Client-Side Time Emulation (`MockDate`):** Overrides `window.Date` so the app believes the current year is 2018 while preserving real-time second-by-second increments.
* **In-Browser API Interception (XHR Monkey-Patch):** Intercepts requests destined for `https://santa-api.appspot.com/info`. It serves dynamic 2018-formatted data and shifts route timestamps directly inside the client without requiring a backend server.
* **HTML Imports Polyfill:** Loads the WebComponents v0 loader (`webcomponents-lite.js`) before `elements_en.html` is parsed, restoring `<link rel="import">` support in modern browsers.
* **Countdown & Scene Unlockers:** 
  * Injects a local SVG/CSS countdown timer to replace dead server countdown widgets.
  * Calls `santaApp.unlockAllHouses()` automatically once the app boots, granting immediate access to all village games and scenes.

---

## Repository Structure

For GitHub Pages to serve the application properly, the repository must be structured with `index.html` at the root:

```text
GST2018/
├── README.md
└── index.html


---

## Repository Structure

For GitHub Pages to serve the application properly, the repository must be structured with `index.html` at the root:

```text
GST2018/
├── README.md
├── index.html

How to Deploy on GitHub Pages
Upload index.html directly to the root of your GitHub repository.

Navigate to Settings > Pages (under "Code and automation").

Under Build and deployment:

Source: Choose Deploy from a branch.

Branch: Select main (or master) and folder /(root).

Click Save.

Wait 1–2 minutes. Your site will be live at https://<your-username>.github.io/<repo-name>/.


Preview Modes & Query ParametersYou can jump Santa's flight clock to test the live tracking scenes:Normal Village Mode: Load the root URL directly
(https://.../index.html).Santa Flight Simulation: Append ?preview=tracker to trigger Santa taking off from the North Pole (Christmas Eve 2018, 10:00 UTC).Jump Ahead in Flight: Append &hours=N
(e.g., ?preview=tracker&hours=5) to jump $N$ hours into the flight.

Here is a complete, copy-and-paste **`README.md`** for your repository, followed by the complete, self-contained **`index.html`** file.

---

### Part 1: Content for your `README.md`

```markdown
# Google Santa Tracker (2018 Archival Recreation)

An archival preservation wrapper for the **2018 edition of Google Santa Tracker**. 

This repository allows the original 2018 WebComponents/Polymer client to run in modern web browsers by intercepting network traffic, polyfilling retired web standards, and simulating the December 2018 timeline.

---

## Why Modern Browsers Break the 2018 App

When loaded without modification today, the 2018 tracker fails due to three major ecosystem changes:

1. **HTML Imports Were Deprecated & Removed:** The 2018 client relies on `<link rel="import" href="...">` (Polymer v1/WebComponents v0). Chromium removed native HTML Imports in 2020. Without a polyfill, custom elements like `<santa-app>` fail to register, resulting in a blank blue screen.
2. **Decommissioned & Shifted APIs:** Google's live Santa API (`santa-api.appspot.com`) no longer serves 2018 route structures, and third-party dependencies (like Panoramio city photos) have been shut down.
3. **Hardcoded Timeline Dates:** The original application unlocks games day-by-day throughout December 2018 and triggers Santa's flight on Christmas Eve 2018. In any other year, the app sits in a permanent post-flight or pre-launch idle state.

---

## How This Project Fixes It

* **Client-Side Time Emulation (`MockDate`):** Overrides `window.Date` so the app believes the current year is 2018 while preserving real-time second-by-second increments.
* **In-Browser API Interception (XHR Monkey-Patch):** Intercepts requests destined for `https://santa-api.appspot.com/info`. It serves dynamic 2018-formatted data and shifts route timestamps directly inside the client without requiring a backend server.
* **HTML Imports Polyfill:** Loads the WebComponents v0 loader (`webcomponents-lite.js`) before `elements_en.html` is parsed, restoring `<link rel="import">` support in modern browsers.
* **Countdown & Scene Unlockers:** 
  * Injects a local SVG/CSS countdown timer to replace dead server countdown widgets.
  * Calls `santaApp.unlockAllHouses()` automatically once the app boots, granting immediate access to all village games and scenes.

---

## Repository Structure

For GitHub Pages to serve the application properly, the repository must be structured with `index.html` at the root:

```text
GST2018/
├── README.md
├── index.html

```

---

## How to Deploy on GitHub Pages

1. Upload `index.html` directly to the root of your GitHub repository.
2. Navigate to **Settings** > **Pages** (under "Code and automation").
3. Under **Build and deployment**:
* **Source**: Choose `Deploy from a branch`.
* **Branch**: Select `main` (or `master`) and folder `/(root)`.
* Click **Save**.


4. Wait 1–2 minutes. Your site will be live at `https://<your-username>.github.io/<repo-name>/`.

---

## Preview Modes & Query Parameters

You can jump Santa's flight clock to test the live tracking scenes:

* **Normal Village Mode:** Load the root URL directly (`https://.../index.html`).
* **Santa Flight Simulation:** Append `?preview=tracker` to trigger Santa taking off from the North Pole (Christmas Eve 2018, 10:00 UTC).
* **Jump Ahead in Flight:** Append `&hours=N` (e.g., `?preview=tracker&hours=5`) to jump $N$ hours into the flight.

```

---

### Part 2: Complete `index.html`

Save this code as **`index.html`** in the root of your repository:

```html
<!DOCTYPE html>
<html itemscope="itemscope" itemtype="http://schema.org/WebPage" lang="en">
<head prefix="og: http://ogp.me/ns# article: http://ogp.me/ns/article#">
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1,maximum-scale=1,user-scalable=no">
  <title>Santa's Village — Google Santa Tracker (2018)</title>

  <meta property="og:title" itemprop="name" content="Santa's Village — Google Santa Tracker">
  <meta property="og:type" content="website">
  <meta property="og:image" itemprop="image" content="https://santatracker.google.com/images/og.png">
  <meta name="twitter:description" content="Follow Santa Claus around the world with Google Santa Tracker on Google Maps.">
  <meta name="twitter:image" content="https://santatracker.google.com/images/og.png">
  <meta name="theme-color" content="#00c6ed">
  <meta name="apple-mobile-web-app-capable" content="yes">

  <!-- ========================================== -->
  <!-- 1. TIME ENGINE: 2018 SIMULATED CLOCK       -->
  <!-- ========================================== -->
  <script>
    (function() {
      const OriginalDate = window.Date;
      const TAKEOFF_2018 = OriginalDate.UTC(2018, 11, 24, 10, 0, 0);

      const previewParams = new URLSearchParams(window.location.search);
      let previewShift = null;

      if (previewParams.get("preview") === "tracker") {
        let hours = parseFloat(previewParams.get("hours"));
        if (!isFinite(hours) || hours < 0 || hours > 25) hours = 0.5;
        const start = TAKEOFF_2018 + hours * 3600000;
        previewShift = start - OriginalDate.now();
      }
      window.SANTA_PREVIEW = previewShift !== null;

      function simulatedNow() {
        if (previewShift !== null) return OriginalDate.now() + previewShift;
        const now = new OriginalDate();
        now.setFullYear(2018);
        return now.getTime();
      }

      class MockDate extends OriginalDate {
        constructor(...args) {
          if (args.length > 0) {
            super(...args);
          } else {
            super(simulatedNow());
          }
        }

        static now() {
          return simulatedNow();
        }
      }

      window.Date = MockDate;
      window.__ORIGINAL_DATE__ = OriginalDate;
    })();
  </script>

  <!-- ========================================== -->
  <!-- 2. CLIENT-SIDE API MOCK & ROUTE SHIFTER   -->
  <!-- ========================================== -->
  <script>
    (function() {
      const GOOGLE_INFO = "https://santa-api.appspot.com/info?client=web&language=en";
      const TAKEOFF_2018 = window.__ORIGINAL_DATE__.UTC(2018, 11, 24, 10, 0, 0);

      async function getShiftedRoute() {
        try {
          const infoRes = await window.fetch(GOOGLE_INFO + "&rand=" + Math.random());
          const info = await infoRes.json();
          const routeUrl = Array.isArray(info.route) ? info.route[0] : info.route;
          
          const routeRes = await window.fetch(routeUrl);
          const data = await routeRes.json();
          const destinations = data.destinations || [];
          if (!destinations.length) return { destinations: [] };

          const delta = TAKEOFF_2018 - destinations[0].departure;
          const shift = (t) => (typeof t === "number" ? t + delta : t);

          return {
            destinations: destinations.map((d) => ({
              ...d,
              arrival: shift(d.arrival),
              departure: shift(d.departure),
              details: d.details ? { panoramio: [], ...d.details } : d.details,
            })),
            stream: (data.stream || []).map((s) => ({ ...s, timestamp: shift(s.timestamp) })),
          };
        } catch (e) {
          console.warn("[SantaAPI] Fallback empty route triggered:", e);
          return { destinations: [] };
        }
      }

      const origOpen = XMLHttpRequest.prototype.open;
      const origSend = XMLHttpRequest.prototype.send;

      XMLHttpRequest.prototype.open = function(method, url) {
        this.__interceptUrl = url;
        return origOpen.apply(this, arguments);
      };

      XMLHttpRequest.prototype.send = function(body) {
        const url = this.__interceptUrl;

        if (typeof url === "string" && url.indexOf("https://santa-api.appspot.com/info") === 0) {
          const fakeInfo = {
            status: "OK",
            now: Date.now(),
            timeOffset: 0,
            refresh: 60000,
            route: "virtual://santa-route-2018"
          };
          
          Object.defineProperty(this, "responseText", { value: JSON.stringify(fakeInfo) });
          Object.defineProperty(this, "response", { value: JSON.stringify(fakeInfo) });
          Object.defineProperty(this, "status", { value: 200 });
          Object.defineProperty(this, "readyState", { value: 4 });

          setTimeout(() => {
            this.dispatchEvent(new Event("readystatechange"));
            this.dispatchEvent(new Event("load"));
          }, 10);
          return;
        }

        if (typeof url === "string" && url.indexOf("virtual://santa-route-2018") === 0) {
          getShiftedRoute().then((mockRoute) => {
            Object.defineProperty(this, "responseText", { value: JSON.stringify(mockRoute) });
            Object.defineProperty(this, "response", { value: JSON.stringify(mockRoute) });
            Object.defineProperty(this, "status", { value: 200 });
            Object.defineProperty(this, "readyState", { value: 4 });

            this.dispatchEvent(new Event("readystatechange"));
            this.dispatchEvent(new Event("load"));
          });
          return;
        }

        return origSend.apply(this, arguments);
      };
    })();
  </script>

  <!-- Typography & Styling -->
  <link href="//fonts.googleapis.com/css?family=Roboto:100,300,400,500,600,700,800|Lobster" rel="stylesheet">
  <link href="//maps.gstatic.com/mapfiles/santatracker/v201812132012/sass/santatracker.css" rel="stylesheet">

  <!-- ========================================== -->
  <!-- 3. WEBCOMPONENTS & HTML IMPORTS POLYFILL   -->
  <!-- ========================================== -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/0.7.24/webcomponents-lite.min.js"></script>
  <script src="//maps.gstatic.com/mapfiles/santatracker/v201812132012/components/webcomponentsjs/custom-elements-es5-adapter.js"></script>
  <link href="//maps.gstatic.com/mapfiles/santatracker/v201812132012/elements/elements_en.html" rel="import" crossorigin="">
</head>
<body class="scrollock" data-static="//maps.gstatic.com/mapfiles/santatracker/v201812132012/" data-version="v201812132012" unresolved="">
  <santa-app id="santaApp" routing=""></santa-app>
  <santa-countdown aria-atomic="false" aria-live="assertive" aria-relevant="additions" hidden="" role="timer"></santa-countdown>
  <santa-notice></santa-notice>

  <!-- ========================================== -->
  <!-- 4. COUNTDOWN BAR FALLBACK (2018)          -->
  <!-- ========================================== -->
  <script>
    (function () {
      var TAKEOFF = Date.UTC(2018, 11, 24, 10, 0, 0);
      var LABELS = ['Days', 'Hrs', 'Min', 'Sec'];
      var CSS = 'countdown-timer[hidden]{display:none!important}' +
        '#cd2018{display:flex;align-items:center;margin:0 8px 0 auto;flex:none;' +
        'font-family:Roboto,sans-serif;color:#fff;pointer-events:none}' +
        '#cd2018[hidden]{display:none}' +
        '#cd2018 .u{display:flex;flex-direction:column;align-items:center;min-width:30px;margin-left:10px}' +
        '#cd2018 .n{font-size:20px;font-weight:700;line-height:18px;letter-spacing:.5px}' +
        '#cd2018 .l{font-size:8px;font-weight:800;line-height:10px;letter-spacing:.5px;text-transform:uppercase}' +
        '@media (max-width:480px){#cd2018 .u{margin-left:6px;min-width:24px}#cd2018 .n{font-size:16px}}';

      function findDeep(root, selector) {
        var hit = root.querySelector(selector);
        if (hit) return hit;
        var all = root.querySelectorAll('*');
        for (var i = 0; i < all.length; i++) {
          if (all[i].shadowRoot && (hit = findDeep(all[i].shadowRoot, selector))) return hit;
        }
        return null;
      }

      function pad(n) { return (n < 10 ? '0' : '') + n; }
      function secondsLeft() { return Math.max(0, Math.floor((TAKEOFF - Date.now()) / 1000)); }

      var box = null, nums = [];

      function build() {
        box = document.createElement('div');
        box.id = 'cd2018';
        box.setAttribute('aria-hidden', 'true');
        nums = LABELS.map(function (label) {
          var u = document.createElement('div'); u.className = 'u';
          var n = document.createElement('span'); n.className = 'n';
          var l = document.createElement('span'); l.className = 'l'; l.textContent = label;
          u.appendChild(n); u.appendChild(l); box.appendChild(u);
          return n;
        });
      }

      function update() {
        var chrome = findDeep(document, 'santa-chrome');
        var root = chrome && chrome.shadowRoot;
        var title = root && root.getElementById('title');
        if (!title) return;

        var native = title.querySelector('countdown-timer');
        var nativeShowing = native && !native.hidden && native.offsetWidth > 0;
        var left = secondsLeft();

        if (!box) build();
        if (box.parentNode !== title) {
          var style = document.createElement('style');
          style.textContent = CSS;
          title.appendChild(style);
          title.appendChild(box);
        }
        box.hidden = nativeShowing || left === 0;
        var parts = [Math.floor(left / 86400), Math.floor(left / 3600) % 24,
                     Math.floor(left / 60) % 60, left % 60];
        for (var i = 0; i < 4; i++) nums[i].textContent = pad(parts[i]);
      }

      setInterval(update, 1000);
    })();
  </script>

  <!-- ========================================== -->
  <!-- 5. UNLOCK ALL VILLAGE GAMES                -->
  <!-- ========================================== -->
  <script>
    (function () {
      var tries = 0;
      var timer = setInterval(function () {
        var app = document.getElementById('santaApp');
        if (app && typeof app.unlockAllHouses === 'function') {
          app.unlockAllHouses();
          clearInterval(timer);
        } else if (++tries > 240) {
          clearInterval(timer);
        }
      }, 250);
    })();
  </script>

  <!-- Polymer Touch Configuration -->
  <script>
    window.Polymer && Polymer.setPassiveTouchGestures && Polymer.setPassiveTouchGestures(true);
  </script>
</body>
</html>

```
