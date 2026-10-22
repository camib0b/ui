import { type ReactNode } from "react";
export declare const LANGUAGE_STORAGE_KEY = "language";
export type Language = "en" | "es";
export interface LanguageMessages {
    en: Record<string, string>;
    es: Record<string, string>;
}
export interface LanguageContextValue {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: string) => string;
}
export interface LanguageProviderProps {
    children: ReactNode;
    messages?: LanguageMessages;
}
/** First device preference whose tag starts with es or en. Anything else is English. */
export declare function languageFromDevice(): Language;
export declare function LanguageProvider({ children, messages }: LanguageProviderProps): import("react").JSX.Element;
export declare function useLanguage(): LanguageContextValue;
