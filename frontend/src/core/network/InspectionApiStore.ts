import axios from 'axios'
import { defineStore } from 'pinia'
import type { InspectionCreateRequestModel, InspectionGetResponseModel } from './Models';
import { InspectionGetResponseModel_To_InspectionFormDB, InspectionGetResponseModelArray_To_InspectionFormDBArray } from '../Convertors';
import type { InspectionDB, InspectionTableEntryModel } from '../stores/Models';

export const useInspectionApiStore = defineStore('useInspectionApiStore', () => {
    async function createInspection(
        inspectionData: InspectionCreateRequestModel
    ): Promise<InspectionDB | undefined> {
        try {
            const { data } = await axios.post<InspectionGetResponseModel>('/hive/inspections/create', inspectionData) 
            return InspectionGetResponseModel_To_InspectionFormDB(data)
        } catch (error) {
            console.error(error)
        }
    }

    async function getInspections(
        page:  number,
        limit: number
    ): Promise<InspectionDB[] | undefined> {
        try {
            const { data } = await axios.get<InspectionGetResponseModel[]>('/hive/inspections/get', {
                params: { page, limit }
            })
            return InspectionGetResponseModelArray_To_InspectionFormDBArray(data)
        } catch (error) {
            console.error(error)
        }
    }

    return {
        getInspections,
        createInspection,
    }
})