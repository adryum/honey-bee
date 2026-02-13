export enum Role {
    ADMINISTRATOR     = "ADMINISTRATOR",
    APIARY_MAINTAINER = "APIARY_MAINTAINER",
    MANAGEMENT        = "MANAGEMENT",
    HIVE_WORKER       = "HIVE_WORKER",
    NOT_A_ROLE        = "NOT_A_ROLE"
}

export function String_to_Role(convertee: string) {
    switch (convertee.toUpperCase()) {
        case Role.ADMINISTRATOR: return Role.ADMINISTRATOR 
        case Role.APIARY_MAINTAINER: return Role.APIARY_MAINTAINER
        case Role.MANAGEMENT: return Role.MANAGEMENT
        case Role.HIVE_WORKER: return Role.HIVE_WORKER
        default:
            console.error("Failed to convert ROLE: ", convertee);
            return Role.NOT_A_ROLE
    }
}

export enum NoteTypes {
    WARNING       = "WARNING",
    INFORMATIONAL = "INFORMATIONAL",
    NOT_A_TYPE    = "NOT_A_TYPE"
}

export function String_to_NoteTypes(convertee: string) {
    switch (convertee.toUpperCase()) {
        case NoteTypes.WARNING: return NoteTypes.WARNING 
        case NoteTypes.INFORMATIONAL: return NoteTypes.INFORMATIONAL
        default:
            console.error("Failed to convert HiveType: ", convertee);
            return NoteTypes.NOT_A_TYPE
    }
}

export enum HiveType {
    STATIONARY = "STATIONARY",
    MOVABLE    = "MOVABLE",
    NOT_A_TYPE = "NOT_A_TYPE"
}

export function String_to_HiveType(convertee: string) {
    switch (convertee.toUpperCase()) {
        case HiveType.MOVABLE: return HiveType.MOVABLE 
        case HiveType.STATIONARY: return HiveType.STATIONARY
        default:
            console.error("Failed to convert HiveType: ", convertee);
            return HiveType.NOT_A_TYPE
    }
}