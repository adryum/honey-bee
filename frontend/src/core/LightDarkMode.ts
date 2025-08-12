import { useColorMode, useCssVar, useDark } from "@vueuse/core";
import { watch } from "vue";

const baseCssVar = useCssVar('--base', document.documentElement)
const accentCssVar = useCssVar('--accent', document.documentElement)
const lightCssVar = useCssVar('--light', document.documentElement)

const mode = useColorMode({
    attribute: 'theme',
    modes: {
        // custom colors
        // dim: 'dim',
        // cafe: 'cafe',
    },
})

export enum Theme {
    dark = 'dark',
    light = 'light'
}

interface ThemeColors {
  base: string
  accent: string
  light: string
}

const colors: Record<Theme, ThemeColors> = {
    [Theme.light]: {
        base: '#d0bf9f',
        accent: '#E3D5B8',
        light: '#F9EDDC',
    },
    [Theme.dark]: {
        base: '#3F332E',
        accent: '#55453F',
        light: '#836A61'
    }
}

function setNewColors(theme: Theme) {
    baseCssVar.value = colors[theme].base
    accentCssVar.value = colors[theme].accent
    lightCssVar.value = colors[theme].light
}

function getEnumValue<T extends Record<string, string>>(enumObj: T, value: string): T[keyof T] | undefined {
  const enumValues = Object.values(enumObj)
  return enumValues.includes(value) ? (value as T[keyof T]) : undefined
}

watch(mode, (nMode) => {
    const response = getEnumValue(Theme, nMode)

    if (response) {
        setNewColors(Theme[response])
    }
})

export function setMode(theme: Theme) {
    mode.value = theme
}