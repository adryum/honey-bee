import { ref } from 'vue'

const THEMES = ['light', 'dark'] as const
type Theme = typeof THEMES[number]

const theme = ref<Theme>((localStorage.getItem('theme') as Theme) ?? 'light')
document.documentElement.setAttribute('data-theme', theme.value)

export function useTheme() {
    function setTheme(t: Theme) {
        theme.value = t
        document.documentElement.setAttribute('data-theme', t)
        localStorage.setItem('theme', t)
    }

    function cycleTheme() {
        setTheme(THEMES[(THEMES.indexOf(theme.value) + 1) % THEMES.length])
    }

  return { theme, setTheme, cycleTheme }
}