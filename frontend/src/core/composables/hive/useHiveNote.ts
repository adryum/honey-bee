import { HistoryActionType } from "@/core/DatabaseEnums"
import { useActionsStore, ActionType } from "@/core/stores/ActionStore"
import { useQuery, useQueryClient, useMutation } from "@tanstack/vue-query"
import { type Ref, computed } from "vue"
import { useHiveActionHistoryMutations } from "./useHiveActionHistory"
import { hiveApi } from "@/core/api/HiveApi"


export const useNotes = ({
    hiveId
}: {
    hiveId: Ref<number | undefined>
}
) => {
    const { data: notes, isLoading, isError } = useQuery({
        queryKey: ["notes", { id: hiveId.value }],
        queryFn:  () => hiveApi.notes.getFromHive(hiveId.value!),
        enabled:  computed(() => hiveId.value != undefined)
    })

    return {
        notes,
        isLoading,
        isError,
    }
}

export const useNoteMutations = () => {
    const queryClient = useQueryClient()
    const { createPopupAction }= useActionsStore()
    const { create: createHiveHistory } = useHiveActionHistoryMutations()

    const { mutate: create, isPending: isCreatingNote } = useMutation({
        mutationFn: hiveApi.notes.create,
        onSuccess:  (newNote) => {
            queryClient.invalidateQueries({ queryKey: ['notes'] })

            createPopupAction({
                label: `Created note: ${newNote.title}`,
                type:  ActionType.Success
            })

            console.log("notes hiveId", newNote.hiveId);
            
            createHiveHistory({
                hiveId: newNote.hiveId,
                text:   "Created note",
                type:   HistoryActionType.NOTE
            })
        },
        onError: (error) => {
            createPopupAction({
                label: "Failed to create note!",
                type:  ActionType.Error
            })
        }
    })

    const { mutate: remove, isPending: isDeletingNote } = useMutation({
        mutationFn: hiveApi.notes.delete,
        onSuccess:  (id) => {
            queryClient.invalidateQueries({ queryKey: ['notes'] })

            createPopupAction({
                label: `Removed note!`,
                type:  ActionType.Success
            })
        },
        onError: (error) => {
            createPopupAction({
                label: "Failed to remove note!",
                type:  ActionType.Error
            })
        }
    })

    const { mutate: update, isPending: isUpdatingNote } = useMutation({
        mutationFn: hiveApi.notes.update,
        onSuccess:  (updatedNote) => {
            queryClient.invalidateQueries({ queryKey: ['notes'] })

            createPopupAction({
                label: `Updated note: ${updatedNote.title}`,
                type:  ActionType.Success
            })
        },
        onError: (error) => {
            createPopupAction({
                label: "Failed to update note!",
                type:  ActionType.Error
            })
        }
    })

    return {
        create,
        remove,
        update,
        isCreatingNote,
        isDeletingNote,
        isUpdatingNote
    }
}
