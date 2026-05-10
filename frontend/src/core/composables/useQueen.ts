import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed, unref, type MaybeRef } from "vue";
import { ActionType, useActionsStore } from "../stores/ActionStore";
import { queenApi } from "../api/QueenApi";

export const useQueenQuery = (
    queenId: MaybeRef<number | undefined>
) => {
    const { data: queen, isLoading, isError } = useQuery({
        queryKey: computed(() => ["queen", unref(queenId)]),
        queryFn:  () => queenApi.get(unref(queenId)!),
        enabled:  computed(() => unref(queenId) !== undefined)
    })

    return {
        queen,
        isLoading,
        isError,
    }
}

export const useQueensQuery = (data: {
    queenIds: MaybeRef<number[] | undefined>,
    hiveIds:  MaybeRef<number[] | undefined>,
}) => {
    const { data: queens, isLoading: isQueensLoading, isError: isQueensError } = useQuery({
        queryKey: computed(() => ["queens", { 
            queenIds: unref(data.queenIds),
            hiveIds:  unref(data.hiveIds)
        }]),
        queryFn:  () => queenApi.getAll(
            unref(data.queenIds), 
            unref(data.hiveIds)
        )
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
        mutationFn: queenApi.create, 
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
        mutationFn: queenApi.update,
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

    const { mutate: remove, isPending: isDeletingQueen } = useMutation({
        mutationFn: queenApi.delete,
        onSuccess: (id) => {
            queryClient.invalidateQueries({ queryKey: ['queens'] })
        }
    })

    return {
        create,
        update,
        remove,
        isCreatingQueen,
        isUpdatingQueen
    }

}