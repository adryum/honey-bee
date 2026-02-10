import type { HiveType, Role } from "../DatabaseEnums"

export type ApiaryModelDB = {
    id:          number
    name:        string
    description: string
    image:       string
}

export type HiveModelDB = {
    id:          number
    name:        string
    description: string
    image:       string
    location:    string
    type:        HiveType
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