import type { HistoryActionType, HiveType, NoteTypes, Role } from "../DatabaseEnums"
import type { HistoryEntryDB } from "../stores/Models"

export type ApiaryCreateRequestModel = {
    name :        string
    description?: string
    image?:       File
}

export type ApiaryGetModel = {
    id:                number
    name:              string
    image:             string
    location:          string
    description:       string
    creationTimestamp: string
    hiveCount:         number
}

export type HiveAssignGetModel = {
    previousApiary: {
        id:   number
        name: string
    } | undefined,
    newApiary: {
        id:   number
        name: string
    },
    hive: {
        id:   number
        name: string
    }
}

export type HiveAssignRequestModel = {
    hiveId:   number
    apiaryId: number
}

export type HiveCreateResponseModel = {
    id:           number
    name:         string
    description:  string
    image:        string
    location:     string
    type:         string
    apiaryId:     number
    creationDate: string
    creatorId:    number
    creatorName:  string
    creatorImage: string
    history:      HistoryEntryDB[]
    calendarId:   string
}

export type HiveCreateRequestModel = {
    name:        string
    description: string
    image?:      File
    type:        HiveType
    apiaryId:    number
}

export type HiveUpdateRequestModel = {
    id:          number
    name:        string
    description: string
    image?:      File
    type:        HiveType
    apiaryId?:   number
}

export type UserProfileResponseModel = {
    id:       number
    username: string
    picture:  string
    email:    string
    role:     string
    image:    string
}

export type NoteCreateModelRequest = {
    title:   string
    content: string
    type:    NoteTypes
    hiveId:  number
}

export type NoteCreateModelResponse = {
    id:           number
    title:        string
    content:      string
    type:         string
    userId:       number
    hiveId:       number
    creationDate: string
}

export type  NoteUpdateRequestModel = {
    id:      number
    title:   string
    content: string
    type:    string
    hiveId:  number
}

export type HiveCalendarEntryRequestModel = {
    hiveId:       number
    calendarId:   string
    start:        string
    end:          string
    title:        string
    description:  string
    creatorEmail: string
}

export type HiveCalendarEntryResponseModel = {
    hiveId:       number
    calendarId:   string
    start:        string
    end:          string
    title:        string
    description:  string
    creatorEmail: string
}

export type WhitelistEntryResponseModel = {
    id:           number
    email:        string
    role:         string
    status:       number
    isRegistered: number
}
export type UpdateWhitelistEntryRequestModel = {
    id:        number
    email:     string
    role:      Role
    isEnabled: boolean
}
export type UpdateUserEntryRequestModel = {
    id:            number
    email:         string
    role:          Role
    isWhitelisted: boolean
}
export type UserEntryResponseModel = {
    id:            number
    email:         string
    role:          Role
    isWhitelisted: number
}

export type UpdateWhitelistEntryResponseModel = {
    whitelistEntry: WhitelistEntryResponseModel
    userEntry:      UserEntryResponseModel
}
export type AddToWhitelistRequestModel = {
    email:     string
    role:      string
    isEnabled: boolean
}


export type UpdateApiaryAccessRequestModel = {
    userId:     number
    apiaryId:   number
    giveAccess: boolean
}


export type UpdateApiaryAccessResponseModel = {
    userId:    number
    apiaryId:  number
    hasAccess: boolean
}

export type UpdateHiveAccessRequestModel = {
    userId:   number
    hiveId:   number
    giveAccess: boolean
}

export type UpdateHiveAccessResponseModel = {
    userId:   number
    hiveId:   number
    hasAccess: boolean
}

export type ApiaryAccessResponseModel = {
    apiaryId: number
}
export type HiveAccessResponseModel = {
    hiveId: number
}


