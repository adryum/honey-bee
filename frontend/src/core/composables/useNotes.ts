import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed, type Ref } from "vue";
import { noteApi } from "../api/NoteApi";

export const useNotes = ({
    hiveId
}: {
    hiveId: Ref<number | undefined>
}
) => {
    const { data: notes, isLoading, isError } = useQuery({
        queryKey: ["notes", { id: hiveId.value }],
        queryFn:  () => noteApi.getNotes(hiveId.value!),
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

    const { mutate: create, isPending: isCreatingNote } = useMutation({
        mutationFn: noteApi.create,
        onSuccess:  (newNote) => {
            queryClient.invalidateQueries({ queryKey: ['notes'] })
        }
    })

    const { mutate: remove, isPending: isDeletingNote } = useMutation({
        mutationFn: noteApi.delete,
        onSuccess:  (id) => {
            queryClient.invalidateQueries({ queryKey: ['notes'] })
        }
    })

    const { mutate: update, isPending: isUpdatingNote } = useMutation({
        mutationFn: noteApi.update,
        onSuccess:  (updatedNote) => {
            queryClient.invalidateQueries({ queryKey: ['notes'] })
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
