export enum Role {
    ADMIN,
    WORKER
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