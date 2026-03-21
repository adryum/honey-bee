import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query/build/legacy/_tsup-dts-rollup";

import type { MaybeRef, Ref } from "vue";

export const useProfile = (userId: MaybeRef<number | undefined>) => {
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