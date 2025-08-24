import axios from "axios";
import { catchedErrorLog, getUserIdentification } from "../repositories/homeRepository";
import type { IAssignHiveRequestModel, ICreateHiveRequestModel, IGetHiveOverviewRequestModel, IUnAssignHiveRequestModel } from "./RequestModels";
import type { IGetHiveOverviewResponseModel } from "./ResponseModels";

export async function createHive(
    name: string, 
    location: string, 
    description: string,
    imagePath: string,
    type: string, 
    identification = getUserIdentification()
) {
    const payload: ICreateHiveRequestModel = {
        identification: identification,
        name: name,
        location: location,
        description: description,
        imagePath: imagePath,
        type: type
    }
    try {
        const promise = await axios.post('/hive/create', payload)

        return promise.status
    } catch (error) {
        catchedErrorLog(error)
    }
}



export async function assignHiveToApiary(
    hiveId: number, 
    apiaryId: number,
    identification = getUserIdentification()
) {
    const payload: IAssignHiveRequestModel = {
        identification: identification,
        hiveId: hiveId,
        apiaryId: apiaryId
    }
    try {
        const promise = await axios.post('/hive/assign', payload)
        
        return promise.status
    } catch (error) {
        catchedErrorLog(error)
    }
}

export async function unassignHive(
    hiveId: number,
    identification = getUserIdentification()
) {
    const payload: IUnAssignHiveRequestModel = {
        identification: identification,
        hiveId: hiveId
    }
    try {        
        const promise = await axios.post('/hive/unassign', payload)

        return promise.status
    } catch (error) {
        catchedErrorLog(error)
    }
}

export async function getHiveOverview(
    hiveId: number, 
    identification = getUserIdentification()
) {
    const payload: IGetHiveOverviewRequestModel = {
        identification: identification,
        hiveId: hiveId
    }
    try {
        const promise = await axios.post<IGetHiveOverviewResponseModel>('/hive/overview', payload)

        return promise.data
    } catch (error) {
        catchedErrorLog(error)
    }
}