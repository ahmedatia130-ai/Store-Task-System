# 2S Store Task System

نظام مهام وحضور فرع 2S Home Wear. / Task and attendance system for the 2S Home Wear branch.

## How it is built

The app has two parts:

| Part | Where it lives | What it does |
|------|----------------|--------------|
| **App shell (this repo)** | GitHub Pages | `index.html` is a PWA wrapper that loads the real app in a full-screen iframe. `manifest.json` and the icons make it installable on phones; `push-sw.js` is the service worker that shows Firebase push notifications. |
| **The app itself** | Google Apps Script + Google Sheets | `Code.gs` (backend) and `Index.html` (UI) run as an Apps Script web app. All data is stored in sheets of the bound spreadsheet. These files are **not** in this repo. |

There is no local server or database: the real app only runs on Google.

## Deploying the app (Apps Script)

1. Open the Google Sheet → **Extensions → Apps Script**.
2. Paste `Code.gs` into the `Code.gs` file (replace everything).
3. Create an HTML file named `Index` and paste `Index.html` into it.
4. Run `setupAll()` once (**Run**, not Debug). It creates all the sheets.
5. **Deploy → New deployment → Web app**, Execute as: **Me**, Who has access: **Anyone with the link**.
6. If the `/exec` URL changed, update the iframe `src` in `index.html` in this repo.

To ship a new version later, use **Deploy → Manage deployments → Edit → New version**, which keeps the same `/exec` URL.

## Previewing the app shell locally

Only the wrapper can run locally; it still loads the live Apps Script app inside it.

```bash
git clone https://github.com/ahmedatia130-ai/Store-Task-System.git
cd Store-Task-System
python3 -m http.server 4000
```

Then open http://localhost:4000. (Any static server works, e.g. `npx serve -l 4000`.)
