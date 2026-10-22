"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiteHeader = SiteHeader;
const jsx_runtime_1 = require("react/jsx-runtime");
const language_toggle_1 = require("./language-toggle");
const SITE_HOME_URL = "https://camilaescudero.cl";
const DEFAULT_STICKY_CLASS_NAME = "sticky top-0 z-20 bg-background/90 backdrop-blur-sm border-b border-border";
const DEFAULT_CONTAINER_CLASS_NAME = "container px-6 md:px-8 max-w-3xl mx-auto flex items-center justify-between h-12";
function ArrowLeftIcon() {
    return ((0, jsx_runtime_1.jsxs)("svg", { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "w-3 h-3", "aria-hidden": "true", children: [(0, jsx_runtime_1.jsx)("path", { d: "M19 12H5" }), (0, jsx_runtime_1.jsx)("polyline", { points: "12 19 5 12 12 5" })] }));
}
function SiteHeader({ backLabel = "camilaescudero.cl", backHref = SITE_HOME_URL, actions, stickyClassName = DEFAULT_STICKY_CLASS_NAME, containerClassName = DEFAULT_CONTAINER_CLASS_NAME, }) {
    return ((0, jsx_runtime_1.jsx)("header", { className: stickyClassName, children: (0, jsx_runtime_1.jsxs)("div", { className: containerClassName, children: [(0, jsx_runtime_1.jsxs)("a", { href: backHref, className: "text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5", children: [(0, jsx_runtime_1.jsx)(ArrowLeftIcon, {}), backLabel] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)(language_toggle_1.LanguageToggle, {}), actions] })] }) }));
}
