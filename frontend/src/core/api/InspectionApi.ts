import { InspectionEntriesGetModel_To_InspectionTableEntriesModelDB, InspectionReviewResponseModel_To_InspectionFormDB } from '../Convertors';
import type { InspectionDB, InspectionTableEntriesModelDB } from '../stores/Models';
import type { InspectionCreateRequestModel, InspectionEntriesGetModel, InspectionReviewGetModel } from './Models';
import type { InspectionFilters } from '../composables/useInspection';
import api from '../config/AxiosConfig';

export const inspectionApi = {
    getInspectionTableEntries: async (payload: InspectionFilters): Promise<InspectionTableEntriesModelDB> => {
        const { data } = await api.get<InspectionEntriesGetModel>('/inspection/entries', {
            params: { 
                page:   payload.page,
                limit:  payload.limit,
                hiveId: payload.hiveId,
            }
        })
        return InspectionEntriesGetModel_To_InspectionTableEntriesModelDB(data)
    },

    getInspection: async (id: number): Promise<InspectionDB> => {
        const { data } = await api.get<InspectionReviewGetModel>(`/inspection/${id}`)
        return InspectionReviewResponseModel_To_InspectionFormDB(data)
    },

    processInspection: async (id: number): Promise<InspectionDB> => {
        const { data } = await api.put<InspectionReviewGetModel>(`/inspection/${id}/process`)
        return InspectionReviewResponseModel_To_InspectionFormDB(data)
    },

    create: async (
        inspectionData: InspectionCreateRequestModel
    ): Promise<InspectionDB> => {
        const { data } = await api.post<InspectionReviewGetModel>('/inspection', inspectionData) 
        return InspectionReviewResponseModel_To_InspectionFormDB(data)
    },

    remove: async (
        inspectionData: InspectionCreateRequestModel
    ): Promise<InspectionDB> => {
        const { data } = await api.post<InspectionReviewGetModel>('/inspection/remove', inspectionData) 
        return InspectionReviewResponseModel_To_InspectionFormDB(data)
    },
}
