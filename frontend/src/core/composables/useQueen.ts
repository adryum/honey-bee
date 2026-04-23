import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed, unref, type MaybeRef } from "vue";
import { ActionType, useActionsStore } from "../stores/ActionStore";
import { queenApi } from "../api/QueenApi";

export const useQueensQuery = (
    data
: {
    queenIds: MaybeRef<number[] | undefined>,
    hiveIds:  MaybeRef<number[] | undefined>,
}) => {
    const { data: queens, isLoading: isQueensLoading, isError: isQueensError } = useQuery({
        queryKey: computed(() => ["queens", { 
            queenIds: unref(data.queenIds),
            hiveIds:  unref(data.hiveIds)
        }]),
        queryFn:  () => queenApi.getQueens(unref(data.queenIds)!, unref(data.hiveIds)!)
    })

    return {
        queens,
        isQueensLoading,
        isQueensError,
    }
}

export const useQueenMutations = () => {
    const queryClient = useQueryClient()
    const { createPopupAction } = useActionsStore()

    const { mutate: create, isPending: isCreatingQueen } = useMutation({
        mutationFn: queenApi.createQueen,
        onSuccess: (newQueen) => {
            queryClient.invalidateQueries({ queryKey: ['queens'] })
            createPopupAction({
                label: `Created Queen: ${newQueen.species.scientificName}`,
                type:  ActionType.Success
            })
        },
        onError: (error) => {
            createPopupAction({
                label: "Failed to create queen!",
                type:  ActionType.Error
            })
        }
    })

    const { mutate: update, isPending: isUpdatingQueen } = useMutation({
        mutationFn: queenApi.updateQueen,
        onSuccess: (newQueen) => {
            queryClient.invalidateQueries({ queryKey: ['queens'] })

            createPopupAction({
                label: `Updated Queen: #${newQueen.id} ${newQueen.species.scientificName}`,
                type:  ActionType.Success
            })
        },
        onError: (error) => {
            createPopupAction({
                label: "Failed to update queen!",
                type:  ActionType.Error
            })
        }
    })

    return {
        create,
        update,
        isCreatingQueen,
        isUpdatingQueen
    }

}