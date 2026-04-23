import axios from "axios"
import { QueenGetModel_To_QueenModelDB } from "../Convertors";
import type { QueenGetModel, QueenCreateModel, QueenUpdateModel } from "./Models";
import type { QueenModelDB } from "../stores/Models";
import qs from "qs";
import { isValidValue } from "../utils/others";

export const queenApi = {
    getQueens: async (queenIds: number[], hiveIds: number[]): Promise<QueenModelDB[]> => {
        const { data } = await axios.get<QueenGetModel[]>("/queen", {
            params: { queenIds: queenIds, hiveIds: hiveIds },
            paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
        })

        return data.map(QueenGetModel_To_QueenModelDB)
    },

    createQueen: async (model: QueenCreateModel): Promise<QueenModelDB> => {
        const { image, bornDate, hiveId, speciesId } = model

        const formData = new FormData()
        formData.append("bornDate",  bornDate.toMySQLTimestamp())
        formData.append("hiveId",    hiveId.toString())
        formData.append("speciesId", speciesId.toString())
        if (image) formData.append("image", image)

        const { data } = await axios.post<QueenGetModel>("/queen", formData)
        return QueenGetModel_To_QueenModelDB(data)
    },

    updateQueen: async (model: QueenUpdateModel): Promise<QueenModelDB> => {
        const { image, bornDate, id, speciesId } = model

        const formData = new FormData()
        formData.append("id", id.toString())
        if (isValidValue(bornDate))  formData.append("bornDate",  bornDate.toMySQLTimestamp())
        if (isValidValue(speciesId)) formData.append("speciesId", speciesId.toString())
        if (image) formData.append("image", image)

        const { data } = await axios.post<QueenGetModel>("/queen/update", formData)
        return QueenGetModel_To_QueenModelDB(data)
    },
}
