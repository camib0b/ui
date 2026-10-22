import type { ReactNode } from "react";
export interface SiteHeaderProps {
    backLabel?: string;
    backHref?: string;
    actions?: ReactNode;
    stickyClassName?: string;
    containerClassName?: string;
}
export declare function SiteHeader({ backLabel, backHref, actions, stickyClassName, containerClassName, }: SiteHeaderProps): import("react").JSX.Element;
