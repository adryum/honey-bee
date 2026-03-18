import type { reactive } from "vue";
import { String_to_HiveType, String_to_NoteTypes, String_to_Role } from "./DatabaseEnums";
import type { ApiaryAccessResponseModel, ApiaryCreateResponseModel, HiveCreateResponseModel, InspectionCreateRequestModel, InspectionGetResponseModel, NoteCreateModelResponse, UserEntryResponseModel, UserProfileResponseModel, WhitelistEntryResponseModel } from "./network/Models";
import type { ApiaryModelDB, HiveModelDB, InspectionDB, InspectionFormDB, InspectionFormUI, NoteModelDB, UserEntryModelDB, UserProfileModel, UserProfileModelDB, WhitelistEntryModelDB } from "./stores/Models";

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


export function InspectionGetResponseModel_To_InspectionFormDB(
    convertee: InspectionGetResponseModel
): InspectionDB {
    return {
        id:            convertee.id,
        apiaryId:      convertee.apiaryId,
        apiaryName:    convertee.apiaryName,
        userIdCreator: convertee.userIdCreator,
        userPicture:   convertee.userPicture,
        username:      convertee.username,
        creationDate:  convertee.creationDate,
        forms:         convertee.forms.map(form => ({
            id:                           form.id,
            hiveId:                       form.hiveId,
            hiveName:                     form.hiveName,
            isAbnormalBehavior:           form.isAbnormalBehavior,
            isSwarming:                   form.isSwarming,
            needAdditionalFeeding:        form.needAdditionalFeeding,
            isQueenAlive:                 form.isQueenAlive,
            isQueenLayingEggs:            form.isQueenLayingEggs,
            isQueenLayingEggsIncorrectly: form.isQueenLayingEggsIncorrectly,
            needMoreHoneyFrames:          form.needMoreHoneyFrames,
            needMoreBreedingFrames:       form.needMoreBreedingFrames,
            needMedicalAttention:         form.needMedicalAttention,
            hasHiveDamage:                form.hasHiveDamage,
            isTakingOutFrames:            form.isTakingOutFrames,
            abnormalBehaviorDescription:  form.abnormalBehaviorDescription,
            medicalAttentionDescription:  form.medicalAttentionDescription,
            hiveDamageDescription:        form.hiveDamageDescription,
            needMoreHoneyFramesAmount:    form.needMoreHoneyFramesAmount,
            needMoreBreedingFramesAmount: form.needMoreBreedingFramesAmount,
            takenHoneyFrames:             form.takenHoneyFrames,
            takenBreedingFrames:          form.takenBreedingFrames
        }))
    }
}
export function InspectionGetResponseModelArray_To_InspectionFormDBArray(
    convertee: InspectionGetResponseModel[]
): InspectionDB[] {
    console.log(convertee);

    return convertee.map(item => InspectionGetResponseModel_To_InspectionFormDB(item))
}


export function InspectionFormUIArray_To_InspectionCreateRequestModel(
    apiaryId: number,
    convertee: InspectionFormUI[]
): InspectionCreateRequestModel {    
    return {
        apiaryId: apiaryId,
        forms: convertee.map(form => ({
            hiveId:                       form.hiveId,
            isAbnormalBehavior:           form.isAbnormalBehavior,
            isSwarming:                   form.isSwarming,
            needAdditionalFeeding:        form.needAdditionalFeeding,
            isQueenAlive:                 form.isQueenAlive,
            isQueenLayingEggs:            form.isQueenLayingEggs,
            isQueenLayingEggsIncorrectly: form.isQueenLayingEggsIncorrectly,
            needMoreHoneyFrames:          form.needMoreHoneyFrames,
            needMoreBreedingFrames:       form.needMoreBreedingFrames,
            needMedicalAttention:         form.needMedicalAttention,
            hasHiveDamage:                form.hasHiveDamage,
            isTakingOutFrames:            form.isTakingOutFrames,
            abnormalBehaviorDescription:  form.abnormalBehaviorDescription,
            medicalAttentionDescription:  form.medicalAttentionDescription,
            hiveDamageDescription:        form.hiveDamageDescription,
            needMoreHoneyFramesAmount:    form.needMoreHoneyFramesAmount,
            needMoreBreedingFramesAmount: form.needMoreBreedingFramesAmount,
            takenHoneyFrames:             form.takenHoneyFrames,
            takenBreedingFrames:          form.takenBreedingFrames
        }))
    }
}


export function InspectionFormDB_To_InspectionFormUI(
    convertee: InspectionFormDB
): InspectionFormUI {
    return {
        hiveId:                       convertee.hiveId,
        isAbnormalBehavior:           convertee.isAbnormalBehavior,
        isSwarming:                   convertee.isSwarming,
        needAdditionalFeeding:        convertee.needAdditionalFeeding,
        isQueenAlive:                 convertee.isQueenAlive,
        isQueenLayingEggs:            convertee.isQueenLayingEggs,
        isQueenLayingEggsIncorrectly: convertee.isQueenLayingEggsIncorrectly,
        needMoreHoneyFrames:          convertee.needMoreHoneyFrames,
        needMoreBreedingFrames:       convertee.needMoreBreedingFrames,
        needMedicalAttention:         convertee.needMedicalAttention,
        hasHiveDamage:                convertee.hasHiveDamage,
        isTakingOutFrames:            convertee.isTakingOutFrames,
        abnormalBehaviorDescription:  convertee.abnormalBehaviorDescription,
        medicalAttentionDescription:  convertee.medicalAttentionDescription,
        hiveDamageDescription:        convertee.hiveDamageDescription,
        needMoreHoneyFramesAmount:    convertee.needMoreHoneyFramesAmount,
        needMoreBreedingFramesAmount: convertee.needMoreBreedingFramesAmount,
        takenHoneyFrames:             convertee.takenHoneyFrames,
        takenBreedingFrames:          convertee.takenBreedingFrames,
        isSubmited:                   false,
        hasMadeChanges:               false
    }
}