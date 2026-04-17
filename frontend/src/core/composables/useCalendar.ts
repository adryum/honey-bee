import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { calendarApi } from "../api/CalendarApi";
import { computed, type Ref } from "vue";

export const useCalendarQuery = (
    data: {
        calendarIds: Ref<string[]>
    }
) => {
    const { calendarIds} = data

    const { data: events, isLoading, isError } = useQuery({
        queryKey: computed(() => ["calendars", calendarIds.value]),
        queryFn:  () => calendarApi.getEvents(calendarIds.value),
        initialData: []
    })

    return { events, isLoading, isError }

}

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