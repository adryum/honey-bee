import { SpeciesGetModel_To_SpeciesModelDB } from "../Convertors";
import type { SpeciesGetModel } from "./Models";
import type { SpeciesModelDB } from "../stores/Models";
import api from "../config/AxiosConfig";

export const speciesApi = {
    getSpecies: async (): Promise<SpeciesModelDB[]> => {
        const { data } = await api.get<SpeciesGetModel[]>("/species")
        return data.map(SpeciesGetModel_To_SpeciesModelDB)
    },

    // createQueen: async (model: QueenCreateModel): Promise<QueenModelDB> => {
    //     const { image, bornDate, hiveId, speciesId } = model

    //     const formData = new FormData()
    //     formData.append("bornDate",  bornDate.toString())
    //     formData.append("hiveId",    hiveId.toString())
    //     formData.append("speciesId", speciesId.toString())
    //     if (image) formData.append("image", image)

    //     const { data } = await api.post<QueenGetModel>("/queen/create", formData)
    //     return QueenGetModel_To_QueenModelDB(data)
    // },

    // updateQueen: async (model: QueenUpdateModel): Promise<QueenModelDB> => {
    //     const { image, bornDate, id, speciesId } = model

    //     const formData = new FormData()
    //     formData.append("id", id.toString())
    //     if (isValidValue(bornDate))  formData.append("bornDate",  bornDate.toString())
    //     if (isValidValue(speciesId)) formData.append("speciesId", speciesId.toString())
    //     if (image) formData.append("image", image)

    //     const { data } = await api.post<QueenGetModel>("/queen/update", formData)
    //     return QueenGetModel_To_QueenModelDB(data)
    // },
}
