import { String_to_HiveType } from "./DatabaseEnums";
import type { ApiaryCreateResponseModel, HiveCreateResponseModel } from "./network/Models";
import type { ApiaryModelDB, HiveModelDB } from "./stores/Models";

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
