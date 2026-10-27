# @camib0b/ui

Shared design system for [camilaescudero.cl](https://camilaescudero.cl) and its standalone tools. Tokens match the site: Roboto, near-black on white, and no gradients or pills. The site radius token stays `0.5rem`. Buttons, the file picker, icon buttons, rows, the drop zone, toasts, and `.input` use square corners.

Install from GitHub:

```bash
npm install github:camib0b/ui
```

## Plain HTML

xml-viz and any other page without a build step link the prebuilt stylesheet:

```html
<link rel="stylesheet" href="./node_modules/@camib0b/ui/dist/ui.css" />
```

`dist/ui.css` is the interaction source for the site and its tools. Rebuild it with `npm run build`. The build reads `preset.js` and writes `dist/ui.css`. Add `class="dark"` to `<html>` for the dark palette.

## Interaction classes

Hover feedback is limited to devices that actually hover (`@media (hover: hover)`). Press feedback applies everywhere. Disabled controls, including `.is-disabled` and `aria-disabled="true"`, use 40% opacity and `cursor: not-allowed`. They do not set `pointer-events: none`.

Buttons, icon buttons, text links, the dismiss button, and inputs share one focus ring: a 1px outline, 2px outside the control, in `--ring`. The drop zone uses that same ring for `:focus-within`.

| Class | Rank | Hover | Press |
| --- | --- | --- | --- |
| `button-primary` | Primary | Lifts 2px and gains `--shadow-elev-2` (140ms) | Moves down 1px, scales to 0.97, shadow drops (80ms) |
| `button-secondary` | Secondary | Faint `--accent` fill and a darker `--ring` border (140ms). No lift | Scales to 0.98 (80ms) |
| `button-file` | Secondary | Same faint fill and darker border. No lift | Scales to 0.98 (80ms) |
| `button-icon` | Icon | Grey (`--muted-foreground`) to dark (`--foreground`) | Scales to 0.92 (80ms) |
| `text-link` | Text | Color changes from muted to foreground | Scales to 0.97 (80ms) |
| `toast-dismiss` | Secondary | Same as `button-secondary`. Square corners | Scales to 0.98 (80ms) |

```html
<button class="button-primary" type="button">Concat</button>
<button class="button-file" type="button">Add files</button>
<button class="button-secondary" type="button">Cancel</button>
<button class="button-icon" type="button" aria-label="Remove">×</button>
<button class="text-link" type="button">Details</button>
<input class="input" type="text" />
```

`button-file` is the file picker. It is a secondary button and never uses the primary lift.

### Durations and easing

These curves are CSS variables and Tailwind timing utilities (`ease-out-strong`, `ease-hero`, `ease-color`).

| Token | Value | Use |
| --- | --- | --- |
| `--duration-press` | 80ms | Press scale and the primary press |
| `--duration-color` | 140ms | Color, border, and background |
| `--duration-button` | 140ms | Button color, lift, and shadow |
| `--duration-row` | 180ms | Row color and border |
| `--duration-drop` | 320ms | Row landing and toast entrance |
| `--duration-toast` | 6s | Toast hold before it closes |
| `--ease-out-strong` | `cubic-bezier(0.23, 1, 0.32, 1)` | Movement, including the primary lift and its shadow |
| `--ease-hero` | `cubic-bezier(0.16, 1, 0.3, 1)` | Hero fade, curtain reveal, contribution pattern |
| `--color-ease` | `cubic-bezier(0.4, 0, 0.2, 1)` | Color, border, and background |

Tailwind utilities: `duration-press`, `duration-color`, `duration-button`, `duration-row`, `duration-drop`. Shadows: `shadow-elev-1`, `shadow-elev-2`, `shadow-elev-3`.

`prefers-reduced-motion` removes movement and animation. Color and shadow still change: the primary hover shadow still appears, and the press still drops that shadow. The toast stays put and disappears after 6 seconds without fading.

### Drop zone

The zone uses the concat surface (white at 60% opacity, 8% in dark) and a 1px border. While `is-drag-over` is set, the border darkens to the foreground color.

```html
<label class="drop-zone">
  Drop files here
  <input class="drop-zone-input" type="file" />
  <button class="button-file" type="button">Add files</button>
</label>
```

`bindDropZone` is plain JavaScript. It counts `dragenter` and `dragleave` so a child inside the zone does not flicker the border. Pass a drop handler if you want the files. Call the returned function to remove the listeners.

```js
const { bindDropZone } = require("@camib0b/ui/drop-zone");

const unbindDropZone = bindDropZone(document.querySelector(".drop-zone"), function (event) {
  const droppedFiles = event.dataTransfer && event.dataTransfer.files;
  return droppedFiles;
});
```

The same function is exported from `@camib0b/ui`.

### Attention pulse

Hero contribution teal (`--accent-teal`, same HSL as `contrib-q4`). The `.attention-pulse` class eases text color from muted to teal and back three times (1.2s per cycle, 600ms delay). No scale, glow, or loop. `prefers-reduced-motion` disables the animation.

`startAttentionPulse` adds the class and removes it on the first document click, file choice, drag, or when the animation ends.

```html
<button class="text-link" type="button" id="sample-match-button">Try the sample file</button>
```

```js
const { startAttentionPulse } = require("@camib0b/ui/attention-pulse");

startAttentionPulse(document.getElementById("sample-match-button"));
```

### Reorderable rows

A static `.row` is only a list row. Add `row-reorderable` for a grab cursor (`grabbing` while pressed, `default` when `draggable="false"`). `row-placeholder` is the dashed empty slot; put the visible contents in `row-body` so they hide while the slot is empty. `row-moved` is the dark foreground border on the row that moved. `row-dropped` plays the 8px, 320ms landing animation.

```html
<div class="row row-reorderable" draggable="true">
  <span class="row-body">chapter-01.xml</span>
  <button class="button-icon" type="button" aria-label="Remove">×</button>
</div>

<div class="row row-reorderable row-placeholder">
  <span class="row-body">chapter-01.xml</span>
</div>

<div class="row row-reorderable row-moved row-dropped">
  <span class="row-body">chapter-02.xml</span>
</div>
```

### Progress

The bar is 4px, square, and flat: foreground (near-black on white) on the border-colored track. `progress-success` turns the fill green (`--number-positive`).

```html
<div class="progress" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style="width: 40%"></div>
</div>

<div class="progress progress-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style="width: 100%"></div>
</div>

<progress class="progress progress-success" value="100" max="100">Done</progress>
```

### Toast

A square bordered box, fixed to the bottom right. It fades up 8px over 320ms, holds for 6 seconds, then fades. The dismiss control is a square secondary button. Removing it on click is up to the page. The timed close is the CSS animation.

```html
<div class="toast" role="status">
  <p>Joined 3 files.</p>
  <button class="toast-dismiss" type="button">Dismiss</button>
</div>
```

## Tokens without element styles

`@camib0b/ui/tokens.css` is the same custom properties as `ui.css` (`:root` and `.dark`) and nothing else. Another app can import it without restyling `html`, `body`, links, or buttons. Add `class="dark"` to the root for the dark palette.

`@camib0b/ui/theme-v4.css` maps those tokens onto Tailwind v4 utilities with `@theme inline`, and it imports `tokens.css`. From the app stylesheet:

```css
@import "tailwindcss";
@import "@camib0b/ui/theme-v4.css";
```

Utilities include `bg-background`, `text-foreground`, `rounded-lg`, `shadow-elev-1`, `shadow-elev-2`, `shadow-elev-3`, `ease-out-strong`, `ease-hero`, `ease-color`, `duration-press`, `duration-color`, `duration-button`, `duration-row`, `duration-drop`, and `duration-toast`. The v3 preset exposes the same additions (`shadow-elev-1`, `duration-color`, `ease-hero`) next to the existing ones.

## Motion

`ui.css` includes the motion classes. `@camib0b/ui/motion.css` is those classes alone, with no element resets. Import `tokens.css` first. `prefers-reduced-motion` drops transforms and movement and keeps opacity and color transitions.

| Class | What it does |
| --- | --- |
| `link-underline` | Foreground underline that scales in from the left over 250ms `ease-out-strong` |
| `text-press` | Color over 200ms `--color-ease`, scale to 0.97 on press |
| `contact-reveal` | Opacity and a 4px slide. Open 180ms, close 120ms. `data-state="open"` |
| `copy-swap-icon` | Cross-fade with `data-visible="true"` or `"false"` inside `copy-swap-icon-stack` |
| `curtain-reveal-item` | Curtain fall. `CurtainReveal` sets `data-curtain` and `--curtain-index` |
| `press` | Scale to 0.97 on `:active` over `--duration-press` (80ms) `--ease-out-strong`. Transform only |
| `segmented` | Square track and a sliding thumb (`::before`) from `--segmented-index` / `--segmented-count`, or `data-segment` / `data-count` |
| `tap-reset` | Clears the tap highlight and sets `touch-action: manipulation` |

```html
<a class="link-underline" href="/capital">Capital</a>
<button class="text-press press tap-reset" type="button">Copy</button>
<div class="segmented" data-count="2" data-segment="0" role="group" aria-label="Language">
  <button type="button" aria-pressed="true">EN</button>
  <button type="button" aria-pressed="false">ES</button>
</div>
```

`CurtainReveal` and `useCurtainReveal` stagger direct children. `useRevealPresence` keeps a `contact-reveal` panel mounted through the 120ms close (`REVEAL_CLOSE_DURATION_MS`). `PatternedBackground` paints the fixed cross and noise tiles.

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
| `@camib0b/ui` | `LanguageProvider`, `useLanguage`, `languageFromDevice`, `SiteHeader`, `LanguageToggle`, `bindDropZone`, `startAttentionPulse`, `CurtainReveal`, `useCurtainReveal`, `CurtainPhase`, `PatternedBackground`, `useRevealPresence`, `REVEAL_CLOSE_DURATION_MS` |
| `@camib0b/ui/preset` | Tailwind preset |
| `@camib0b/ui/ui.css` | Prebuilt stylesheet, including motion classes |
| `@camib0b/ui/tokens.css` | Color, radius, shadow, duration, and easing tokens only |
| `@camib0b/ui/theme-v4.css` | Tailwind v4 `@theme` map of those tokens |
| `@camib0b/ui/motion.css` | Motion classes without element resets |
| `@camib0b/ui/header` | `SiteHeader` |
| `@camib0b/ui/language` | Language provider and hook |
| `@camib0b/ui/drop-zone` | `bindDropZone` for plain pages |
| `@camib0b/ui/attention-pulse` | `startAttentionPulse` for plain pages |
| `@camib0b/ui/curtain-reveal` | `CurtainReveal`, `useCurtainReveal`, `CurtainPhase` |
| `@camib0b/ui/patterned-background` | `PatternedBackground` |
| `@camib0b/ui/reveal` | `useRevealPresence`, `REVEAL_CLOSE_DURATION_MS` |

React and Tailwind are optional peer dependencies. A plain HTML page only needs the CSS file.
