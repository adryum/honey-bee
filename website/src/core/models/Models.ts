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

// apiaries
export type ApiaryModel = {
    id: number
    name: string
    description: string
    location: string
    imagePath: string
    hiveCount: number
}

export type ApiaryCreateModel = {
    name: string
    description?: string
    location?: string
    imageFile?: File
}

export type ApiarySearchOptions = {
    searchWord?: string
    ignoreDifferentLetterCases?: boolean
    hiveCount?: number
    id?: number
}

export type HiveModel = {
    id: number
    name: string
    imagePath: string
    apiaryId?: number
    apiaryName?: string
    apiaryImagePath?: string
}

export type HiveSearchOptions = {
    searchWord?: string
    isAssigned?: boolean
    type?: string
    apiaryId?: number
    ignoreDifferentLetterCases?: boolean
}

export type HiveCreateModel = {
    name: string
    location?: string
    description?: string
    type: string
    image?: File
}