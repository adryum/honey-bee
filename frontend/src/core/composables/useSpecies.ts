import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { computed, type Ref } from "vue";
import { noteApi } from "../api/NoteApi";
import { ActionType, useActionsStore } from "../stores/ActionStore";
import { useHiveHistoryMutations } from "./useHiveHistory";
import { HistoryEntryType } from "../DatabaseEnums";
import { speciesApi } from "../api/SpeciesApi";

export const useSpeciesQuery = () => {
    const { data: species, isLoading: isSpeciesLoading, isError: isSpeciesError } = useQuery({
        queryKey: ["species"],
        queryFn:  () => speciesApi.getSpecies(),
    })

    return {
        species,
        isSpeciesLoading,
        isSpeciesError
    }
}

// export const useNoteMutations = () => {
//     const queryClient = useQueryClient()
//     const { createPopupAction }= useActionsStore()
//     const { create: createHiveHistory } = useHiveHistoryMutations()

//     const { mutate: create, isPending: isCreatingNote } = useMutation({
//         mutationFn: noteApi.create,
//         onSuccess:  (newNote) => {
//             queryClient.invalidateQueries({ queryKey: ['notes'] })

//             createPopupAction({
//                 label: `Created note: ${newNote.title}`,
//                 type:  ActionType.Success
//             })

//             console.log("notes hiveId", newNote.hiveId);
            
//             createHiveHistory({
//                 hiveId: newNote.hiveId,
//                 text:   "Created note",
//                 type:   HistoryEntryType.NOTE
//             })
//         },
//         onError: (error) => {
//             createPopupAction({
//                 label: "Failed to create note!",
//                 type:  ActionType.Error
//             })
//         }
//     })

//     const { mutate: remove, isPending: isDeletingNote } = useMutation({
//         mutationFn: noteApi.delete,
//         onSuccess:  (id) => {
//             queryClient.invalidateQueries({ queryKey: ['notes'] })

//             createPopupAction({
//                 label: `Removed note!`,
//                 type:  ActionType.Success
//             })
//         },
//         onError: (error) => {
//             createPopupAction({
//                 label: "Failed to remove note!",
//                 type:  ActionType.Error
//             })
//         }
//     })

//     const { mutate: update, isPending: isUpdatingNote } = useMutation({
//         mutationFn: noteApi.update,
//         onSuccess:  (updatedNote) => {
//             queryClient.invalidateQueries({ queryKey: ['notes'] })

//             createPopupAction({
//                 label: `Updated note: ${updatedNote.title}`,
//                 type:  ActionType.Success
//             })
//         },
//         onError: (error) => {
//             createPopupAction({
//                 label: "Failed to update note!",
//                 type:  ActionType.Error
//             })
//         }
//     })

//     return {
//         create,
//         remove,
//         update,
//         isCreatingNote,
//         isDeletingNote,
//         isUpdatingNote
//     }
// }
