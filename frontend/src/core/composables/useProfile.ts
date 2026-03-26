import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { profileApi } from "../api/ProfileApi";
import { computed } from "vue";

export const useProfileQuery = (userId: number) => {
    const { data: user, isLoading, isError } = useQuery({
        queryKey: ["users", userId],
        queryFn: () => profileApi.getProfile(userId),
        enabled:  computed(() => userId != undefined)
    })

    return {
        user,
        isLoading,
        isError
    }
}

export const useProfileMutations = () => {
    const queryClient = useQueryClient()

    // const { mutate: updateHive } = useMutation({
    //     mutationFn: hiveApi.updateHive,
    //     onSuccess: (updatedHive) => {
    //         queryClient.invalidateQueries({ queryKey: ['hives'] })
    //     }
    // })

    return {
        // updateHive
    }
}