import { useQueryClient, useQuery, useMutation } from "@tanstack/vue-query";
import { apiaryApi } from "../api/ApiaryApi";
import { computed, type Ref } from "vue";

export const useApiariesQuery = () => {
    const { data: apiaries, isLoading, isError } = useQuery({
        queryKey: ["apiaries"],
        queryFn:  apiaryApi.getApiaries
    })

    return {
        apiaries,
        isLoading,
        isError,
    }
}

export const useApiaryQuery = (id: Ref<number | undefined>) => {
    const { data: apiary, isLoading, isError } = useQuery({
        queryKey: ["apiaries", id],
        queryFn:  () => apiaryApi.getApiary(id.value!),
        enabled:  computed(() => id.value !== undefined)
    })

    return {
        apiary,
        isLoading,
        isError
    }
}

export const useApiaryMutations = () => {
    const queryClient = useQueryClient()

    const { mutate: createApiary, isPending: isCreatingApiary } = useMutation({
        mutationFn: apiaryApi.createApiary,
        onSuccess: (newApiary) => {
            queryClient.invalidateQueries({ queryKey: ['apiaries'] })
        }
    })

    const { mutate: deleteApiary, isPending: isDeletingApiary } = useMutation({
        mutationFn: apiaryApi.deleteApiary,
        onSuccess: (id) => {
            queryClient.invalidateQueries({ queryKey: ['apiaries'] })
        }
    })

    const { mutate: assignHive, isPending: isAssigningHive } = useMutation({
        mutationFn: apiaryApi.assignHive,
        onSuccess: (result) => {
            // queryClient.invalidateQueries({ queryKey: ['apiaries'] })
        }
    })

    const { mutate: unassignHive, isPending: isUnassigningHive } = useMutation({
        mutationFn: apiaryApi.unassignHive,
        onSuccess: (result) => {
            // queryClient.invalidateQueries({ queryKey: ['apiaries'] })
        }
    })

      // const { mutate: updateApiary } = useMutation({
    //     mutationFn: apiaryApi.updateApiary,
    //     onSuccess: (updatedApiary) => {
    //         queryClient.invalidateQueries({ queryKey: ['apiaries'] })
    //     }
    // })

    return {
        createApiary,
        deleteApiary,
        assignHive,
        unassignHive,
        isCreatingApiary,
        isDeletingApiary,
        isAssigningHive,
        isUnassigningHive
    }
}