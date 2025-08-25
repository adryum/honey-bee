import axios from "axios"
import type { RegistrationResponseModel } from "../models/ResponseModels"
import type { UserLoginModel, UserSignUpModel } from "../../models/Models"
import { catchedErrorLog } from "../../repositories/RegistrationRepository"

export namespace RegistrationEndpoints {
    export async function login(
        loginModel: UserLoginModel
    ) {
        const payload: UserLoginModel = loginModel
        console.log(payload)
        if (!payload.email || !payload.password) return

        try {
            const promise = await axios.post<RegistrationResponseModel>(`/registration/login`, payload)
            console.log(promise.data);
            
            return promise.data
        } catch (error) {
            catchedErrorLog(error);
        }
    }

    export async function signUp(
        signupModel: UserSignUpModel
    ) {
        const payload: UserSignUpModel = signupModel
        console.log(payload);
        if (!payload.email || !payload.password || !payload.username) return

        try {
            const promise = await axios.post<RegistrationResponseModel>(`/registration/signup`, payload)
            console.log(promise.data);
            return promise.data
        } catch (error) {
            catchedErrorLog(error);
        }
    }
}