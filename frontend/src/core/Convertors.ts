import type { reactive } from "vue";
import { String_to_HiveType, String_to_NoteTypes, String_to_Role } from "./DatabaseEnums";
import type { ApiaryAccessResponseModel, ApiaryCreateResponseModel, HiveCreateResponseModel, NoteCreateModelResponse, UserEntryResponseModel, UserProfileResponseModel, WhitelistEntryResponseModel } from "./network/Models";
import type { ApiaryModelDB, HiveModelDB, NoteModelDB, UserEntryModelDB, UserProfileModel, UserProfileModelDB, WhitelistEntryModelDB } from "./stores/Models";

export function ApiaryCreateResponse_to_ApiaryModelDB(
    convertee: ApiaryCreateResponseModel
): ApiaryModelDB {
    return {
        id:          convertee.id,
        name:        convertee.name,
        description: convertee.description,
        image:       convertee.image,
        hiveCount:   0
    }
}
export function ApiaryCreateResponseArray_to_ApiaryModelDBArray(
    convertee: ApiaryCreateResponseModel[]
): ApiaryModelDB[] {
    return convertee.map(item => ApiaryCreateResponse_to_ApiaryModelDB(item))
}

export function HiveCreateResponse_to_HiveModelDB(
    convertee: HiveCreateResponseModel
): HiveModelDB {
    return {
        id:           convertee.id,
        name:         convertee.name,
        description:  convertee.description,
        image:        convertee.image,
        location:     convertee.location,
        type:         String_to_HiveType(convertee.type),
        apiaryId:     convertee.apiaryId,
        creationDate: convertee.creationDate,
        creatorId:    convertee.creatorId,
        creatorName:  convertee.creatorName,
        creatorImage: convertee.creatorImage,
        history:      convertee.history,
        calendarId:   convertee.calendarId,
        // calendarEvents: convertee.calendarEvents
    }
}

export function HiveCreateResponseArray_to_HiveModelDBArray(
    convertee: HiveCreateResponseModel[]
): HiveModelDB[] {
    return convertee.map(item => HiveCreateResponse_to_HiveModelDB(item))
}


export function NoteCreateModelResponse_to_NoteModelDB(
    convertee: NoteCreateModelResponse
): NoteModelDB {
    return {
        id:           convertee.id,
        title:        convertee.title,
        content:      convertee.content,
        type:         String_to_NoteTypes(convertee.type),
        userId:       convertee.userId,
        hiveId:       convertee.hiveId,
        creationDate: convertee.creationDate
    }
}
export function NoteCreateModelResponseArray_to_NoteModelDBArray(
    convertee: NoteCreateModelResponse[]
): NoteModelDB[] {
    return convertee.map(item => NoteCreateModelResponse_to_NoteModelDB(item))
}


export function WhitelistEntryResponseModel_To_WhitelistEntryDB(
    convertee: WhitelistEntryResponseModel
): WhitelistEntryModelDB {
    return {
        id:           convertee.id,
        email:        convertee.email,
        role:         String_to_Role(convertee.role),
        isRegistered: Boolean(convertee.isRegistered),
        isEnabled:    Boolean(convertee.status)
    } 
}
export function WhitelistEntryResponseModelArray_To_WhitelistEntryModelDBArray(
    array: WhitelistEntryResponseModel[]
): WhitelistEntryModelDB[] {
    return array.map(item => WhitelistEntryResponseModel_To_WhitelistEntryDB(item))
}


export function UserEntryResponseModel_To_UserEntryModelDB(
    convertee: UserEntryResponseModel
): UserEntryModelDB {
    return {
        id:            convertee.id,
        email:         convertee.email,
        role:          convertee.role,
        isWhitelisted: Boolean(convertee.isWhitelisted)
    }
}
export function UserEntryResponseModelArray_To_UserEntryModelDBArray(
    convertee: UserEntryResponseModel[]
): UserEntryModelDB[] {
    return convertee.map(item => UserEntryResponseModel_To_UserEntryModelDB(item))
}


export function UserProfileResponseModel_To_UserProfileModelDB(
    convertee: UserProfileResponseModel
): UserProfileModelDB {
    return {
        id:       convertee.id,
        role:     String_to_Role(convertee.role),
        email:    convertee.email,
        username: convertee.username
    }
}


export function ApiaryAccessResponseModel_To_Number(
    convertee: ApiaryAccessResponseModel
) {
    return convertee.apiaryId
}
export function ApiaryAccessResponseModelArray_To_NumberArray(
    convertee: ApiaryAccessResponseModel[]
) {
    return convertee.map(item => ApiaryAccessResponseModel_To_Number(item))
}