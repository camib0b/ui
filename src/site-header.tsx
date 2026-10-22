import type { ReactNode } from "react";
import { LanguageToggle } from "./language-toggle";

const SITE_HOME_URL = "https://camilaescudero.cl";

const DEFAULT_STICKY_CLASS_NAME =
  "sticky top-0 z-20 bg-background/90 backdrop-blur-sm border-b border-border";

const DEFAULT_CONTAINER_CLASS_NAME =
  "container px-6 md:px-8 max-w-3xl mx-auto flex items-center justify-between h-12";

export interface SiteHeaderProps {
  backLabel?: string;
  backHref?: string;
  actions?: ReactNode;
  stickyClassName?: string;
  containerClassName?: string;
}

function ArrowLeftIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-3 h-3"
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

export function SiteHeader({
  backLabel = "camilaescudero.cl",
  backHref = SITE_HOME_URL,
  actions,
  stickyClassName = DEFAULT_STICKY_CLASS_NAME,
  containerClassName = DEFAULT_CONTAINER_CLASS_NAME,
}: SiteHeaderProps) {
  return (
    <header className={stickyClassName}>
      <div className={containerClassName}>
        <a
          href={backHref}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
        >
          <ArrowLeftIcon />
          {backLabel}
        </a>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          {actions}
        </div>
      </div>
    </header>
  );
}
