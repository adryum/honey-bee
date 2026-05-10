import type { CalendarEventCreateModel, CalendarEventGetModel } from "./Models";
import { CalendarEventGetModel_To_CalendarEventDB } from "../Convertors";
import type { CalendarEventDB } from "../stores/Models";
import qs from "qs";
import api from "../config/AxiosConfig";

export const calendarApi = {
    createEvent: async (payload: CalendarEventCreateModel) => {
        const { data } = await api.post<CalendarEventGetModel>('/calendar/event', payload)
        return CalendarEventGetModel_To_CalendarEventDB(data)
    },

    deleteEvent: async () => {

    },

    updateEvent: async () => {
        
    },
    
    getEvents: async (calendarIds: string[], month: number, year: number): Promise<CalendarEventDB[]> => {
        const { data } = await api.get<CalendarEventGetModel[]>("/calendar/events", {
            params: { calendarId: calendarIds, month, year },
            paramsSerializer: params => qs.stringify(params, { arrayFormat: 'repeat' })
        })
        return data.map(CalendarEventGetModel_To_CalendarEventDB)
    }
}