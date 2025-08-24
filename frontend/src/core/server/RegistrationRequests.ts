import axios from "axios"
import type { IUserLoginRequestModel, IUserSignUpRequestModel } from "./RequestModels"
import type { IUserRegistrationResponseModel } from "./ResponseModels"
import { catchedErrorLog } from "../repositories/homeRepository"

export async function login(
    email: string, 
    password: string
) {
    const payload: IUserLoginRequestModel = {
        email: email,
        password: password
    }

    console.log(payload)
    if (!email || !password) return

    try {
        const promise = await axios.post<IUserRegistrationResponseModel>(`/registration/login`, payload)

        return promise.data
    } catch (error) {
        catchedErrorLog(error);
    }
}

export async function signUp(
    username: string, 
    picturePath: string, 
    email: string, 
    password: string
) {
    const payload: IUserSignUpRequestModel = {
        username: username,
        email: email,
        password: password,
        picturePath: picturePath
    }
    console.log(payload);

    if (!email || !password || !username) return

    try {
        const promise = await axios.post<IUserRegistrationResponseModel>(`/registration/signup`, payload)

        return promise.data
    } catch (error) {
        catchedErrorLog(error);
    }
}