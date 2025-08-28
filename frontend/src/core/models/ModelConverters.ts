import type { HiveResponseModel, RegistrationResponseModel } from "../server/models/ResponseModels";
import type { HiveModel, UserModel } from "./Models";

export function toUserModel(response: RegistrationResponseModel): UserModel {
    return {
        id: response.id,
        username: response.username,
        email: response.e_mail,
        picturePath: response.profile_picture,
        role: response.role,
        paidTier: response.paid_tier
    } as UserModel
}

export function toHiveModelArr(response: HiveResponseModel[]): HiveModel[] {
    return response.map(hive => {
        return toHiveModel(hive)
    })
}

export function toHiveModel(response: HiveResponseModel): HiveModel {
    return {
        id: response.id,
        name: response.name,
        imagePath: response.imagePath,
        apiaryName: response.apiaryName,
        apiaryImagePath: response.apiaryImagePath
    } as HiveModel
}