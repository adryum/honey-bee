import type { PopupInfo } from "./components";

var zIndex = 1000
const setOnTop = () => `${zIndex++}`

export function focusPopup(popup: PopupInfo) {
    const newZIndex = setOnTop()

    // dont change if clicked again same element
    if (Number(newZIndex) - 1 === Number(popup.element.value.style.zIndex)) {
        zIndex--
        return
    }

    popup.zIndex.value = Number(newZIndex);
    popup.element.value.style.zIndex = newZIndex;
}