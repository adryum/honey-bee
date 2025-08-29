import axios, { AxiosError } from "axios";
import { catchedErrorLog, RegistrationRepository } from "../../repositories/RegistrationRepository";
import type { ApiaryCreateRequestModel, ApiaryDeleteRequestModel, ApiariesRequestModel, ApiaryHivesRequestModel, ApiaryRequestModel } from "../models/RequestModels";
import type { ApiariesResponseModel as ApiariesResponseModel, ApiaryHivesResponseModel, ApiaryResponseModel } from "../models/ResponseModels";

export namespace ApiaryEndpoints {
    export async function getApiary(
        apiaryId: number, 
        identification = RegistrationRepository.getUserIdentification()
    ) {
        const payload: ApiaryRequestModel = {
            identification: identification,
            apiaryId: apiaryId
        }

        try {
            const promise = await axios.post<ApiaryResponseModel>('/apiary', payload)

            return promise.data
        } catch (error) {
            console.error(error);
        }
    }

    export async function getApiaryHives(
        apiaryId: number, 
        searchWord: string = '%', 
        identification = RegistrationRepository.getUserIdentification()
    ) {
        const payload: ApiaryHivesRequestModel = {
            identification: identification,
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

    export async function createApiary(
        name: string, 
        location: string, 
        description: string, 
        image: File | null, 
        identification = RegistrationRepository.getUserIdentification()
    ) {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("location", location);
        formData.append("description", description);
        formData.append("identification", JSON.stringify(identification)); // stringify o
        if (image) formData.append("image", image); // must match upload.single("image")

        console.log('path: ', image);
        
        try {
            const promise = await axios.post('/apiary/create', formData)
            return promise.status
        } catch (error) {
            catchedErrorLog(error)
        }
    }

    export async function getApiaries(
        searchWord: string = "%", 
        identification = RegistrationRepository.getUserIdentification()
    ) {
        const payload: ApiariesRequestModel = {
            identification: identification,
            searchWord: searchWord
        }
        console.log(payload);
        

        try {
            const promise = await axios.post<ApiariesResponseModel>('/apiary/apiaries', payload)

            console.log('apiaries', promise.data.apiaries);
             
            return promise.data.apiaries
        } catch (error) {
            catchedErrorLog(error)
        }
    }

    export async function deleteApiary(
        apiaryId: number, 
        identification = RegistrationRepository.getUserIdentification()
    ) {
        const payload: ApiaryDeleteRequestModel = {
            identification: identification,
            apiaryId: apiaryId
        }

        try {
            const promise = await axios.post('/apiary/delete', payload)
            return promise.status
        } catch (error) {
            catchedErrorLog(error)
        }
    }
}
