# @camib0b/ui

Shared design system for [camilaescudero.cl](https://camilaescudero.cl) and its standalone tools. Tokens match the site: Roboto, near-black on white, a 0.5rem radius, and no gradients or pills.

Install from GitHub:

```bash
npm install github:camib0b/ui
```

## Plain HTML

xml-viz and any other page without a build step link the prebuilt stylesheet:

```html
<link rel="stylesheet" href="./node_modules/@camib0b/ui/dist/ui.css" />
```

`dist/ui.css` defines the site's CSS variables, base typography, and the button, row, and progress classes the concat tool uses.

```html
<button class="button" type="button">Concat</button>
<button class="button button-secondary" type="button">Add files</button>

<div class="row">
  <span>chapter-01.xml</span>
  <button class="button button-ghost" type="button">Remove</button>
</div>

<div class="progress" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style="width: 40%"></div>
</div>
```

A native progress element uses the same track class:

```html
<progress class="progress" value="40" max="100">40%</progress>
```

Add `class="dark"` to `<html>` for the site's dark palette. Buttons use the site's medium radius (`--radius` minus 2px). Progress stays square.

Rebuild the stylesheet with `npm run build`. It reads `preset.js` and writes `dist/ui.css`.

## React and Tailwind

The concat tool (Vite, React, Tailwind) uses the preset, the stylesheet, and the components.

```js
// tailwind.config.js
const uiPreset = require("@camib0b/ui/preset");

module.exports = {
  presets: [uiPreset],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
};
```

The preset already scans its own `dist` for the header and language-toggle class names. Color utilities such as `bg-background` read CSS variables, so import the stylesheet once:

```tsx
import "@camib0b/ui/ui.css";
import { LanguageProvider, SiteHeader, useLanguage } from "@camib0b/ui";

const messages = {
  en: { title: "Concat" },
  es: { title: "Concatenar" },
};

export function App() {
  return (
    <LanguageProvider messages={messages}>
      <SiteHeader />
      <Tool />
    </LanguageProvider>
  );
}

function Tool() {
  const { language, t } = useLanguage();
  return <h1>{t("title")}</h1>;
}
```

`SiteHeader` links back to https://camilaescudero.cl and includes the EN/ES toggle. `LanguageProvider` restores a saved choice from `localStorage` (`language`). With nothing saved, it follows the device: a tag starting with `es` selects Spanish, a tag starting with `en` selects English, and anything else stays English. `setLanguage` writes the choice back. `t` returns the string for the active language, or the key when messages are omitted.

Named entry points:

| Import | Contents |
| --- | --- |
| `@camib0b/ui` | `LanguageProvider`, `useLanguage`, `languageFromDevice`, `SiteHeader`, `LanguageToggle` |
| `@camib0b/ui/preset` | Tailwind preset |
| `@camib0b/ui/ui.css` | Prebuilt stylesheet |
| `@camib0b/ui/header` | `SiteHeader` |
| `@camib0b/ui/language` | Language provider and hook |

React and Tailwind are optional peer dependencies. A plain HTML page only needs the CSS file.
