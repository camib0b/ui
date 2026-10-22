import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export const LANGUAGE_STORAGE_KEY = "language";

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

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function isLanguage(value: string | null): value is Language {
  return value === "en" || value === "es";
}

function readSavedLanguage(): Language | null {
  try {
    if (typeof localStorage === "undefined") {
      return null;
    }
    const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    return isLanguage(saved) ? saved : null;
  } catch {
    return null;
  }
}

/** First device preference whose tag starts with es or en. Anything else is English. */
export function languageFromDevice(): Language {
  if (typeof navigator === "undefined") {
    return "en";
  }

  const reportedLanguages = navigator.languages;
  const preferences =
    reportedLanguages && reportedLanguages.length > 0 ? reportedLanguages : [navigator.language];

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

export function LanguageProvider({ children, messages }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(
    () => readSavedLanguage() ?? languageFromDevice()
  );

  const setLanguage = (nextLanguage: Language) => {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, nextLanguage);
    } catch {
      // Storage can be blocked. The in-memory choice still applies.
    }
    setLanguageState(nextLanguage);
  };

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }
    document.documentElement.lang = language;
  }, [language]);

  const translate = (key: string): string => {
    if (!messages) {
      return key;
    }
    return messages[language][key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