export type InspectionCreateRequestModel = {
    apiaryId: number;
    forms:     {
        hiveId:                       number;
        isAbnormalBehavior:           boolean;
        isSwarming:                   boolean;
        needAdditionalFeeding:        boolean;
        isQueenAlive:                 boolean;
        isQueenLayingEggs:            boolean;
        isQueenLayingEggsIncorrectly: boolean;
        needMoreHoneyFrames:          boolean;
        needMoreBreedingFrames:       boolean;
        needMedicalAttention:         boolean;
        hasHiveDamage:                boolean;
        abnormalBehaviorDescription:  string;
        medicalAttentionDescription:  string;
        hiveDamageDescription:        string;
        isTakingOutFrames:            boolean;
        needMoreHoneyFramesAmount:    number;
        needMoreBreedingFramesAmount: number;
        takenHoneyFrames:             number;
        takenBreedingFrames:          number;
    }[] | undefined
}

export type InspectionEntryGetModel = {
    id:                number
    formCount:         number
    processed:         boolean
    creationTimestamp: string
    user: {
        id:       number
        image:    string
        username: string
    } | undefined
    apiary: {
        id:   number
        name: string
    } | undefined
}

export type InspectionReviewGetModel = {
    id:                number;
    apiaryId:          number;
    userIdCreator:     number
    creationTimestamp: string
    hasBeenProcessed:  boolean
    user:              {
        image:   string
        username:      string
    } | undefined
    apiary: {
        name:    string
    } | undefined
    hiveInspectionForms:    {
        id:                           number
        hiveId:                       number
        isAbnormalBehavior:           boolean
        isSwarming:                   boolean
        needAdditionalFeeding:        boolean
        isQueenAlive:                 boolean
        isQueenLayingEggs:            boolean
        isQueenLayingEggsIncorrectly: boolean
        needMoreHoneyFrames:          boolean
        needMoreBreedingFrames:       boolean
        needMedicalAttention:         boolean
        hasHiveDamage:                boolean
        isTakingOutFrames:            boolean
        abnormalBehaviorDescription:  string
        medicalAttentionDescription:  string
        hiveDamageDescription:        string
        needMoreHoneyFramesAmount:    number
        needMoreBreedingFramesAmount: number
        takenHoneyFrames:             number
        takenBreedingFrames:          number
        hive: {
            name: string
        } | undefined
    }[] | undefined
}

export type HiveHistoryCreateModel = {
    hiveId: number
    text:   string
    type:   HistoryActionType
}

export type HiveHistoryGetModel = {
    id:                number
    text:              string
    hiveId:            number
    creationTimestamp: string
    historyActionType: {
        id:   number
        type: HistoryActionType
    }
    user:         {
        id:       number
        username: string
        image:    string
    } | undefined
}

export type ApiaryHistoryCreateModel = {
    apiaryId: number
    text:     string
    type:     HistoryActionType
}

export type ApiaryHistoryGetModel = {
    id:                number
    text:              string
    apiaryId:          number
    creationTimestamp: string
    historyActionType: {
        id:   number
        type: HistoryActionType
    }
    user:         {
        id:       number
        username: string
        image:    string
    } | undefined
}

export type CalendarEventGetModel = {
    calendarId:   string
    eventId:      string
    start:        string
    end:          string
    title:        string
    description:  string
    creatorEmail: string
}

export type CalendarEventCreateModel = {
    calendarId:   string
    start:        string
    end:          string
    title:        string
    description:  string
}

export type QueenCreateModel = {
    image:     File | undefined
    bornDate:  Date
    speciesId: number
    hiveId:    number
}

export type QueenGetModel = {
    id:              number
    imageUrl:        string
    bornDate:        string
    addedToHiveDate: string
    species:         {
        id:             number
        scientificName: string
        lifeExpectancy: string
    },
    hive: {
        id:   number,
        name: string
    } | undefined 
}

export type QueenUpdateModel = {
    id:         number
    speciesId?: number
    bornDate?:  Date
    image?:     File
}

export type SpeciesGetModel = {
    id:             number
    scientificName: string
    knownAsName:    string
    lifeExpectancy: string
    description:    string
    behavior:       string
    preferences:    string
}

export type HiveYieldGetModel = {
    id: number
    amount: number
    hiveId: 81,
    inspectionId: 96,
    createdAt: '2026-04-07 12:42:56',
    hive: { id: 81, name: 'sad' }
}