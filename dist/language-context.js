"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LANGUAGE_STORAGE_KEY = void 0;
exports.languageFromDevice = languageFromDevice;
exports.LanguageProvider = LanguageProvider;
exports.useLanguage = useLanguage;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
exports.LANGUAGE_STORAGE_KEY = "language";
const LanguageContext = (0, react_1.createContext)(undefined);
function isLanguage(value) {
    return value === "en" || value === "es";
}
function readSavedLanguage() {
    try {
        if (typeof localStorage === "undefined") {
            return null;
        }
        const saved = localStorage.getItem(exports.LANGUAGE_STORAGE_KEY);
        return isLanguage(saved) ? saved : null;
    }
    catch {
        return null;
    }
}
/** First device preference whose tag starts with es or en. Anything else is English. */
function languageFromDevice() {
    if (typeof navigator === "undefined") {
        return "en";
    }
    const reportedLanguages = navigator.languages;
    const preferences = reportedLanguages && reportedLanguages.length > 0 ? reportedLanguages : [navigator.language];
    for (const preference of preferences) {
        if (typeof preference !== "string") {
            continue;
        }
        const tag = preference.toLowerCase();
        if (tag.startsWith("es")) {
            return "es";
        }
        if (tag.startsWith("en")) {
            return "en";
        }
    }
    return "en";
}
function LanguageProvider({ children, messages }) {
    const [language, setLanguageState] = (0, react_1.useState)(() => { var _a; return (_a = readSavedLanguage()) !== null && _a !== void 0 ? _a : languageFromDevice(); });
    const setLanguage = (nextLanguage) => {
        try {
            localStorage.setItem(exports.LANGUAGE_STORAGE_KEY, nextLanguage);
        }
        catch {
            // Storage can be blocked. The in-memory choice still applies.
        }
        setLanguageState(nextLanguage);
    };
    (0, react_1.useEffect)(() => {
        if (typeof document === "undefined") {
            return;
        }
        document.documentElement.lang = language;
    }, [language]);
    const translate = (key) => {
        var _a;
        if (!messages) {
            return key;
        }
        return (_a = messages[language][key]) !== null && _a !== void 0 ? _a : key;
    };
    return ((0, jsx_runtime_1.jsx)(LanguageContext.Provider, { value: { language, setLanguage, t: translate }, children: children }));
}
function useLanguage() {
    const context = (0, react_1.useContext)(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
