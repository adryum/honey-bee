import axios from 'axios'
import { ref } from 'vue'
import { authenticate } from './registrationRepository'

export const rUser = ref(
{
    id: '2',
    account_code: "#2",
    e_mail: "em@gmail.com",
    name: "Emīls",
    surname: "Griņečovs",
    password: "emils",
    profile_picture: null,
    role: "Admin"
})

export function getUserIdentification() {
    return {
        id: rUser.value.id,
        account_code: rUser.value.account_code
    }
}

export async function updateUserData(userObj, identification = getUserIdentification()) {
    try {
        const promise = await axios.post('/user', {
            identification: identification,
            username: userObj.username,
            name: userObj.name,
            surname: userObj.surename,
            email: userObj.email,
            password: userObj.password,
            image: userObj.image
        })

        const user = promise.data['user']
        console.log(user)

        authenticate(user)
    } catch (error) {
        console.error(error);
    }
}

export async function getHives(identification = getUserIdentification()) {
    try {
        const promise = await axios.post('/hives', {
            identification: identification,
        })

        const hives = promise.data['hives']
        console.log(hives)

        return hives
    } catch (error) {
        console.error(error);
    }
}

export async function getApiary(apiaryId, identification = getUserIdentification()) {
    try {
        const promise = await axios.post('/apiary', {
            identification: identification,
            apiaryId: apiaryId
        })

        const [apiary] = promise.data['apiary']
        console.log(apiary)

        return apiary
    } catch (error) {
        console.error(error);
    }
}

export async function assignHiveToApiary(hiveId, apiaryId, callback = () => {}, identification = getUserIdentification()) {
    try {
        const promise = await axios.post('/hive/assign', {
            identification: identification,
            hiveId: hiveId,
            apiaryId: apiaryId
        })
    
        console.log(promise)

        callback()
    } catch (error) {
        console.error(error);
    }
}

export async function unassignHive(hiveId, callback = () => {}, identification = getUserIdentification()) {
    try {        
        const promise = await axios.post('/hive/unassign', {
            identification: identification,
            hiveId: hiveId,
        })
    
        console.log(promise)

        callback()
    } catch (error) {
        console.error(error);
    }
}

export async function getHiveOverview(hiveId, identification = getUserIdentification()) {
    try {
        console.log(hiveId);

        const promise = await axios.post('/hive/overview', {
            identification: identification,
            hiveId: hiveId
        })

        const overview = promise.data
        console.log(overview)

        return {
            hive: overview.hive, 
            notes: overview.notes,
            queen: overview.queen
        }
    } catch (error) {
        console.error(error);
    }
}

export async function getApiaryHives(apiaryId, identification = getUserIdentification()) {
    try {
        const promise = await axios.post('/apiary/hives', {
            identification: identification,
            apiaryId: apiaryId
        })

        const hives = promise.data['hives']
        console.log(hives)

        return hives
    } catch (error) {
        console.error(error);
    }
}

export async function createApiary(filter, name, location, description, identification = getUserIdentification()) {
    try {
        const promise = await axios.post('/apiaries/create', {
            identification: identification,
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

export async function getApiaries(startWith, identification = getUserIdentification()) {
    try {
        const promise = await axios.post('/apiaries', {
            identification: identification,
            startWith: startWith
        })

        const apiaries = promise.data['apiaries']
        console.log(apiaries)

        return apiaries
    } catch (error) {
        console.error(error);
    }
}

export async function deleteApiary(apiaryId, callback = () => {}, identification = getUserIdentification()) {
    try {
        console.log(apiaryId)
        const promise = await axios.post('/apiaries/delete', {
            identification: identification,
            apiaryId: apiaryId
        })
        
        console.log(promise)

        callback()
    } catch (error) {
        console.error(error);
    }
}