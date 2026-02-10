import { String_to_HiveType } from "./DatabaseEnums";
import type { ApiaryCreateResponseModel, HiveCreateResponseModel, UserProfileResponseModel } from "./network/Models";
import type { ApiaryModelDB, HiveModelDB, UserProfileModel } from "./stores/Models";

export function ApiaryCreateResponse_to_ApiaryModelDB(
    convertee: ApiaryCreateResponseModel
): ApiaryModelDB {
    return {
        id:          convertee.id,
        name:        convertee.name,
        description: convertee.description,
        image:       convertee.image
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
        id:          convertee.id,
        name:        convertee.name,
        description: convertee.description,
        image:       convertee.image,
        location:    convertee.location,
        type:        String_to_HiveType(convertee.type)
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
        id: convertee.id,
        username: convertee.username,
        picture: convertee.picture,
        email: convertee.email,
        role: convertee.role
    }
}
