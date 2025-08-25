import axios from "axios";
import type { UserDeleteRequestModel, UserUpdateRequestModel } from "../models/RequestModels";
import type { UserUpdateResponseModel } from "../models/ResponseModels";
import { catchedErrorLog, RegistrationRepository } from "../../repositories/RegistrationRepository";

export namespace UserEndpoints {
    export async function updateUserData(
        username: string,
        email: string,
        password: string,
        picturePath: string,
        identification = RegistrationRepository.getUserIdentification()
    ) {
        const payload: UserUpdateRequestModel = {
            identification: identification,
            username: username,
            email: email,
            password: password,
            picturePath: picturePath
        }

        try {
            const promise = await axios.post<UserUpdateResponseModel>('/user', payload)

            return promise.data
        } catch (error) {
            catchedErrorLog(error)
        }
    }

    export async function deleteUser(
        userId: number, 
        identification = RegistrationRepository.getUserIdentification()
    ) {
        const payload: UserDeleteRequestModel = {
            identification: identification,
            userId: userId
        }
        try {
            const promise = await axios.post('/admin/user/delete', payload)
            
            return promise.status
        } catch (error) {
            catchedErrorLog(error)
        }
    }
}