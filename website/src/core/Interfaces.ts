import type { SVGImage } from "./SVGLoader";

export type DropdownItem = {
    text: string
    svg?: SVGImage 
    color?: string 
    onClick?: () => void
}