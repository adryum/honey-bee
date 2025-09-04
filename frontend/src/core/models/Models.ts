export type UserLoginModel = {
    email: string
    password: string
}

export type UserSignUpModel = {
    username: string
    email: string
    password: string
}

export type UserModel = {
    id: number
    username: string
    email: string
    picturePath: string
    role: string
    paidTier: string
}

export type HiveModel = {
    id: number
    name: string
    imagePath: string
    apiaryId?: number
    apiaryName?: string
    apiaryImagePath?: string
}

export type HiveSearchModel = {
    searchWord?: string
    isAssigned?: boolean
    type?: string
    apiaryId?: number
    ignoreDifferentLetterCases?: boolean
}

export type CreateHiveModel = {
    name: string
    location?: string
    description?: string
    type: string
    image?: File
}