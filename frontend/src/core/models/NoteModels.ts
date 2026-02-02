
export type NoteModel = {
    id: number
    type: string
    title: string
    content: string
} 

export type NoteCreateRequestModel = {
    type: string
    title: string
    content: string
}

export type NoteCreateResponseModel = NoteModel