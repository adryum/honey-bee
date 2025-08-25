export type ApiaryCreateRequestModel = {
    identification: UserIdentificationModel
    name: string, 
    location: string, 
    description: string, 
    imagePath: string,
}

export type ApiaryRequestModel = {
    identification: UserIdentificationModel
    apiaryId: number
}

export type ApiariesRequestModel = {
    identification: UserIdentificationModel
    apiaryNameStartingSymbols: string
}

export type ApiaryDeleteRequestModel = {
    identification: UserIdentificationModel
    apiaryId: number
}

export type ApiaryHivesRequestModel = {
    identification: UserIdentificationModel
    apiaryId: number
    hiveNameStartingSymbols: string
}

// hives
export type HiveCreateRequestModel = {
    identification: UserIdentificationModel
    name: string, 
    location: string, 
    description: string,
    imagePath: string,
    type: string, 
}

export type HiveAssignRequestModel = {
    identification: UserIdentificationModel
    hiveId: number 
    apiaryId: number 
}

export type HiveUnassignRequestModel = {
    identification: UserIdentificationModel
    hiveId: number
}

export type HiveOverviewRequestModel = {
    identification: UserIdentificationModel
    hiveId: number
}

// user
export type UserIdentificationModel = {
    id: number
}

export type UserUpdateRequestModel = {
    identification: UserIdentificationModel
    username: string
    email: string
    password: string
    picturePath: string
}

export type UserDeleteRequestModel = {
    identification: UserIdentificationModel
    userId: number
}

export type UserLoginRequestModel = {
    email: string
    password: string
}

export type UserSignUpRequestModel = {
    username: string
    email: string
    password: string
    picturePath: string
}



