import type { SVGIcon } from "./SVGLoader";

export type DropdownOptions = {
    text: string,
    svg?: SVGIcon,
    onClick?: () => void
}