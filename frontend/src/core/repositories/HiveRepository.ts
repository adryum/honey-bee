
import axios from "axios";
import { toHiveModelArr } from "../models/ModelConverters";
import type { HiveModel } from "../models/Models";
import type { HiveAssignRequestModel } from "../server/models/RequestModels";
import { HiveEndpoints } from "../server/network_endpoints/HiveEndpoints";
import { catchedErrorLog, RegistrationRepository } from "./RegistrationRepository";

export class HiveRepository {
    async getHives(searchWord: string = "%"): Promise<HiveModel[]> {
        try {
            const response = await HiveEndpoints.getHives(searchWord)
            console.log(`hives: ${response}`);
            

            if (response) {
                return toHiveModelArr(response)
            } else {
                console.log('No hives');
                return []
            }
        } catch (error) {
            console.error(error);
            return []
        }
    }

    async assignHive(hiveId: number, apiaryId: number): Promise<number> {
        const payload: HiveAssignRequestModel = {
            identification: RegistrationRepository.getUserIdentification(),
            hiveId: hiveId,
            apiaryId: apiaryId
        }

        try {
            const promise = await axios.post('/hive/assign', payload)
            return promise.status
            
        } catch (error) {
            catchedErrorLog(error)
        } finally {
            return 0
        }
    }
}