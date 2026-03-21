import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query/build/legacy/_tsup-dts-rollup";
import { hiveApi } from "../api/hiveApi";

export const useHives = () => {
    const queryClient = useQueryClient()

    const { data: hives, isLoading, isError } = useQuery({
        queryKey: ["hives"],
        queryFn: hiveApi.getHives
    })

    const { mutate: createHive } = useMutation({
        mutationFn: hiveApi.createHive,
        onSuccess: (newHive) => {
            queryClient.invalidateQueries({ queryKey: ['hives'] })
        }
    })

    const { mutate: deleteHive } = useMutation({
        mutationFn: hiveApi.deleteHive,
        onSuccess: (id) => {
            queryClient.invalidateQueries({ queryKey: ['hives'] })
        }
    })

    const { mutate: updateHive } = useMutation({
        mutationFn: hiveApi.updateHive,
        onSuccess: (updatedHive) => {
            queryClient.invalidateQueries({ queryKey: ['hives'] })
        }
    })

    return {
        hives,
        isLoading,
        isError,
        createHive,
        deleteHive,
        updateHive
    }
}

    // async function createCalendarEvent(
    //     model: HiveCalendarEntryRequestModel
    // ) {
    //     try {
    //         const result = await axios.post<HiveCalendarEntryResponseModel>("/hive/calendar/create", model)
    //         if (!result.data) throw new Error("Failed to create calendar entry!");
            
    //         return result.data
    //     } catch (error) {
    //         console.error(error);
    //         return undefined 
    //     }
    // }

    // async function getHives(): Promise<HiveModelDB[] | undefined> {
    //     try {
    //         const result = await axios.get<HiveCreateResponseModel[]>("/hive/get")
    //         if (!result.data) throw new Error("Failed to get hives!");
            
    //         return HiveCreateResponseArray_to_HiveModelDBArray(result.data)
    //     } catch (error) {
    //         console.error(error);
    //         return undefined 
    //     }
    // }

    // async function createHive(
    //     model: HiveCreateRequestModel
    // ): Promise<HiveModelDB | undefined> {
    //     try {
    //         const formData = new FormData()
    //         formData.append("name", model.name)
    //         formData.append("description", model.description)
    //         formData.append("type", model.type)
    //         if (isValidValue(model.apiaryId)) formData.append("apiaryId", model.apiaryId.toString())
    //         if (model.image) formData.append("image", model.image)

    //         const result = await axios.post<HiveCreateResponseModel>("/hive/create", formData)
    //         if (!result.data) throw new Error("Failed to create hive!");
            
    //         return HiveCreateResponse_to_HiveModelDB(result.data)
    //     } catch (error) {
    //         console.error(error);
    //         return undefined 
    //     }
    // }

    // async function updateHive(
    //     model: HiveUpdateRequestModel
    // ): Promise<HiveModelDB | undefined> {
    //     try {
    //         const formData = new FormData()
    //         formData.append("id", model.id.toString())
    //         formData.append("name", model.name)
    //         formData.append("description", model.description) 
    //         formData.append("type", model.type) 
    //         formData.append("apiaryId", isValidValue(model.apiaryId) ? model.apiaryId!.toString() : "") 
    //         if (model.image) formData.append("image", model.image)

    //         const result = await axios.post<HiveCreateResponseModel>("/hive/update", formData)
    //         if (!result.data) throw new Error("Failed to update hive!");

    //         console.log(result.data);
            
            
    //         return HiveCreateResponse_to_HiveModelDB(result.data)
    //     } catch (error) {
    //         console.error(error);
    //         return undefined 
    //     }
    // }

    // async function deleteHive(
    //     id: number
    // ): Promise<number | undefined> {
    //     try {
    //         const result = await axios.post<number>("/hive/delete", { id: id})
    //         if (!isValidValue(result.data)) throw new Error("Failed to delete hive!");
            
    //         return result.data
    //     } catch (error) {
    //         console.error(error);
    //         return undefined 
    //     }
    // }
