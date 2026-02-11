import type { HiveType, NoteTypes, Role } from "../DatabaseEnums"

export type ApiaryModelDB = {
    id:          number
    name:        string
    description: string
    image:       string
    hiveCount:   number
}

export type HiveModelDB = {
    id:          number
    name:        string
    description: string
    image:       string
    location:    string
    type:        HiveType
    apiaryId:    number
    apiaryName:  string
}

export type HiveCreateModel = {
    name:         string
    description?: string
    type:         HiveType
    image?:       File
}

export type UserProfileModel = {
    id:       number
    username: string
    picture:  string
    email:    string
    role:     Role
}

export type NoteModelDB = {
    id:           number
    title:        string
    content:      string
    type:         NoteTypes
    userId:       number
    hiveId:       number
    creationDate: string
}