import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { calendarApi } from "../api/CalendarApi";

export const useCalendarMutation = () => {
    const queryClient = useQueryClient()

    const { mutate: createEvent, isPending: isCreatingEvent } = useMutation({
        mutationFn: calendarApi.createEvent,
        onSuccess: (newEvent) => {

        }
    })

    const { mutate: deleteEvent, isPending: isDeletingEvent } = useMutation({
        mutationFn: calendarApi.deleteEvent,
        onSuccess: (id) => {

        }
    })

    const { mutate: updateEvent, isPending: isUpdatingEvent } = useMutation({
        mutationFn: calendarApi.updateEvent,
        onSuccess: (updatedEvent) => {

        }
    })

    return {
        createEvent,
        deleteEvent,
        updateEvent,
        isCreatingEvent,
        isDeletingEvent,
        isUpdatingEvent
    }
}