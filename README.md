# 🎰 Betman

Production web application built with **Next.js 16** and **React 19**.

🔗 **Live:** [test.betman.club](https://test.betman.club/en)

---

## 🛠 Tech Stack

| Category | Technologies |
|---|---|
| **Core** | Next.js 16 (App Router), React 19 |
| **Language** | JavaScript (`jsconfig.json`) with type hints via `@types/react`, `@types/react-dom` |
| **Styling** | Sass, Clsx |
| **Localization** | next-intl |
| **Analytics & Performance** | @vercel/speed-insights, @next/third-parties, nextjs-toploader |
| **UI & Interaction** | keen-slider, react-phone-input-2, react-toastify |
| **Media** | browser-image-compression |
| **Linting** | ESLint 9 (flat config), eslint-config-next |
| **Optimization** | Critters (critical CSS inlining) |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
betman/
├── messages/            # next-intl translation files (locale JSONs)
├── public/               # Static assets (images, icons, fonts)
├── src/                  # Application source code
├── .browserslistrc       # Target browsers for autoprefixing/transpilation
├── eslint.config.mjs     # ESLint flat config
├── jsconfig.json         # Path aliases & JS language service config
├── next.config.mjs       # Next.js configuration
└── package.json
```

---

## 🌍 Localization

The project uses **next-intl** for internationalization, with translation dictionaries stored in the `messages/` directory at the project root (one file per locale). Routing, locale detection, and message loading are configured through `next.config.mjs` and the App Router middleware conventions.

---

## 🚀 Getting Started

### Prerequisites

**Node.js** (v18+) and **npm** installed.

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result. The app uses the Next.js App Router with Fast Refresh — edits are reflected instantly.

---

## 📜 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Starts the Next.js development server |
| `npm run build` | Builds an optimized production bundle |
| `npm start` | Serves the production build |
| `npm run lint` | Runs ESLint across the project |

---

## 📦 Key Dependencies Explained

- **next-intl** — routing-aware i18n: locale-prefixed URLs, message dictionaries, server/client translation hooks.
- **nextjs-toploader** — YouTube/GitHub-style top progress bar for route transitions.
- **keen-slider** — lightweight, dependency-free carousel/slider (used for image galleries, banners, etc.).
- **react-phone-input-2** — international phone number input with country selector, used in forms.
- **browser-image-compression** — client-side image compression before upload, reducing payload size.
- **react-toastify** — toast notifications for user feedback (success/error states).
- **@vercel/speed-insights** — Core Web Vitals monitoring in production.
- **@next/third-parties** — optimized loading of third-party scripts (e.g. Google Analytics/Tag Manager).
- **critters** — inlines critical CSS at build time to improve first paint.

---

## ☁️ Deployment

The project is deployed on **Vercel**, connected directly to this repository. Every push to `main` triggers a production deployment; pull requests get their own preview deployment automatically.

To deploy your own instance, use the [Vercel Platform](https://vercel.com/new) and import this repository — no additional configuration is required beyond environment variables (if any are used by `next.config.mjs`).

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl.dev)
- [Vercel Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying)
