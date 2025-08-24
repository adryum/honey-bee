import axios, { AxiosError } from 'axios'
import { ref } from 'vue'

export const user = ref<IUserModel | null>()
// {
//     id: '2',
//     username: 'asd',
//     email: "em@gmail.com",
//     profile_picture: null,
//     role: "Admin"
//     paidTier: "Admin"
// })
interface IUserModel {
    id: number
    username: string
    email: string
    profile_picture: string
    role: string
    paidTier: string
}

export function getUserIdentification(): number {
    return (user.value?.id) ? user.value.id : -1
}

export function catchedErrorLog(error: unknown) {
    if (axios.isAxiosError(error)) {
        console.error("API error:", (error as AxiosError).message);
    } else {
        console.error("Unexpected error:", error);
    }
    return undefined;
}
