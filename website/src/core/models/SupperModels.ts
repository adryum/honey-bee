export type SupperModel = {
    id: number
    type: string
    frames: number
} 

export type SupperCreateRequestModel = {
    type: string
    frames: number
}

export type SupperCreateResponseModel = SupperModel

export type CallbackModel = {
    onSuccess: (message: string) => void
    onFailure: (error: unknown) => void
}