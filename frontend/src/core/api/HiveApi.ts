import axios from "axios";
import type { HiveAssignRequestModel } from "./models/RequestModels";
import { catchedErrorLog, RegistrationRepository } from "../repositories/RegistrationRepository";
import type { SupperCreateRequestModel, SupperCreateResponseModel, SupperModel } from "../models/SupperModels";
import type { NoteCreateRequestModel, NoteCreateResponseModel, NoteModel } from "../models/NoteModels";
import type { HiveCreateModel, HiveModel, HiveUpdateModel } from "../models/HiveModels";

export class HiveApi {
    async createNote(note: NoteCreateRequestModel): Promise<NoteCreateResponseModel | undefined> {
        try {
            const formdata = new FormData()
            formdata.append("type", note.type)
            formdata.append("title", note.title)
            formdata.append("content", note.content)
            formdata.append('identification', JSON.stringify(RegistrationRepository.getUserIdentification()))

            return await axios.post('/note/create', formdata)
        } catch (error) {
            catchedErrorLog(error)
            return undefined
        }
    }
    async updateNote(note: NoteModel): Promise<NoteCreateResponseModel | undefined> {
        try {
            const formdata = new FormData()
            formdata.append("id", note.id.toString())
            formdata.append("type", note.type)
            formdata.append("title", note.title)
            formdata.append("content", note.content)
            formdata.append('identification', JSON.stringify(RegistrationRepository.getUserIdentification()))

            return await axios.post('/note/update', formdata)
        } catch (error) {
            catchedErrorLog(error)
            return undefined
        }
    }
    async deleteNote(id: number): Promise<number | undefined> {
        try {
            const formdata = new FormData()
            formdata.append("id", id.toString())
            formdata.append('identification', JSON.stringify(RegistrationRepository.getUserIdentification()))

            return await axios.post('/note/delete', formdata)
        } catch (error) {
            catchedErrorLog(error)
            return undefined
        }
    }
    async createSupper(supper: SupperCreateRequestModel): Promise<SupperCreateResponseModel | undefined> {
        try {
            const formdata = new FormData()
            formdata.append("type", supper.type)
            formdata.append("frames", supper.frames.toString())
            formdata.append('identification', JSON.stringify(RegistrationRepository.getUserIdentification()))

            return await axios.post('/hive/supper/create', formdata)
        } catch (error) {
            catchedErrorLog(error)
            return undefined
        }
    }
    async updateSupper(supper: SupperModel): Promise<SupperCreateResponseModel | undefined> {
        try {
            const formdata = new FormData()
            formdata.append("id", supper.id.toString())
            formdata.append("type", supper.type)
            formdata.append("frames", supper.frames.toString())
            formdata.append('identification', JSON.stringify(RegistrationRepository.getUserIdentification()))

            return await axios.post('/hive/supper/update', formdata)
        } catch (error) {
            catchedErrorLog(error)
            return undefined
        }
    }
    async deleteSupper(id: number): Promise<number | undefined> {
        try {
            const formdata = new FormData()
            formdata.append("id", id.toString())
            formdata.append('identification', JSON.stringify(RegistrationRepository.getUserIdentification()))

            return await axios.post('/hive/supper/delete', formdata)
        } catch (error) {
            catchedErrorLog(error)
            return undefined
        }
    }
    async deleteHive(hiveId: number): Promise<boolean> {
        try {
            const formdata = new FormData()
            formdata.append('identification', JSON.stringify(RegistrationRepository.getUserIdentification()))
            formdata.append('hiveId', hiveId.toString())
            
            await axios.post('/hive/delete', formdata)
            return true
        } catch (error) {
            catchedErrorLog(error)
            return false
        } 
    }
    async updateHive(hive: HiveUpdateModel): Promise<HiveModel | undefined> {
        try {
            const formdata = new FormData()
            formdata.append('identification', JSON.stringify(RegistrationRepository.getUserIdentification()))
            formdata.append('id', hive.id.toString())
            if (hive.name) formdata.append('name', hive.name)
            if (hive.type) formdata.append('type', hive.type)
            if (hive.location) formdata.append('location', hive.location)
            if (hive.description) formdata.append('description', hive.description)
            if (hive.imageFile) formdata.append('image', hive.imageFile)
      
            return await axios.post('/hive/update', formdata)
        } catch (error) {
            catchedErrorLog(error)
            return undefined
        } 
    }
    async createHive(hive: HiveCreateModel): Promise<HiveModel | null> {
        try {
            const formdata = new FormData()
            formdata.append('identification', JSON.stringify(RegistrationRepository.getUserIdentification()))
            formdata.append('name', hive.name)
            formdata.append('type', hive.type)
            if (hive.location) formdata.append('location', hive.location)
            if (hive.description) formdata.append('description', hive.description)
            if (hive.image) formdata.append('image', hive.image)
      
            const { data } = await axios.post('/hive/create', formdata)
            return data as HiveModel
        } catch (error) {
            catchedErrorLog(error)
            return null
        } 
    }
    async getHives(searchWord: string = "%"): Promise<HiveModel[]> {
        try {
            console.log('userID', RegistrationRepository.getUserIdentification());
            
            const { data } = await axios.post<HiveModel[]>('/hive/hives', { identification: RegistrationRepository.getUserIdentification() })
            console.log(`hives: ${data}`);
            

            if (data) {
                return data
            } else {
                console.log('No hives');
                return []
            }
        } catch (error) {
            console.error(error);
            return []
        }
    }

    async assignHive(hiveId: number, apiaryId: number): Promise<HiveModel | null> {
        const payload: HiveAssignRequestModel = {
            identification: RegistrationRepository.getUserIdentification(),
            hiveId: hiveId,
            apiaryId: apiaryId
        }

        try {
            const { data } = await axios.post<HiveModel[]>('/hive/assign', payload)
            return data[0]
        } catch (error) {
            catchedErrorLog(error)
            return null
        }
    }
}