import axios, { AxiosError } from "axios";
import { catchedErrorLog, getUserIdentification } from "../repositories/homeRepository";
import type { ICreateApiaryRequestModel, IDeleteApiaryRequestModel, IGetApiariesRequestModel, IGetApiaryHivesRequestModel, IGetApiaryRequestModel } from "./RequestModels";
import type { IGetApiariesResponseModel, IGetApiaryHivesResponseModel, IGetApiaryResponseModel } from "./ResponseModels";

export async function getApiary(
    apiaryId: number, 
    identification: number = getUserIdentification()
) {
    const payload: IGetApiaryRequestModel = {
        identification: identification,
        apiaryId: apiaryId
    }

    try {
        const promise = await axios.post<IGetApiaryResponseModel>('/apiary', payload)

        return promise.data
    } catch (error) {
        console.error(error);
    }
}

export async function getApiaryHives(
    apiaryId: number, 
    hiveNameStartsWith: string = '%', 
    identification: number = getUserIdentification()
) {
    const payload: IGetApiaryHivesRequestModel = {
        identification: identification,
        apiaryId: apiaryId,
        hiveNameStartingSymbols: hiveNameStartsWith
    }

    try {
        const promise = await axios.post<IGetApiaryHivesResponseModel>('/apiary/hives', payload)
     
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
    identification = getUserIdentification()
) {
    const payload: ICreateApiaryRequestModel = {
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
    identification = getUserIdentification()
) {
    const payload: IGetApiariesRequestModel = {
        identification: identification,
        apiaryNameStartingSymbols: apiaryNameStartingSymbols
    }

    try {
        const promise = await axios.post<IGetApiariesResponseModel>('/apiary/apiaries', payload)

        return promise.data.apiaries
    } catch (error) {
        catchedErrorLog(error)
    }
}

export async function deleteApiary(
    apiaryId: number, 
    identification = getUserIdentification()
) {
    const payload: IDeleteApiaryRequestModel = {
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