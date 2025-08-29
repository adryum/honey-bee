import type { ApiaryHivesResponseModel } from "../server/models/ResponseModels";
import { ApiaryEndpoints } from "../server/network_endpoints/ApiaryEndpoints";

export class ApiaryRepository {
    static async getApiaries(searchWord: string = "%") {
        try {
            const response = await ApiaryEndpoints.getApiaries(searchWord)

            if (response) {
                return response
            } else {
                console.log('No apiaries');
                return []
            }
        } catch (error) {
            console.error(error);
            return []
        }
    }

    static async getApiaryHives(apiaryId: number, searchWord: string = "%"): Promise<ApiaryHivesResponseModel | undefined> {
        try {
            const response = await ApiaryEndpoints.getApiaryHives(apiaryId, searchWord)
    
            if (response) {
                return response
            } else {
                console.log('No apiary hives');
                return undefined
            }
        } catch (error) {
            console.error(error);
            return undefined
        }
    }

    static async getApiary(apiaryId: number) {
        try {
            const response = await ApiaryEndpoints.getApiary(apiaryId)
            console.log("apiariy: ", response);
            
            if (response) {
                return response
            } else {
                console.log('No apiaries');
                return null
            }
        } catch (error) {
            console.error(error);
            return null
        }
    }

    static async createApiary(
        name: string, 
        location: string, 
        description: string, 
        image: File | null, 
    ) {
        try {
            const response = await ApiaryEndpoints.createApiary(
                name,
                location,
                description,
                image
            )
            console.log("create apiary status: ", response);
            
            if (response) {
                return response
            } else {
                console.log('Failed to create apiary!');
                return null
            }
        } catch (error) {
            console.error(error);
            return null
        }
    }
}