import axios from 'axios'
import { InspectionEntryGetModel_To_InspectionTableEntryModel, InspectionReviewResponseModel_To_InspectionFormDB } from '../Convertors';
import type { InspectionDB, InspectionEntryModelDB } from '../stores/Models';
import type { InspectionCreateRequestModel, InspectionEntryGetModel, InspectionReviewGetModel } from './Models';
import type { InspectionFilters } from '../composables/useInspection';

export const inspectionApi = {
    getInspectionTableEntries: async (payload: InspectionFilters): Promise<InspectionEntryModelDB[]> => {
        const { data } = await axios.get<InspectionEntryGetModel[]>('/inspection/entries', {
            params: { 
                page:   payload.page,
                limit:  payload.limit,
                hiveId: payload.hiveId,
            }
        })
        return data.map(InspectionEntryGetModel_To_InspectionTableEntryModel)
    },

    getInspection: async (id: number): Promise<InspectionDB> => {
        const { data } = await axios.get<InspectionReviewGetModel>(`/inspection/${id}`)
        return InspectionReviewResponseModel_To_InspectionFormDB(data)
    },

    processInspection: async (id: number): Promise<InspectionDB> => {
        const { data } = await axios.get<InspectionReviewGetModel>(`/inspection/${id}/process`)
        return InspectionReviewResponseModel_To_InspectionFormDB(data)
    },

    create: async (
        inspectionData: InspectionCreateRequestModel
    ): Promise<InspectionDB> => {
        const { data } = await axios.post<InspectionReviewGetModel>('/inspection', inspectionData) 
        return InspectionReviewResponseModel_To_InspectionFormDB(data)
    },

    remove: async (
        inspectionData: InspectionCreateRequestModel
    ): Promise<InspectionDB> => {
        const { data } = await axios.post<InspectionReviewGetModel>('/inspection/remove', inspectionData) 
        return InspectionReviewResponseModel_To_InspectionFormDB(data)
    },
}
