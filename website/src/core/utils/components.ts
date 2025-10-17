import { createVNode, render, type Component, type DefineComponent, type ExtractPropTypes, type VNode} from "vue";
import { focusPopup } from "./PopupHiarchy";

export interface ComponentWithProps {
  component: Component
  props?: Record<string, unknown>
}

export function createComponentWithProps<
  C extends Component,
  P extends Record<string, any> = C extends { __propDef: { props: infer PP } }
    ? ExtractPropTypes<PP>
    : Record<string, unknown>
>(component: C, props: P) {
  return { component, props }
}

type ExtraPopupProps = {
  unmount?: () => void
  focusHandler?: (el: HTMLElement) => void
}

export type PopupFunctions = {
    unmount: () => void
    focus: () => void
}

export function createPopup(
    component: Component, // <-- loose type
    props: Record<string, any> = {},
) {
    // useless wrapper just to later 'safely and correctly' unmount created
    const container = document.createElement('div')
    document.body.appendChild(container)

    container.style.position = 'fixed'
    
    const popupFunctions: PopupFunctions = {
        unmount: function (): void {
            render(null, container)
            container.remove()
        },
        focus: function (): void {
            focusPopup(container)
        }
    } 

    // Create vnode with optional props  ...props - all previously defined props, and new one - unmount
    const vnode: VNode = createVNode(component, { ...props, popupFunctions})
    render(vnode, container)

    return {
        vnode,
    }
}

export function createComponentInstance(
    component: Component, // <-- loose type
    props: Record<string, any> = {},
    isPopup = false
) {
    // useless wrapper just to later 'safely and correctly' unmount created
    const container = document.createElement('div')
    document.body.appendChild(container)

    if (isPopup) {
        container.style.position = 'fixed'
        focusPopup(container)
    }

    // unmount function that component can call to destroy itself
    const unmount = () => {
        render(null, container)
        container.remove()
    }

    // Create vnode with optional props  ...props - all previously defined props, and new one - unmount
    const vnode: VNode = createVNode(component, { ...props, unmount, ...(isPopup ? { focusHandler: focusPopup } : {})})
    render(vnode, container)

    return {
        vnode,
        unmount
    }
}
