var zIndex = 1000
const setOnTop = () => `${zIndex++}`

export function focusPopup(componentRootEl: HTMLElement) {
    componentRootEl.style.zIndex = setOnTop();
}