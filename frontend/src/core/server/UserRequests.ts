import axios from "axios";
import type { IUserDeleteRequestModel, IUserUpdateRequestModel } from "./RequestModels";
import type { IUserUpdateResponseModel } from "./ResponseModels";
import { catchedErrorLog, getUserIdentification } from "../repositories/homeRepository";

export async function updateUserData(
    username: string,
    email: string,
    password: string,
    picturePath: string,
    identification = getUserIdentification()
) {
    const payload: IUserUpdateRequestModel = {
        identification: identification,
        username: username,
        email: email,
        password: password,
        picturePath: picturePath
    }

    try {
        const promise = await axios.post<IUserUpdateResponseModel>('/user', payload)

        return promise.data
    } catch (error) {
        catchedErrorLog(error)
    }
}

export async function deleteUser(
    userId: number, 
    identification = getUserIdentification()
) {
    const payload: IUserDeleteRequestModel = {
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