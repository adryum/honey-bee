import axios from 'axios'
import { InspectionEntryResponseModel_To_InspectionTableEntryModel, InspectionReviewResponseModel_To_InspectionFormDB } from '../Convertors';
import type { InspectionDB, InspectionTableEntryModel } from '../stores/Models';
import type { InspectionCreateRequestModel, InspectionEntryResponseModel, InspectionReviewResponseModel } from './Models';
import type { InspectionFilters } from '../composables/useInspection';

export const inspectionApi = {
    getInspectionTableEntries: async (payload: InspectionFilters): Promise<InspectionTableEntryModel[]> => {
        const { data } = await axios.get<InspectionEntryResponseModel[]>('/inspection/entries', {
            params: { 
                page:   payload.page,
                limit:  payload.limit,
                hiveId: payload.hiveId,
            }
        })
        return data.map(InspectionEntryResponseModel_To_InspectionTableEntryModel)
    },

    getInspection: async (id: number): Promise<InspectionDB> => {
        const { data } = await axios.get<InspectionReviewResponseModel>(`/inspection/${id}`)
        return InspectionReviewResponseModel_To_InspectionFormDB(data)
    },

    create: async (
        inspectionData: InspectionCreateRequestModel
    ): Promise<InspectionDB> => {
        const { data } = await axios.post<InspectionReviewResponseModel>('/inspection/create', inspectionData) 
        return InspectionReviewResponseModel_To_InspectionFormDB(data)
    },

    remove: async (
        inspectionData: InspectionCreateRequestModel
    ): Promise<InspectionDB> => {
        const { data } = await axios.post<InspectionReviewResponseModel>('/inspection/remove', inspectionData) 
        return InspectionReviewResponseModel_To_InspectionFormDB(data)
    },
}
