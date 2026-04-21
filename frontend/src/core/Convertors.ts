import { String_to_HiveType, String_to_NoteTypes, String_to_Role } from "./DatabaseEnums";
import type { ApiaryAccessResponseModel, ApiaryCreateResponseModel, CalendarEventGetModel, HiveAccessResponseModel, HiveCreateResponseModel, HiveHistoryGetModel, InspectionCreateRequestModel, InspectionEntryResponseModel, InspectionReviewResponseModel, NoteCreateModelResponse, UserEntryResponseModel, UserProfileResponseModel, WhitelistEntryResponseModel } from "./api/Models";
import type { ApiaryModelDB, CalendarEventDB, HistoryEntryDB, HiveModelDB, InspectionDB, InspectionFormDB, InspectionFormUI, InspectionTableEntryModel, NoteModelDB, UserEntryModelDB, UserModelDB, WhitelistEntryModelDB } from "./stores/Models";

export function ApiaryCreateResponse_to_ApiaryModelDB(
    convertee: ApiaryCreateResponseModel
): ApiaryModelDB {
    return {
        id:          convertee.id,
        name:        convertee.name,
        description: convertee.description,
        image:       convertee.image,
        hiveCount:   convertee.hiveCount
    }
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
        calendarId:   convertee.calendarId,
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

export function UserProfileResponseModel_To_UserProfileModelDB(
    convertee: UserProfileResponseModel
): UserModelDB {
    return {
        id:       convertee.id,
        role:     String_to_Role(convertee.role),
        email:    convertee.email,
        username: convertee.username,
        picture:  convertee.image
    }
}

export function ApiaryAccessResponseModel_To_Number(
    convertee: ApiaryAccessResponseModel
) {
    return convertee.apiaryId
}

export function HiveAccessResponseModel_To_Number(
    convertee: HiveAccessResponseModel
) {
    return convertee.hiveId
}




export function InspectionReviewResponseModel_To_InspectionFormDB(
    convertee: InspectionReviewResponseModel
): InspectionDB {
    return {
        id:               convertee.id,
        apiaryId:         convertee.apiaryId,
        apiaryName:       convertee.apiary?.name || 'Unknown Apiary',
        userIdCreator:    convertee.userIdCreator,
        userPicture:      convertee.user?.image || '',
        username:         convertee.user?.username || 'Unknown User',
        creationDate:     convertee.creationDate,
        hasBeenProcessed: convertee.hasBeenProcessed,
        forms:            convertee.hiveInspectionForms?.map(form => ({
            id:                           form.id,
            hiveId:                       form.hiveId,
            hiveName:                     form.hive?.name || 'Unknown Hive',
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
        })) ?? []
    }
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

export function InspectionDB_To_InspectionTableEntryModel(
    convertee: InspectionDB
): InspectionTableEntryModel {
    return {
        id:               convertee.id,
        apiaryId:         convertee.apiaryId,
        apiaryName:       convertee.apiaryName,
        userIdCreator:    convertee.userIdCreator,
        userPicture:      convertee.userPicture,
        username:         convertee.username,
        creationDate:     convertee.creationDate,
        formCount:        convertee.forms.length,
        processed: !!convertee.hasBeenProcessed,
    }
}

export function InspectionEntryResponseModel_To_InspectionTableEntryModel(
    convertee: InspectionEntryResponseModel
): InspectionTableEntryModel {
    console.log('converting:', convertee.id, 'user:', convertee.user, 'apiary:', convertee.apiary)
    return {
        id:            convertee.id,
        apiaryId:      convertee.apiaryId,
        apiaryName:    convertee.apiary?.name || 'Unknown Apiary',
        userIdCreator: convertee.userIdCreator,
        userPicture:   convertee.user?.image || '',
        username:      convertee.user?.username || 'Unknown User',
        formCount:     convertee.hiveInspectionForms.length,
        processed:     !!convertee.processed,
        creationDate:  convertee.creationDate,
    }
}

export function HiveHistoryGetModel_To_HistoryEntryDB(
    convertee: HiveHistoryGetModel
): HistoryEntryDB {
    return {
        id:           convertee.id,
        text:         convertee.text,
        type:         convertee.type,
        userId:       convertee.user?.id || -1,
        username:     convertee.user?.username || 'Unknown User',
        userImage:    convertee.user?.image || '',
        creationDate: convertee.creationDate,
    }
}


export function CalendarEventGetModel_To_CalendarEventDB(
    convertee: CalendarEventGetModel
): CalendarEventDB {
    return {
        calendarId:   convertee.calendarId,
        eventId:      convertee.eventId,
        start:        new Date(convertee.start),
        end:          new Date(convertee.end),
        title:        convertee.title,
        description:  convertee.description,
        creatorEmail: convertee.creatorEmail,
        color:        "",
        type:         ""
    }
}