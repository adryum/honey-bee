import axios from "axios";
import { getUserIdentification } from "../repositories/homeRepository";

export async function getUsers(identification = getUserIdentification()) {
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
