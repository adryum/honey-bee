import type { HiveType, NoteTypes, Role } from "../DatabaseEnums"
import type { HiveHistoryEntryDB } from "../stores/Models"

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
    history:      HiveHistoryEntryDB[]
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


export type ApiaryAccessResponseModel = {
    apiaryId: number
}