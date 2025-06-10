import axios from 'axios'
import { ref } from 'vue'
import { authenticate } from './registrationRepository'

export const rUser = ref({})
// {
//     id: '2',
//     account_code: "#2",
//     username: 'asd',
//     name: "Emīls",
//     surname: "Griņečovs",
//     e_mail: "em@gmail.com",
//     password: "emils",
//     profile_picture: null,
//     role: "Admin"
// })

export function getUserIdentification() {
    return {
        id: rUser.value.id,
        code: rUser.value.account_code
    }
}

export async function updateUserData(userObj, identification = getUserIdentification()) {
    try {
        const promise = await axios.post('/user', {
            identification: identification,
            username: userObj.username,
            name: userObj.name,
            surname: userObj.surname,
            image: userObj.profile_picture,
            email: userObj.e_mail,
            password: userObj.password,
        })

        const user = promise.data['user']
        
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

export async function createHive(name, location, description, image, type, identification = getUserIdentification()) {
    try {
        const promise = await axios.post('/hive/create', {
            identification: identification,
            name: name,
            location: location,
            description: description,
            image: image,
            type: type
        })

        console.log(promise.status)

        return promise.status
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