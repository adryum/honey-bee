import type { SVGImage } from "./SVGLoader";

export type DropdownOptions = {
    text: string
    svg?: SVGImage 
    color?: string 
    onClick?: () => void
}