import { ref } from 'vue';

export const rActivePopups = ref([])

function focusPopup() {
    // on click will find a popup and rise its z-index
    // while lowering previous ones index
}

export function createPopup(component, props) {
    const nextPopupId = rActivePopups.value.length

    // adding to provided properties
    props['popupId'] = nextPopupId

    rActivePopups.value.push({
        component,
        props: props
    })
}

export function removePopup(popupId) {
    rActivePopups.value.splice(popupId, 1)
    console.log('removed popup id: ' + popupId);
    console.log(rActivePopups.value);
    
}