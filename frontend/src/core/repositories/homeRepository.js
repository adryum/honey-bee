import axios from 'axios'
import { ref } from 'vue'

export const user = ref(
{
    account_code: "#2",
    e_mail: "em@gmail.com",
    name: "Emīls",
    password: "emils",
    profile_picture: null,
    role: "Admin",
    surename: "Griņečovs"
})

export async function getHives(accountCode) {
    try {
        const promise = await axios.post('/hives', {
            accountCode: accountCode
        })

        const hives = promise.data['hives']
        console.log(hives)

        return hives
    } catch (error) {
        console.error(error);
    }
}

export async function getApiaryHives(accountCode, apiaryId) {
    try {
        const promise = await axios.post('/apiary-hives', {
            accountCode: accountCode,
            apiaryId: apiaryId
        })

        const hives = promise.data['hives']
        console.log(hives)

        return hives
    } catch (error) {
        console.error(error);
    }
}

export async function createApiary(accountCode, filter, name, location, description) {
    try {
        const promise = await axios.post('/apiaries/create', {
            accountCode: accountCode,
            name: name,
            location: location,
            description: description
        })
        const {status} = promise
        
        return status
    } catch (error) {
        console.error(error);
    }
}

export async function getApiaries(accountCode, startWith) {
    try {
        const promise = await axios.post('/apiaries', {
            accountCode: accountCode,
            startWith: startWith
        })

        const apiaries = promise.data['apiaries']
        console.log(apiaries)

        return apiaries
    } catch (error) {
        console.error(error);
    }
}

export async function deleteApiary(accountCode, apiaryId, callback) {
    try {
        console.log(accountCode, apiaryId)
        const promise = await axios.post('/apiaries/delete', {
            accountCode: accountCode,
            apiaryId: apiaryId
        })

        callback()
        console.log(promise)
    } catch (error) {
        console.error(error);
    }
}