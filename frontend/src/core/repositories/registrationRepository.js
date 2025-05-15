import axios from 'axios'
import { user } from "./homeRepository.js"
import { isEmpty } from '@/utils/checks.js';

export const isAuthenticated = () => !isEmpty(user.value)

export async function login(email, password) {
    try {
        console.log(`em: ${email} pass: ${password}`)

        if (!email || !password) return

        const registeredUser = await axios.post(`/login`, {
            email: email,
            password: password
        })

        console.log(registeredUser.data['user'])

        authenticate(registeredUser.data['user'])
    } catch (error) {
        console.error(error);
    }
}

export function logOut() {
    console.log('loged out')
    user.value = {}
}

export function authenticate(userObj) {
    console.log('authenticated')
    user.value = userObj
}