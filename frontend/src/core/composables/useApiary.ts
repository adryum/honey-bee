import { useQueryClient, useQuery, useMutation } from "@tanstack/vue-query";
import { apiaryApi } from "../api/ApiaryApi";

export const useApiaries = () => {
    const queryClient = useQueryClient()

    const { data: apiaries, isLoading, isError } = useQuery({
        queryKey: ["apiaries"],
        queryFn: apiaryApi.getApiaries
    })

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
        apiaries,
        isLoading,
        isError,
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