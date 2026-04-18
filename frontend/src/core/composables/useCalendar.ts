import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { calendarApi } from "../api/CalendarApi";
import { computed, type Ref } from "vue";
import type { CalendarEventDB } from "../stores/Models";

export const useCalendarQuery = (
    data: {
        calendarIds: Ref<string[]>
        month:       Ref<number>
        year:        Ref<number>
    }
) => {
    const { data: events, isLoading, isError } = useQuery({
        queryKey: computed(() => ["events", { 
            calendarIds: data.calendarIds.value,
            month:       data.month.value,
            year:        data.year.value
        }]),
        queryFn:  () =>  calendarApi.getEvents(
            data.calendarIds.value, 
            data.month.value, 
            data.year.value
        ),
        enabled: computed(() => data.calendarIds.value.length > 0)
    })

    return { events, isLoading, isError }

}

export const useCalendarMutation = () => {
    const queryClient = useQueryClient()

    const { mutate: createEvent, isPending: isCreatingEvent } = useMutation({
        mutationFn: calendarApi.createEvent,
        onSuccess: (newEvent) => {
            queryClient.invalidateQueries({ queryKey: ['events'] })
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