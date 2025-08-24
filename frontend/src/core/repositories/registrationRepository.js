import axios from 'axios'
import { rUser } from "./homeRepository.js"
import { isEmpty } from '@/utils/checks.js';

export const isAuthenticated = () => !isEmpty(rUser.value)



export function logOut() {
    console.log('loged out')
    rUser.value = {}
}

export function authenticate(userObj) {
    console.log('authenticated')
    rUser.value = userObj
}