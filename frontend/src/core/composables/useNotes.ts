import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query/build/legacy/_tsup-dts-rollup";
import { computed, type Ref } from "vue";
import { noteApi } from "../api/NoteApi";

export const useNotes = (
    hiveId: Ref<number | undefined>
) => {
    const queryClient = useQueryClient()

    const { data: notes, isLoading, isError } = useQuery({
        queryKey: ["notes", { id: hiveId.value }],
        queryFn:  () => noteApi.getNotes(hiveId.value!),
        enabled:  computed(() => hiveId.value != undefined)
    })

    const { mutate: createNote, isPending: isCreatingNote } = useMutation({
        mutationFn: noteApi.create,
        onSuccess:  (newNote) => {
            queryClient.invalidateQueries({ queryKey: ['notes'] })
        }
    })

    const { mutate: deleteNote, isPending: isDeletingNote } = useMutation({
        mutationFn: noteApi.delete,
        onSuccess:  (id) => {
            queryClient.invalidateQueries({ queryKey: ['notes'] })
        }
    })

    const { mutate: updateNote, isPending: isUpdatingNote } = useMutation({
        mutationFn: noteApi.update,
        onSuccess:  (updatedNote) => {
            queryClient.invalidateQueries({ queryKey: ['notes'] })
        }
    })

    return {
        notes,
        isLoading,
        isError,
        createNote,
        deleteNote,
        updateNote,
        isCreatingNote,
        isDeletingNote,
        isUpdatingNote
    }
}
