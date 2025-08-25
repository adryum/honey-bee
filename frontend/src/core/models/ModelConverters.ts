import type { RegistrationResponseModel } from "../server/models/ResponseModels";
import type { UserModel } from "./Models";

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