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

export async function getApiary(accountCode, apiaryId) {
    try {
        const promise = await axios.post('/apiary', {
            accountCode: accountCode,
            apiaryId: apiaryId
        })

        const [apiary] = promise.data['apiary']
        console.log(apiary)

        return apiary
    } catch (error) {
        console.error(error);
    }
}

export async function assignHiveToApiary(accountCode, hiveId, apiaryId, callback = () => {}) {
    try {
        const promise = await axios.post('/hive/assign', {
            accountCode: accountCode,
            hiveId: hiveId,
            apiaryId: apiaryId
        })
    
        console.log(promise)

        callback()
    } catch (error) {
        console.error(error);
    }
}

export async function unassignHive(accountCode, hiveId, callback = () => {}) {
    try {
        const promise = await axios.post('/hive/unassign', {
            accountCode: accountCode,
            hiveId: hiveId,
        })
    
        console.log(promise)

        callback()
    } catch (error) {
        console.error(error);
    }
}

export async function getHive(accountCode, hiveId) {
    try {
        const promise = await axios.post('/hive', {
            accountCode: accountCode,
            hiveId: hiveId
        })

        const hive = promise.data['hive']
        console.log(hive)

        return hive
    } catch (error) {
        console.error(error);
    }
}

export async function getApiaryHives(accountCode, apiaryId) {
    try {
        const promise = await axios.post('/apiary/hives', {
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

export async function deleteApiary(accountCode, apiaryId, callback = () => {}) {
    try {
        console.log(accountCode, apiaryId)
        const promise = await axios.post('/apiaries/delete', {
            accountCode: accountCode,
            apiaryId: apiaryId
        })
        
        console.log(promise)

        callback()
    } catch (error) {
        console.error(error);
    }
}