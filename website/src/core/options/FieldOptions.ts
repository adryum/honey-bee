export type FieldOptions = {
    onlyNumbers?: boolean
    isRequired?: boolean
    maxLength?: number
    minLength?: number
    type?: FieldType
}

export enum FieldType {
    None = "text",
    Email = "email",
    Password = "password"
}

export type FieldValidator = {
    isValid: boolean
    error: string
}