import { useLanguage, type Language } from "./language-context";

const LANGUAGES: ReadonlyArray<{ code: Language; label: string }> = [
  { code: "en", label: "EN" },
  { code: "es", label: "ES" },
];

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language">
      {LANGUAGES.map((lang) => {
        const isActive = language === lang.code;

        return (
          <button
            key={lang.code}
            type="button"
            onClick={() => setLanguage(lang.code)}
            className={[
              "inline-flex items-center justify-center whitespace-nowrap rounded-md",
              "ring-offset-background transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:pointer-events-none disabled:opacity-50",
              "h-8 px-3 min-w-[2.5rem]",
              "text-[11px] font-medium tracking-[0.18em] uppercase",
              isActive
                ? "bg-secondary/70 text-foreground border border-border/60 shadow-none"
                : "text-muted-foreground/90 hover:text-foreground hover:bg-accent/30",
            ].join(" ")}
            aria-pressed={isActive}
            aria-label={`Switch to ${lang.code === "en" ? "English" : "Spanish"}`}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
}
