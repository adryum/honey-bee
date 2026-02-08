import type { HiveType } from "../DatabaseEnums"

export type ApiaryCreateRequestModel = {
    name:        string
    description: string
    image:       File
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
}

export type HiveCreateRequestModel = {
    name:        string,  
    description: string,
    imagePath:   string,
    type:        HiveType, 
}
