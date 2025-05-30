import { ref } from 'vue';

export const rActivePopups = ref([])

function focusPopup() {
    // on click will find a popup and rise its z-index
    // while lowering previous ones index
}

export function createPopup(component) {
    const nextPopupId = rActivePopups.value.length
    rActivePopups.value.push({
        component,
        props: {
            popupId: nextPopupId
        }
    })
}

export function removePopup(popupId) {
    rActivePopups.value.splice(popupId, 1)
    console.log('removed popup id: ' + popupId);
    console.log(rActivePopups.value);
    
}