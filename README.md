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
| **UI & Interaction** | keen-slider, react-international-phone, react-toastify |
| **Media** | browser-image-compression |
| **Linting & Formatting** | ESLint 9 (flat config) with `@stylistic`, Stylelint 17 (`stylelint-order`), Husky 9, lint-staged |
| **Optimization** | Critters (critical CSS inlining) |
| **Deployment** | Vercel |

---

## 📁 Project Structure

```
betman/
├── .husky/              # Git hooks automation scripts (pre-commit)
├── messages/            # next-intl translation files (locale JSONs)
├── public/               # Static assets (images, icons, fonts)
├── src/                  # Application source code
├── .browserslistrc       # Target browsers for autoprefixing/transpilation
├── .stylelintrc.json     # Stylelint configuration & CSS property ordering
├── eslint.config.mjs     # ESLint flat config with @stylistic formatting rules
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
| `npm run lint` | Runs ESLint and Stylelint code checks |
| `npm run lint:fix` | Automatically fixes JS/JSX formatting and SCSS property order |
| `npm run stylelint` | Runs Stylelint across SCSS files |
| `npm run stylelint:fix` | Automatically formats and sorts CSS properties in SCSS files |
| `npm run analyze` | Builds application with bundle analyzer enabled |
---




## 🎨 Code Style & Formatting
The project enforces strict, automated code quality and formatting standardizations:

- **ESLint 9 Flat Config (`eslint.config.mjs`)**:
  - Code formatting powered by `@stylistic/eslint-plugin` (2-space indent, no semicolons, single quotes for JS, double quotes for JSX).
  - Import sorting managed by `eslint-plugin-simple-import-sort` with predefined module groups.
  - Smart multiline formatting for imports without forcing unnecessary line breaks on code objects.

- **Stylelint 17 (`.stylelintrc.json`)**:
  - Enforces strict SCSS syntax standards via `stylelint-config-standard-scss`.
  - Property ordering managed by `stylelint-order` (Positioning -> Display/Flex/Grid -> Box Model -> Visuals -> Typography).
  - Integrates `@stylistic/stylelint-plugin` for spacing and line formatting.

- **Automated Git Hooks (Husky 9, lint-staged & Commitlint)**:
  - **`pre-commit`**: Intercepts `git commit` to validate staged files using `eslint` and `stylelint`. Blocks commits if code style or syntax errors are detected.
  - **`commit-msg`**: Validates commit messages using `commitlint` according to the **Conventional Commits** specification (`feat:`, `fix:`, `refactor:`, `style:`, `chore:`).

- **Available Code Scripts**:
  - `npm run lint:fix` / `npm run stylelint:fix`: Manual auto-fixing commands for local development when bulk formatting is needed.




## 💬 Commit Convention
The project enforces standardized commit messages using **Conventional Commits** managed by **Commitlint** and **Husky** (`commit-msg` hook). Every commit message must strictly follow this structure:

| Type | Description |
|---|---|
| **`feat`** | A new feature for the user |
| **`fix`** | A bug fix |
| **`refactor`** | Code changes that neither fix a bug nor add a feature |
| **`style`** | Changes that do not affect code logic (formatting, spacing, SCSS property order) |
| **`docs`** | Documentation updates (e.g., `README.md`) |
| **`chore`** | Maintenance tasks, dependency updates, build/config changes |
| **`perf`** | Performance optimizations |
| **`test`** | Adding or updating tests |
| **`revert`** | Reverting a previous commit |

### Validation Rules

- **Header Length**: Maximum **100 characters**.
- **Case**: Summaries can start with either uppercase or lowercase letters.
- **Language**: English or Ukrainian descriptions are supported.
- **Mandatory Fields**: Both `<type>` and `<short summary>` are strictly required.

### Examples

**✅ Valid Commits:**
```bash
git commit -m "feat: add localization switcher component"
git commit -m "fix: correct layout padding in header"
git commit -m "style: sort scss properties in wallet modal"
git commit -m "chore: update project dependencies"
```
**❌ Invalid Commits (Will be blocked):**
```bash
git commit -m "fixed bug"        # Missing commit type
git commit -m "feat"             # Missing commit summary
git commit -m "WIP"              # Non-compliant type and format
```

## 📦 Key Dependencies Explained
- **next-intl** — routing-aware i18n: locale-prefixed URLs, message dictionaries, server/client translation hooks.
- **nextjs-toploader** — YouTube/GitHub-style top progress bar for route transitions.
- **keen-slider** — lightweight, dependency-free carousel/slider (used for image galleries, banners, etc.).
- **react-international-phone** — international phone number input with country selector and formatting.
- **browser-image-compression** — client-side image compression before upload, reducing payload size.
- **react-toastify** — toast notifications for user feedback (success/error states).
- **@vercel/speed-insights** — Core Web Vitals monitoring in production.
- **@next/third-parties** — optimized loading of third-party scripts (e.g. Google Analytics/Tag Manager).
- **critters** — inlines critical CSS at build time to improve first paint performance.
---



## ☁️ Deployment
The project is deployed on **Vercel**, connected directly to this repository. Every push to `main` triggers a production deployment; pull requests get their own preview deployment automatically.

To deploy your own instance, use the [Vercel Platform](https://vercel.com/new) and import this repository — no additional configuration is required beyond environment variables (if any are used by `next.config.mjs`).



## 📚 Learn More
- [Next.js Documentation](https://nextjs.org/docs)
- [next-intl Documentation](https://next-intl.dev)
- [Vercel Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying)
