export enum UserRoles {
    ADMINISTRATOR     = "ADMINISTRATOR",
    APIARY_MAINTAINER = "APIARY_MAINTAINER",
    MANAGEMENT        = "MANAGEMENT",
    HIVE_WORKER       = "HIVE_WORKER",
    NOT_A_ROLE        = "NOT_A_ROLE",
    ANY               = "ANY"
}

export function String_to_Role(convertee: string) {
    switch (convertee.toUpperCase()) {
        case UserRoles.ADMINISTRATOR: return UserRoles.ADMINISTRATOR 
        case UserRoles.APIARY_MAINTAINER: return UserRoles.APIARY_MAINTAINER
        case UserRoles.MANAGEMENT: return UserRoles.MANAGEMENT
        case UserRoles.HIVE_WORKER: return UserRoles.HIVE_WORKER
        default:
            console.error("Failed to convert ROLE: ", convertee);
            return UserRoles.NOT_A_ROLE
    }
}

export function Role_to_GoogleCalendarRole(role: UserRoles): string {
    switch (role) {
        case UserRoles.ADMINISTRATOR: return 'writer'
        case UserRoles.APIARY_MAINTAINER: return  'writer'
        case UserRoles.MANAGEMENT: return 'reader'
        case UserRoles.HIVE_WORKER: return 'reader'
        default:
            console.error("Failed to convert ROLE: ", role);
            return ""
    }
}

export enum NoteTypes {
    WARNING       = "WARNING",
    INFORMATIONAL = "INFORMATIONAL"
}

export enum HiveType {
    STATIONARY = "STATIONARY",
    MOVABLE    = "MOVABLE",
    NOT_A_TYPE = "NOT_A_TYPE"
}

export enum HistoryActionType {
    CALENDAR   = "CALENDAR",
    EDIT       = "EDIT",
    NOTE       = "NOTE",
    INSPECTION = "INSPECTION",
    QUEEN      = "QUEEN",
}