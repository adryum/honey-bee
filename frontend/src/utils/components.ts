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

export function createComponentInstance<T extends DefineComponent<any, any, any, any, any> = DefineComponent>(
    component: T,
    props?: Partial<InstanceType<T>['$props']>,
    isPopup: Boolean = false
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
