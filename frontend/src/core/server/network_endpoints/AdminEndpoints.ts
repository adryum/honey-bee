import axios from "axios";
import { RegistrationRepository } from "../../repositories/RegistrationRepository";

export namespace AdminEndpoints {
    export async function getUsers(identification = RegistrationRepository.getUserIdentification()) {
        try {
            const promise = await axios.post('/admin/users', {
                identification: identification
            })

            const users = promise.data['users']
            console.log(users);
            
            return users
        } catch (error) {
            console.error(error);
        }
    }
}
