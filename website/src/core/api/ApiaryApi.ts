import axios from "axios";
import { catchedErrorLog, RegistrationRepository } from "../repositories/RegistrationRepository";
import type { ApiaryRequestModel, ApiaryHivesRequestModel, ApiariesRequestModel, ApiaryDeleteRequestModel } from "./models/RequestModels";
import type { ApiaryResponseModel, ApiaryHivesResponseModel, ApiariesResponseModel } from "./models/ResponseModels";
import type { ApiaryCreateModel, ApiaryModel } from "../models/Models";

export class ApiaryApi {
    async getApiary(apiaryId: number) {
        const payload: ApiaryRequestModel = {
            identification: RegistrationRepository.getUserIdentification(),
            apiaryId: apiaryId
        }

        try {
            const promise = await axios.post<ApiaryResponseModel>('/apiary', payload)

            return promise.data
        } catch (error) {
            console.error(error);
        }
    }

    async getApiaryHives(apiaryId: number, searchWord: string = '%') {
        const payload: ApiaryHivesRequestModel = {
            identification: RegistrationRepository.getUserIdentification(),
            apiaryId: apiaryId,
            searchWord: searchWord
        }

        try {
            const promise = await axios.post<ApiaryHivesResponseModel>('/apiary/hives', payload)
            console.log(promise.data);
            
            return promise.data
        } catch (error) {
            catchedErrorLog(error)
        }
    }

    async createApiary(apiary: ApiaryCreateModel): Promise<ApiaryModel | undefined> {
        const formData = new FormData();
        formData.append("identification", JSON.stringify(RegistrationRepository.getUserIdentification())); // stringify o
        formData.append("name", apiary.name);
        if (apiary.location) formData.append("location", apiary.location);
        if (apiary.description) formData.append("description", apiary.description);
        if (apiary.imageFile) formData.append("image", apiary.imageFile); 
        
        try {
            const { data } = await axios.post<ApiaryModel>('/apiary/create', formData)
            return data
        } catch (error) {
            catchedErrorLog(error)
            return undefined
        }
    }

    async getApiaries(searchWord: string = "%"): Promise<ApiaryModel[] | undefined> {
        const payload: ApiariesRequestModel = {
            identification: RegistrationRepository.getUserIdentification(),
            searchWord: searchWord
        }
        
        try {
            const { data } = await axios.post<ApiaryModel[]>('/apiary/apiaries', payload)
            return data
        } catch (error) {
            catchedErrorLog(error)
            return undefined
        }
    }

    async deleteApiary(apiaryId: number): Promise<number | undefined> {
        const payload: ApiaryDeleteRequestModel = {
            identification: RegistrationRepository.getUserIdentification(),
            apiaryId: apiaryId
        }

        try {
            const promise = await axios.post('/apiary/delete', payload)
            return promise.status
        } catch (error) {
            catchedErrorLog(error)
            return undefined
        }
    }
}