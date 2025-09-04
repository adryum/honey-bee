
import axios from "axios";
import { toHiveModelArr } from "../models/ModelConverters";
import type { CreateHiveModel, HiveModel } from "../models/Models";
import type { HiveAssignRequestModel } from "../server/models/RequestModels";
import { catchedErrorLog, RegistrationRepository } from "./RegistrationRepository";
import type { HiveResponseModel } from "../server/models/ResponseModels";

export class HiveRepository {
    async createHive(hive: CreateHiveModel): Promise<HiveModel | null> {
        try {
            const formdata = new FormData()
            formdata.append('identification', JSON.stringify(RegistrationRepository.getUserIdentification()))
            formdata.append('name', hive.name)
            formdata.append('type', hive.type)
            if (hive.location) formdata.append('location', hive.location)
            if (hive.description) formdata.append('description', hive.description)
            if (hive.image) formdata.append('image', hive.image)
      
            const { data } = await axios.post('/hive/create', formdata)
            return data as HiveModel
        } catch (error) {
            catchedErrorLog(error)
            return null
        } 
    }

    async getHives(searchWord: string = "%"): Promise<HiveModel[]> {
        try {
            console.log('userID', RegistrationRepository.getUserIdentification());
            
            const { data } = await axios.post<HiveModel[]>('/hive/hives', { identification: RegistrationRepository.getUserIdentification() })
            console.log(`hives: ${data}`);
            

            if (data) {
                return data
            } else {
                console.log('No hives');
                return []
            }
        } catch (error) {
            console.error(error);
            return []
        }
    }

    // async  getHiveOverview(
    //     hiveId: number, 
    //     identification = RegistrationRepository.getUserIdentification()
    // ) {
    //     const payload: HiveOverviewRequestModel = {
    //         identification: identification,
    //         hiveId: hiveId
    //     }
    //     try {
    //         const promise = await axios.post<HiveOverviewResponseModel>('/hive/overview', payload)

    //         return promise.data
    //     } catch (error) {
    //         catchedErrorLog(error)
    //     }
    // }

    async assignHive(hiveId: number, apiaryId: number): Promise<HiveModel | null> {
        const payload: HiveAssignRequestModel = {
            identification: RegistrationRepository.getUserIdentification(),
            hiveId: hiveId,
            apiaryId: apiaryId
        }

        try {
            const { data } = await axios.post<HiveModel[]>('/hive/assign', payload)
            return data[0]
        } catch (error) {
            catchedErrorLog(error)
            return null
        }
    }
}