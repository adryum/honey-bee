import { String_to_HiveType, String_to_NoteTypes, String_to_Role } from "./DatabaseEnums";
import type { ApiaryAccessGetModel, ApiaryGetModel, ApiaryHistoryGetModel, CalendarEventGetModel, HiveAccessGetModel, HiveGetModel, HiveHistoryGetModel, HiveYieldGetModel, InspectionCreateRequestModel, InspectionEntryGetModel, InspectionReviewGetModel, NoteGetModel, QueenGetModel, SpeciesGetModel, UserEntryGetModel, UserProfileResponseModel, WhitelistEntryGetModel } from "./api/Models";
import type { ApiaryModelDB, QueenModelDB, CalendarEventDB, HistoryEntryDB, HiveModelDB, InspectionDB, InspectionFormDB, InspectionFormUI, InspectionEntryModelDB, NoteModelDB, UserEntryModelDB, UserModelDB, WhitelistEntryModelDB, SpeciesModelDB, LineGraphLineModel } from "./stores/Models";
import { getAge } from "./utils/Utils";

export function ApiaryCreateResponse_to_ApiaryModelDB(
    convertee: ApiaryGetModel
): ApiaryModelDB {
    return {
        id:           convertee.id,
        name:         convertee.name,
        description:  convertee.description,
        image:        convertee.image,
        creationDate: new Date(convertee.creationTimestamp),
        location:     convertee.location,
        hiveCount:    convertee.hiveCount
    }
}

export function HiveCreateResponse_to_HiveModelDB(
    convertee: HiveGetModel
): HiveModelDB {
    return {
        id:                    convertee.id,
        name:                  convertee.name,
        description:           convertee.description,
        imageUrl:              convertee.imageUrl,
        location:              convertee.location,
        type:                  String_to_HiveType(convertee.type),
        apiaryId:              convertee.apiaryId,
        calendarId:            convertee.calendarId,
        creationTimestampDate: new Date(convertee.creationTimestamp),
        user:                  convertee.user,
    }
}

export function NoteCreateModelResponse_to_NoteModelDB(
    convertee: NoteGetModel
): NoteModelDB {
    return {
        id:           convertee.id,
        title:        convertee.title,
        content:      convertee.content,
        type:         String_to_NoteTypes(convertee.type),
        userId:       convertee.userId,
        hiveId:       convertee.hiveId,
        creationDate: convertee.creationTimestamp
    }
}

export function WhitelistEntryResponseModel_To_WhitelistEntryDB(
    convertee: WhitelistEntryGetModel
): WhitelistEntryModelDB {
    return {
        id:           convertee.id,
        email:        convertee.email,
        role:         String_to_Role(convertee.role),
        isRegistered: !!convertee.userId,
        isEnabled:    convertee.status
    } 
}

export function UserEntryGetModel_To_UserEntryModelDB(
    convertee: UserEntryGetModel
): UserEntryModelDB {
    return {
        id:            convertee.id,
        email:         convertee.email,
        role:          convertee.role,
        isWhitelisted: !!convertee.whitelistStatus
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
    convertee: ApiaryAccessGetModel
) {
    return convertee.apiaryId
}

export function HiveAccessResponseModel_To_Number(
    convertee: HiveAccessGetModel
) {
    return convertee.hiveId
}

export function InspectionReviewResponseModel_To_InspectionFormDB(
    convertee: InspectionReviewGetModel
): InspectionDB {
    return {
        id:               convertee.id,
        apiaryId:         convertee.apiaryId,
        apiaryName:       convertee.apiary?.name || 'Unknown Apiary',
        userIdCreator:    convertee.userIdCreator,
        userPicture:      convertee.user?.image || '',
        username:         convertee.user?.username || 'Unknown User',
        creationDate:     new Date(convertee.creationTimestamp),
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

export function InspectionEntryGetModel_To_InspectionTableEntryModel(
    convertee: InspectionEntryGetModel
): InspectionEntryModelDB {
    console.log('converting:', convertee.id, 'user:', convertee.user, 'apiary:', convertee.apiary)
    return {
        id:                convertee.id,
        formCount:         convertee.formCount,
        processed:         convertee.processed,
        createdAt: new Date(convertee.creationTimestamp),
        user: convertee.user ? {
            id:       convertee.user.id,
            image:    convertee.user.image,
            username: convertee.user.username
        }: undefined,
        apiary: convertee.apiary ? {
            id:   convertee.apiary.id,
            name: convertee.apiary.name
        } : undefined
    }
}

export function HiveHistoryGetModel_To_HistoryEntryDB(
    convertee: HiveHistoryGetModel
): HistoryEntryDB {
    return {
        id:           convertee.id,
        text:         convertee.text,
        type:         convertee.historyActionType.type,
        userId:       convertee.user?.id || -1,
        username:     convertee.user?.username || 'Deleted User',
        userImage:    convertee.user?.image || '',
        creationDate: convertee.creationTimestamp,
    }
}

export function ApiaryHistoryGetModel_To_HistoryEntryDB(
    convertee: ApiaryHistoryGetModel
): HistoryEntryDB {
    return {
        id:           convertee.id,
        text:         convertee.text,
        type:         convertee.historyActionType.type,
        userId:       convertee.user?.id || -1,
        username:     convertee.user?.username || 'Deleted User',
        userImage:    convertee.user?.image || '',
        creationDate: convertee.creationTimestamp,
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

export function QueenGetModel_To_QueenModelDB(
    convertee: QueenGetModel
): QueenModelDB {
    console.log(JSON.stringify(convertee, null, 2))
    const age = getAge(convertee.bornDate, new Date().toString())
    return {
        id: convertee.id,
        species:  {
            id:             convertee.species.id,
            lifeExpectancy: convertee.species.lifeExpectancy,
            scientificName: convertee.species.scientificName,
        },
        age:             age,
        imageUrl:        convertee.imageUrl,
        bornDate:        new Date(convertee.bornDate),
        addedToHiveDate: new Date(convertee.addedToHiveDate)
    }
}

export function SpeciesGetModel_To_SpeciesModelDB(
    convertee: SpeciesGetModel
): SpeciesModelDB {
    return {
        id:             convertee.id,
        scientificName: convertee.scientificName,
        knownAsName:    convertee.knownAsName,
        lifeExpectancy: convertee.lifeExpectancy,
        description:    convertee.description,
        behavior:       convertee.behavior,
        preferences:    convertee.preferences
    }    
}


export function HiveYieldGetModels_To_LineGraphLineModels(
    convertee: HiveYieldGetModel[]
): LineGraphLineModel[] {
    return [...convertee.groupBy(item => item.hive.id).entries()].map(([_, items]) => {
        const first = items[0];
        return {
            id:    first.hive.id,
            name:  first.hive.name,
            color: '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16).padStart(6, '0'),
            data:  items.map(item => ({
                value:     item.amount,
                timestamp: item.createdAt
            }))
        };
    });
}