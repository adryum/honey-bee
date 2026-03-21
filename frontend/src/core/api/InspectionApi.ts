import axios from 'axios'
import { InspectionGetResponseModel_To_InspectionFormDB } from '../Convertors';
import type { InspectionDB } from '../stores/Models';
import type { InspectionCreateRequestModel, InspectionGetResponseModel } from './Models';
import type { InspectionFilters } from '../composables/useInspection';

export const inspectionApi = {
    create: async (
        inspectionData: InspectionCreateRequestModel
    ): Promise<InspectionDB> => {
        const { data } = await axios.post<InspectionGetResponseModel>('/hive/inspections/create', inspectionData) 
        return InspectionGetResponseModel_To_InspectionFormDB(data)
    },

    getInspections: async (payload: InspectionFilters): Promise<InspectionDB[]> => {
        const { data } = await axios.get<InspectionGetResponseModel[]>('/hive/inspections/get', {
            params: { 
                page:   payload.page,
                limit:  payload.limit,
                hiveId: payload.hiveId,
                ids:    payload.ids
            }
        })
        return data.map(InspectionGetResponseModel_To_InspectionFormDB)
    }
}
