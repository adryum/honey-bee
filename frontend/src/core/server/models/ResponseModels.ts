export type ApiaryResponseModel = {
    id: number
    name: string
    description: string
    imagePath: string
    hiveCount: number
}

export type ApiariesResponseModel = {
    apiaries: ApiaryResponseModel[]
}

export type ApiaryHivesResponseModel = {
    hives: HiveResponseModel[]
}

// user 
export type RegistrationResponseModel = {
    id: number,
    username: string
    e_mail: string
    password: string
    profile_picture: string
    role: string
    paid_tier: string
}


// hive
export type HiveResponseModel = {
    id: number
    name: string
    imagePath: string
}

export type HiveOverviewResponseModel = {
    id: number
    name: string
    description: string
    location: string
    imagePath: string
}

export type UserUpdateResponseModel = {
    username: string
    email: string
    password: string
    picturePath: string
    role: string
    paidTier: string
}

export type UserRegistrationResponseModel = {
    identification: number
    username: string
    email: string
    password: string
    picturePath: string
    role: string
    paidTier: string
}

