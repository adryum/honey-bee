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
        hiveNameStartsWith: string = '%', 
        identification = RegistrationRepository.getUserIdentification()
    ) {
        const payload: ApiaryHivesRequestModel = {
            identification: identification,
            apiaryId: apiaryId,
            hiveNameStartingSymbols: hiveNameStartsWith
        }

        try {
            const promise = await axios.post<ApiaryHivesResponseModel>('/apiary/hives', payload)
        
            return promise.data.hives
        } catch (error) {
            catchedErrorLog(error)
        }
    }

    export async function createApiary(
        name: string, 
        location: string, 
        description: string, 
        imagePath: string, 
        identification = RegistrationRepository.getUserIdentification()
    ) {
        const payload: ApiaryCreateRequestModel = {
            name: name,
            location: location,
            description: description,
            imagePath: imagePath,
            identification: identification
        }

        try {
            const promise = await axios.post('/apiary/create', payload)
            return promise.status
        } catch (error) {
            catchedErrorLog(error)
        }
    }

    export async function getApiaries(
        apiaryNameStartingSymbols: string = "%", 
        identification = RegistrationRepository.getUserIdentification()
    ) {
        const payload: ApiariesRequestModel = {
            identification: identification,
            apiaryNameStartingSymbols: apiaryNameStartingSymbols
        }
        console.log(payload);
        

        try {
            const promise = await axios.post<ApiariesResponseModel>('/apiary/apiaries', payload)

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
