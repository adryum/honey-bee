import { ref, shallowRef, triggerRef, watch, type Ref } from 'vue'
import { defineStore } from 'pinia'
import { TransitionPresets, useTransition } from '@vueuse/core'
import { getUniqueThisSesionId } from '../utils/others'

export type ActionUIModel = {
    id: number
    message: string
    type: ActionType
    action?: ActionModel
    duration: number
    progress: Ref<number>
    isVisible: boolean
    entering: Ref<boolean>
    entered: Ref<boolean>
    exiting: Ref<boolean>
    exited: Ref<boolean>
}

export type ActionCreateModel = {
    message: string
    type: ActionType
    action?: ActionModel
}

export enum ActionType {
    Info = "Yellow",
    Error = "Red",
    Success = "#84d847"
}

export type ActionModel = {
    buttonText: string
    action: () => void
}


export class ActionNotification {
    static readonly SubmitedInvoice = new ActionNotification({
        id: getUniqueThisSesionId(),
        message: 'Invoice submited!',
        type: ActionType.Success,
    })
    static readonly FailedToSubmitInvocie = new ActionNotification({
        id: getUniqueThisSesionId(),
        message: 'Failed to submit invocie!',
        type: ActionType.Error,
    })
    static readonly FailedToUpdateInvocieStatus = new ActionNotification({
        id: getUniqueThisSesionId(),
        message: 'Failed to update invocie status!',
        type: ActionType.Error,
    })
    static readonly UpdatedInvoiceStatus = new ActionNotification({
        id: getUniqueThisSesionId(),
        message: 'Invoice status updated!',
        type: ActionType.Success,
    })
    static readonly DevFailedToGetUserInfo = new ActionNotification({
        id: getUniqueThisSesionId(),
        message: 'Failed to get user profile!',
        type: ActionType.Error
    })
    static readonly FailedToAddWhitelistEntry = new ActionNotification({
        id: getUniqueThisSesionId(),
        message: 'Failed to add new whitelist entry!',
        type: ActionType.Error,
    })
    static readonly SucseededToAddWhitelistEntry = new ActionNotification({
        id: getUniqueThisSesionId(),
        message: 'Whitelist entry added!',
        type: ActionType.Success,
    })

    static readonly FailedToUpdateWhitelist = new ActionNotification({
        id: getUniqueThisSesionId(),
        message: 'Failed to update entry!',
        type: ActionType.Error,
    })
    static readonly SuccseededToUpdateWhitelist = new ActionNotification({
        id: getUniqueThisSesionId(),
        message: 'Entry updated!',
        type: ActionType.Success,
    })
    static readonly FailedToRemoveWhitelistEntry = new ActionNotification({
        id: getUniqueThisSesionId(),
        message: 'Failed to remove entry!',
        type: ActionType.Error,
    })
    static readonly SuccseededToRemoveWhitelistEntry = new ActionNotification({
        id: getUniqueThisSesionId(),
        message: 'Entry removed!',
        type: ActionType.Success,
    })
    static readonly DeleteSuccess = new ActionNotification({
        id: getUniqueThisSesionId(),
        message: 'Deleted!',
        type: ActionType.Success,
    })
    static readonly DeleteFailure = new ActionNotification({
        id: getUniqueThisSesionId(),
        message: 'Failed to delete file!',
        type: ActionType.Error,
    })
    static readonly UploadSuccess = new ActionNotification({
        id: getUniqueThisSesionId(),
        message: 'File uploaded!',
        type: ActionType.Success,
    })
    static readonly UploadFailure = new ActionNotification({
        id: getUniqueThisSesionId(),
        message: 'Upload failed!',
        type: ActionType.Error,
    })
    static readonly DownloadInvoiceSuccess = new ActionNotification({
        id: getUniqueThisSesionId(),
        message: 'Invoice downloaded!',
        type: ActionType.Success,
    })
    static readonly DownloadInvoiceFailure = new ActionNotification({
        id: getUniqueThisSesionId(),
        message: 'Failed to download invoice!',
        type: ActionType.Error,
    })
    static readonly ServerSheetRefechSuccess = new ActionNotification({
        id: getUniqueThisSesionId(),
        message: 'Successfuly refetched!',
        type: ActionType.Success,
    })
    static readonly ServerSheetRefechFailure = new ActionNotification({
        id: getUniqueThisSesionId(),
        message: 'Refech failed!',
        type: ActionType.Error,
    })

    id: number
    message: string
    type: ActionType
    action?: ActionModel

    private constructor(actionObj: ActionNotification) {
        this.id = actionObj.id
        this.message = actionObj.message
        this.type = actionObj.type
        this.action = actionObj.action
    }
}

export const useActionsStore = defineStore('actionStore', () => {
    const actions = shallowRef<ActionUIModel[]>([])

    function addAction(notification: ActionNotification, action?: ActionModel) {
        const newAction: ActionUIModel = {
            ...notification,
            action: action,
            duration: notification.type === ActionType.Error ? 5 : 2,
            progress: ref(0),
            isVisible: true,
            entering: ref(false),
            entered: ref(false),
            exiting: ref(false),
            exited: ref(false),
        }
        actions.value.push(newAction)
        startAction(newAction)

        triggerRef(actions)
    }

    function startAction(action: ActionUIModel) {
        if (!action.isVisible) return

        console.log("Duration: ", action.duration);
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
                    hideAction(action)
                }
        })

        console.log("action.progress", action.progress.value);
    }

    function hideAction(action: ActionUIModel) {
        // dont remove it. just hide it
        action.isVisible = false
        triggerRef(actions)

        // const index = actions.indexOf(action)
        // actions.splice(index, 1)
    }
    
    return {
        actions,
        addAction,
        hideAction,
        startAction
    }
})