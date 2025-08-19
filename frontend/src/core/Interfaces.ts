import type { SVGIcon } from "./SVGLoader";

export interface IDropdownButton {
    text: string,
    svg: SVGIcon,
    onClick?: () => void
}