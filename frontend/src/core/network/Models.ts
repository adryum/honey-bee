import type { HiveType, NoteTypes, Role } from "../DatabaseEnums"

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
    id:          number
    name:        string
    description: string
    image:       string
    location:    string
    type:        string
    apiaryId:    number
    apiaryName:  string
}

export type HiveCreateRequestModel = {
    name:        string
    description: string
    image?:      File
    type:        HiveType
}

export type HiveUpdateRequestModel = {
    id:          number
    name:        string
    description: string
    image?:      File
    type:        HiveType
    apiaryId:    number
}

export type UserProfileResponseModel = {
    id:       number
    username: string
    picture:  string
    email:    string
    role:     Role
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

export type  NoteUpdateModelRequest = {
    id:      number
    title:   string
    content: string
    type:    string
    hiveId:  number
}