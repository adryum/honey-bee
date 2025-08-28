import axios from "axios";
import type { HiveAssignRequestModel, HiveCreateRequestModel, HiveOverviewRequestModel, HiveRequestModel, HiveUnassignRequestModel } from "../models/RequestModels";
import type { HiveOverviewResponseModel, HiveResponseModel } from "../models/ResponseModels";
import { RegistrationRepository, catchedErrorLog } from "../../repositories/RegistrationRepository";

export namespace HiveEndpoints {
    export async function createHive(
        name: string, 
        location: string, 
        description: string,
        imagePath: string,
        type: string, 
        identification = RegistrationRepository.getUserIdentification()
    ) {
        const payload: HiveCreateRequestModel = {
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
        identification = RegistrationRepository.getUserIdentification()
    ) {
        const payload: HiveAssignRequestModel = {
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
        identification = RegistrationRepository.getUserIdentification()
    ) {
        const payload: HiveUnassignRequestModel = {
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

    export async function getHives(
        searchWord: string, 
        identification = RegistrationRepository.getUserIdentification()
    ) {
        const payload: HiveRequestModel = {
            identification: identification,
            searchWord: searchWord
        }
        try {
            const promise = await axios.post<HiveResponseModel[]>('/hive/hives', payload)

            return promise.data
        } catch (error) {
            catchedErrorLog(error)
        }
    }

    export async function getHiveOverview(
        hiveId: number, 
        identification = RegistrationRepository.getUserIdentification()
    ) {
        const payload: HiveOverviewRequestModel = {
            identification: identification,
            hiveId: hiveId
        }
        try {
            const promise = await axios.post<HiveOverviewResponseModel>('/hive/overview', payload)

            return promise.data
        } catch (error) {
            catchedErrorLog(error)
        }
    }
}