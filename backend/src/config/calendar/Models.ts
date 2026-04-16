export type CreateCalendarEventModel = {
    title:       string;
    description: string;
    start:       Date;
    end:         Date;
};

export type UpdateCalendarEventModel = {
    id:          string;
    title:       string;
    description: string;
    start:       Date;
    end:         Date;
};

export type CalendarEntryModel = {
    id:           string;
    title:        string;
    description:  string;
    start:        string;
    end:          string;
    creatorEmail: string;
}