import { ref, shallowRef, triggerRef, watch, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { TransitionPresets, useTransition } from '@vueuse/core'
import { getUniqueThisSesionId } from '../utils/others'

export type ActionUIModel = {
    id :        number
    message :   string
    type :      ActionType
    action?:    ActionModel
    duration :  number
    progress :  Ref<number>
    isVisible : boolean
    entering :  Ref<boolean>
    entered :   Ref<boolean>
    exiting :   Ref<boolean>
    exited :    Ref<boolean>
}

export type PlainMessagePopupCreateModel = {
    label :  string
    type :   ActionType
    action?: ActionModel
}

export enum ActionType {
    Info    = "yellow",
    Error   = "Red",
    Success = "#84d847"
}

export type ActionModel = {
    buttonText: string
    action: () => void
}

export const useActionsStore = defineStore('actionStore', () => {
    const actions = shallowRef<ActionUIModel[]>([])

    function createPopupAction({ label, type, action }: PlainMessagePopupCreateModel) {
        const newAction: ActionUIModel = {
            id:        getUniqueThisSesionId(),
            message:   label,
            type:      type,
            action:    action,
            duration:  type === ActionType.Error ? 5: 2,
            progress:  ref(0),
            isVisible: true,
            entering:  ref(false),
            entered:   ref(false),
            exiting:   ref(false),
            exited:    ref(false),
        }
        actions.value.push(newAction)
        showAnimation(newAction)

        triggerRef(actions)
    }

    function showAnimation(action: ActionUIModel) {
        if (!action.isVisible) return

        // console.log("Duration: ", action.duration);
        const animSource = ref(0)
        
        action.progress = useTransition(animSource, {
            duration: action.duration * 1000,
            transition: TransitionPresets.easeInOutCubic,
            onFinished() {
                action.exiting.value = true
            },
        })

        action.entering.value = true;

        watch(
            [
                () => action.entered.value,
                () => action.exited.value,
            ], ([entered,  exited]) => {
                if (entered) {
                    console.log("entered", entered);
                    animSource.value = 100
                }

                if (exited) {
                    console.log("exited", exited);
                    hideAnimation(action)
                }
        })

        console.log("action.progress", action.progress.value);
    }

    function hideAnimation(action: ActionUIModel) {
        // dont remove it. just hide it
        action.isVisible = false
        triggerRef(actions)
    }
    
    return {
        actions,
        createPopupAction,
        hideAnimation,
        showAnimation
    }
})