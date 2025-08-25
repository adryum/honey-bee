import axios, { AxiosError } from 'axios'
import { computed, ref } from 'vue'
import type { UserLoginModel, UserModel, UserSignUpModel } from '../models/Models'
import router from '../../router'
import type { UserIdentificationModel } from '../server/models/RequestModels'
import { toUserModel } from '../models/ModelConverters'
import { RegistrationEndpoints } from '../server/network_endpoints/RegistrationEndpoints'

export class RegistrationRepository {
    static user = ref<UserModel | null>()
    private constructor() {}

    static isAuthenticated = computed(() => {
        return typeof this.user.value?.id === "number"
    })

    static getUserIdentification(): UserIdentificationModel {
        if (this.isAuthenticated.value) {
            return { id: this.user.value!.id }
        } else {
            console.error('User is unauthenticated');
            return { id: -1 }
        }
    }

    static logOut() {
        console.log('loged out')
        this.user.value = null
    }

    static authenticate(userModel: UserModel) {
        this.user.value = userModel
        console.log('authenticated')
        console.log(this.isAuthenticated.value);
        console.log(userModel);
        
        
        router.push('/')
    }

    static async login(loginModel: UserLoginModel) {
        try {
            const response = await RegistrationEndpoints.login(loginModel)

            if (response) {
                console.log(response);
                
                const user = toUserModel(response)
                this.authenticate(user)
            } else {
                console.log('Failed to Log in');
            }
        } catch (error) {
            console.error(error);
        }
    }

    static async signUp(signupModel: UserSignUpModel) {
        try {
            const response = await RegistrationEndpoints.signUp(signupModel)

            if (response) {
                const user = toUserModel(response)
                this.authenticate(user)
            } else {
                console.log('Failed to Sign up');
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export function catchedErrorLog(error: unknown) {
    if (axios.isAxiosError(error)) {
        console.error("API error:", (error as AxiosError).message);
    } else {
        console.error("Unexpected error:", error);
    }
    return undefined;
}
