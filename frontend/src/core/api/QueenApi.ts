import { QueenGetModel_To_QueenModelDB } from "../Convertors";
import type { QueenGetModel, QueenCreateModel, QueenUpdateModel } from "./Models";
import type { QueenModelDB } from "../stores/Models";
import { isValidValue } from "../utils/others";
import api from "../config/AxiosConfig";

export const queenApi = {
    getAll: async (queenIds: number[] | undefined, hiveIds: number[] | undefined): Promise<QueenModelDB[]> => {
        const { data } = await api.get<QueenGetModel[]>("/queen", {
            params: { 
                queenIds,
                hiveIds
            },
        })

        return data.map(QueenGetModel_To_QueenModelDB)
    },
    get: async (queenId: number): Promise<QueenModelDB> => {
        const { data } = await api.get<QueenGetModel>(`/queen/${queenId}`)

        return QueenGetModel_To_QueenModelDB(data)
    },
    create: async (model: QueenCreateModel): Promise<QueenModelDB> => {
        const { image, bornDate, hiveId, speciesId } = model

        const formData = new FormData()
        formData.append("bornDate",  bornDate.toMySQLTimestamp())
        formData.append("hiveId",    hiveId.toString())
        formData.append("speciesId", speciesId.toString())
        if (image) formData.append("image", image)

        const { data } = await api.post<QueenGetModel>("/queen", formData)
        return QueenGetModel_To_QueenModelDB(data)
    },
    update: async (model: QueenUpdateModel): Promise<QueenModelDB> => {
        const { image, bornDate, id, speciesId } = model

        const formData = new FormData()
        formData.append("id", id.toString())
        if (isValidValue(bornDate))  formData.append("bornDate",  bornDate.toMySQLTimestamp())
        if (isValidValue(speciesId)) formData.append("speciesId", speciesId.toString())
        if (image) formData.append("image", image)

        const { data } = await api.put<QueenGetModel>("/queen", formData)
        return QueenGetModel_To_QueenModelDB(data)
    },
    delete: async (id: number): Promise<number> => {
        const { data } = await api.delete<number>(`/queen/${id}`)
        return data
    }
}
