"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageToggle = LanguageToggle;
const jsx_runtime_1 = require("react/jsx-runtime");
const language_context_1 = require("./language-context");
const LANGUAGES = [
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
];
function LanguageToggle() {
    const { language, setLanguage } = (0, language_context_1.useLanguage)();
    return ((0, jsx_runtime_1.jsx)("div", { className: "flex items-center gap-1", role: "group", "aria-label": "Language", children: LANGUAGES.map((lang) => {
            const isActive = language === lang.code;
            return ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: () => setLanguage(lang.code), className: [
                    "inline-flex items-center justify-center whitespace-nowrap rounded-md",
                    "ring-offset-background transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                    "disabled:pointer-events-none disabled:opacity-50",
                    "h-8 px-3 min-w-[2.5rem]",
                    "text-[11px] font-medium tracking-[0.18em] uppercase",
                    isActive
                        ? "bg-secondary/70 text-foreground border border-border/60 shadow-none"
                        : "text-muted-foreground/90 hover:text-foreground hover:bg-accent/30",
                ].join(" "), "aria-pressed": isActive, "aria-label": `Switch to ${lang.code === "en" ? "English" : "Spanish"}`, children: lang.label }, lang.code));
        }) }));
}
