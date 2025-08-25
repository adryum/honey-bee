import { ApiaryEndpoints } from "../server/network_endpoints/ApiaryEndpoints";

export class ApiaryRepository {
    static async getApiaries(searchWord: string = "%") {
        try {
            const response = await ApiaryEndpoints.getApiaries(searchWord)
            console.log(`apiaries: ${response}`);
            

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
}