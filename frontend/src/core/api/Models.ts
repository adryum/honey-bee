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
    imageUrl:          string
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

export type HiveGetModel = {
    id:           number
    name:         string
    imageUrl:        string
    location:     string
    type:         string
    description:  string
    apiaryId:     number
    creationTimestamp: string
    calendarId:   string
    user: {
        id:       number
        username: string
        imageUrl: string
    } | undefined
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

export type UserProfileGetModel = {
    id:       number
    username: string
    email:    string
    role:     string
    imageUrl: string
}

export type NoteCreateModelRequest = {
    title:   string
    content: string
    type:    NoteTypes
    hiveId:  number
}

export type NoteGetModel = {
    id:                number
    title:             string
    content:           string
    type:              string
    userId:            number
    hiveId:            number
    creationTimestamp: string
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

export type WhitelistEntryGetModel = {
    id:     number
    email:  string
    role:   string
    status: boolean
    userId: number
}

export type WhitelistEntryUpdateModel = {
    id:        number
    email:     string
    role:      Role
    isEnabled: boolean
}

export type WhitelistEntryCreateModel = {
    email:     string
    role:      string
    isEnabled: boolean
}
export type UserEntryUpdateModel = {
    id:            number
    email:         string
    role:          Role
    isWhitelisted: boolean
}
export type UserEntryGetModel = {
    id:              number
    email:           string
    role:            Role
    whitelistStatus: boolean | null
}

export type UpdateWhitelistEntryResponseModel = {
    whitelistEntry: WhitelistEntryGetModel
    userEntry:      UserEntryGetModel
}

export type ApiaryAccessGetModel = {
    userId: number
    apiaryId: number
}
export type HiveAccessGetModel = {
    userId: number
    hiveId: number
}

export type InspectionCreateRequestModel = {
    apiaryId: number;
    forms:     {
        hiveId:                       number | undefined
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
        id:                              number
        abnormalBehavior:                boolean
        abnormalBehaviorDescription:     string
        swarming:                        boolean
        needFeeding:                     boolean
        queenAlive:                      boolean
        queenLayingEggs:                 boolean
        queenLayingEggsIncorrectly:      boolean
        needMoreHoneyFrames:             boolean
        needMoreHoneyFramesAmount:       number
        needMoreBreedingFrames:          boolean
        needMoreBreedingFramesAmount:    number
        needMedicalAttention:            boolean
        needMedicalAttentionDescription: string
        hasHiveDamage:                   boolean
        hasHiveDamageDescription:        string
        takingFrames:                    boolean
        takenHoneyFrames:                number
        takenBreedingFrames:             number
        inspectionId:                    number
        hive:                            {
            id:   number
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
        imageUrl: string
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
        imageUrl: string
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
    id:                   number
    imageUrl:             string
    bornDate:             string
    addedToHiveTimestamp: string
    queenSpecy:           {
        id:             number
        knownAsName:    string
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

export type QueenHistoryGetModel = {
    id:                  number
    timeSpentInHive:     string
    placedHereTimestamp: string
    imageUrl:            string
    queenSpecy: {
        id: number
        knownAsName: string
        scientificName: string
        lifeExpectancy: string
    } 
    hiveId:              number
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

export type HiveHoneyYieldGetModel = {
    id: number
    amount: number
    inspectionId: 96,
    creationTimestamp: '2026-04-07 12:42:56',
    hive: { id: 81, name: 'sad' }
}

export type HiveHoneyYieldCreateModel = {
    amount:       number
    inspectionId: number
    hiveId:       number
}

export type HiveAccessModifyModel = {
    userId: number
    hiveId: number
}

export type ApiaryAccessModifyModel = {
    userId:   number
    apiaryId: number
}

export type HiveQueenHistoryCreateModel = {
    hiveId:               number
    imageUrl:             string
    bornDate:             string
    queenSpeciesId:       number
    addedToHiveTimestamp: string
}

export type HiveQueenHistoryGetModel = {
    id:                  number
    timeSpentInHive:     string
    placedHereTimestamp: string
    imageUrl:            string
    queenSpecy: {
        id: number
        knownAsName: string
        scientificName: string
    }
    hive: {
        id: number
        name: string
    }
}