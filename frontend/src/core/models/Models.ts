import type { MaybeRef } from "vue"
import type { FieldValidationOptions } from "../composables/validators/UseFieldValidator"

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

export type LogModel = {
    creator: string
    creationDate: string
    message: string
}

export type StringDropdownOptions<T> = {
    initialValue?: MaybeRef<T> 
    showIcon?: MaybeRef<boolean>
    onHoverEffects?: MaybeRef<boolean>
    items?: MaybeRef<T[]>
    placeholder?: MaybeRef<string>
    noItemsText?: string
    maxListHeightInItems?: MaybeRef<number>
    maxSuggestedItemCount?: MaybeRef<number>
    clearOnListExpansion?: MaybeRef<boolean>
    closeOnEmptyInput?: MaybeRef<boolean>
    openOnEmptyInput?: MaybeRef<boolean>
    openOnFilledInput?: MaybeRef<boolean>
    suggestItems?: MaybeRef<boolean>
    validatorOptions?: FieldValidationOptions<T>
    zIndex?: MaybeRef<number>
    onInputChange?: (value: string) => void
    onItemSelection?: (item: T) => void
    onItemClick?: () => void
}
