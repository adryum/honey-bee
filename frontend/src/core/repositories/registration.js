import axios from 'axios'
import { ref } from 'vue'
import { catchInfo } from "@/utils/log.js";

export const isAuthenticated = ref(true)

export async function login(email, password) {
    try {
        console.log(`em: ${email} pass: ${password}`)

        const accountPassword = 
            (await axios.get(`/users?column=password&attribute=e_mail&email=${email}`)).data[0][0]['password']

        if (password === accountPassword) authenticate()
    } catch (error) {
        catchInfo(error, 'gotErr')
    }
}

export function logOut() {
    isAuthenticated.value = false
}

export function authenticate() {
    console.log('authenticated')
    isAuthenticated.value = true
}