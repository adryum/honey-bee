import { String_to_HiveType, String_to_NoteTypes } from "./DatabaseEnums";
import type { ApiaryCreateResponseModel, HiveCreateResponseModel, NoteCreateModelResponse, UserProfileResponseModel } from "./network/Models";
import type { ApiaryModelDB, HiveModelDB, NoteModelDB, UserProfileModel } from "./stores/Models";

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
        history:      convertee.history
    }
}

export function HiveCreateResponseArray_to_HiveModelDBArray(
    convertee: HiveCreateResponseModel[]
): HiveModelDB[] {
    return convertee.map(item => HiveCreateResponse_to_HiveModelDB(item))
}

export function UserProfileResponseModel_To_UserProfileModel(
    convertee: UserProfileResponseModel
): UserProfileModel {
    return {
        id:       convertee.id,
        username: convertee.username,
        picture:  convertee.picture,
        email:    convertee.email,
        role:     convertee.role
    }
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