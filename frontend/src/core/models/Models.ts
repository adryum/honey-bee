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
    apiaryName?: string
    apiaryImagePath?: string
}