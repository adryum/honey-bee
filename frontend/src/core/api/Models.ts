import type { HistoryEntryType, HiveType, NoteTypes, Role } from "../DatabaseEnums"
import type { HistoryEntryDB } from "../stores/Models"

export type ApiaryCreateRequestModel = {
    name:        string
    description: string
    image?:      File
}

export type ApiaryCreateResponseModel = {
    id:          number
    name:        string
    description: string
    image:       string
}

export type HiveAssignResponseModel = {
    hiveId:   number
    apiaryId: number
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
    }[]
}

export type InspectionEntryResponseModel = {
    id:                  number;
    apiaryId:            number;
    userIdCreator:       number
    creationDate:        string
    processed:           boolean
    hiveInspectionForms: []
    user:                {
        image:    string
        username: string
    }
    apiary: {
        name:    string
    }
}

export type InspectionReviewResponseModel = {
    id:               number;
    apiaryId:         number;
    userIdCreator:    number
    creationDate:     string
    hasBeenProcessed: boolean
    user:             {
        image:   string
        username:      string
    }
    apiary: {
        name:    string
    }
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
        }
    }[]
}

export type HiveHistoryCreateModel = {
    hiveId: number
    text:   string
    type:   HistoryEntryType
}

export type HiveHistoryGetModel = {
    id:           number
    hiveId:       number
    type:         HistoryEntryType
    text:         string
    creationDate: string
    user:         {
        id:       number
        username: string
        image:  string
    }
}