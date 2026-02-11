import { defineStore } from "pinia";
import type { ApiaryModelDB, HiveModelDB } from "../stores/Models";
import axios from "axios";
import type { HiveCreateRequestModel, HiveCreateResponseModel } from "./Models";
import { HiveCreateResponse_to_HiveModelDB, HiveCreateResponseArray_to_HiveModelDBArray } from "../Convertors";
import type { HiveUpdateModel } from "../models/HiveModels";
import { isValidValue } from "../utils/others";

export const useHiveApiStore = defineStore("HiveApiStore", () => {
    async function getHives(): Promise<HiveModelDB[] | undefined> {
        try {
            const result = await axios.get<HiveCreateResponseModel[]>("/hive/get")
            if (!result.data) throw new Error("Failed to get hives!");
            
            return HiveCreateResponseArray_to_HiveModelDBArray(result.data)
        } catch (error) {
            console.error(error);
            return undefined 
        }
    }

    async function createHive(
        model: HiveCreateRequestModel
    ): Promise<HiveModelDB | undefined> {
        try {
            const formData = new FormData()
            formData.append("name", model.name)
            formData.append("description", model.description)
            formData.append("type", model.type)
            if (model.image) formData.append("image", model.image)

            const result = await axios.post<HiveCreateResponseModel>("/hive/create", formData)
            if (!result.data) throw new Error("Failed to create hive!");
            
            return HiveCreateResponse_to_HiveModelDB(result.data)
        } catch (error) {
            console.error(error);
            return undefined 
        }
    }

    async function updateHive(
        model: HiveUpdateModel
    ): Promise<HiveModelDB | undefined> {
        try {
            const result = await axios.post<HiveCreateResponseModel>("/hive/update", model)
            if (!result.data) throw new Error("Failed to update hive!");
            
            return HiveCreateResponse_to_HiveModelDB(result.data)
        } catch (error) {
            console.error(error);
            return undefined 
        }
    }

    async function deleteHive(
        id: number
    ): Promise<number | undefined> {
        try {
            const result = await axios.post<number>("/hive/delete", { id: id})
            if (!isValidValue(result.data)) throw new Error("Failed to delete hive!");
            
            return result.data
        } catch (error) {
            console.error(error);
            return undefined 
        }
    }

    return {
        getHives,
        updateHive,
        deleteHive,
        createHive,
    }
})
