
import { toHiveModelArr } from "../models/ModelConverters";
import type { HiveModel } from "../models/Models";
import { HiveEndpoints } from "../server/network_endpoints/HiveEndpoints";

export class HiveRepository {
    static async getHives(searchWord: string = "%"): Promise<HiveModel[]> {
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
}