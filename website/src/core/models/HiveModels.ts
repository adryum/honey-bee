export type HiveModel = {
    id: number
    name: string
    imagePath: string
    type: string
    location: string
    description: string
    apiaryId?: number
    apiaryName?: string
    apiaryImagePath?: string
}

export type HiveUpdateModel = {
    id: number
    name?: string
    imageFile?: File
    type?: string
    location?: string
    description?: string
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