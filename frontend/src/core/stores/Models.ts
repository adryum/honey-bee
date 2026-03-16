import type { HiveType, NoteTypes, Role } from "../DatabaseEnums"

export type ApiaryModelDB = {
    id:          number
    name:        string
    description: string
    image:       string
    hiveCount:   number
}

export type HiveModelDB = {
    id:           number
    name:         string
    description:  string
    image:        string
    location:     string
    type:         HiveType
    apiaryId:     number
    creationDate: string
    creatorId:    number
    creatorName:  string
    creatorImage: string
    history:      HiveHistoryEntryDB[]
    calendarId:   string
    calendarEvents: CalendarEventDB[]
}

export type HiveCreateModel = {
    name:         string
    description?: string
    type:         HiveType
    image?:       File
}

export type UserProfileModel = {
    id:       number
    username: string
    picture:  string
    email:    string
    role:     Role
}

export type NoteModelDB = {
    id:           number
    title:        string
    content:      string
    type:         NoteTypes
    userId:       number
    hiveId:       number
    creationDate: string
}

export type HiveHistoryEntryDB = {
    id:           number 
    text:         string 
    userId:       number 
    username:     string 
    userImage:    string 
    creationDate: string 
}

export type CalendarEventDB = {
    id:          string
    start:       Date
    end:         Date
    title:       string
    description: string
    color:       string
    type:        string
}

export type CalendarDayModel = {
    date:   Date
    events: CalendarEventDB[]
}

export type WhitelistEntryModelDB = {
    id:           number
    email:        string
    role:         Role
    isEnabled:    boolean
    isRegistered: boolean
}

export type UserEntryModelDB = {
    id:            number
    email:         string
    role:          Role
    isWhitelisted: boolean
}

export type UserProfileModelDB = {
    id:       number
    role:     Role
    email:    string
    username: string
}

export type InspectionFormUI = {
    id:                           number;
    hiveId:                       number;
    isAbnormalBehavior:           boolean;
    isSwarming:                   boolean;
    needAdditionalFeeding:        boolean;
    isQueenAlive:                 boolean;
    isQueenLayingEggs:            boolean;
    isQueenLayingEggsIncorrectly: boolean;
    needMoreHoneyFrames:          boolean;
    needMoreBreedingFrames:       boolean;
    needMedicalAttention:         boolean;
    hasHiveDamage:                boolean;
    isTakingOutFrames:            boolean;
    abnormalBehaviorDescription:  string;
    medicalAttentionDescription:  string;
    hiveDamageDescription:        string;
    neededHoneyFrames:            number;
    neededBreedingFrames:         number;
    takenHoneyFrames:             number;
    takenBreedingFrames:          number;
    isSubmited:                     boolean;
    hasMadeChanges:                  boolean;
}

export type InspectionFormDB = {
    id:                           number;
    hiveId:                       number;
    isAbnormalBehavior:           boolean;
    isSwarming:                   boolean;
    needAdditionalFeeding:        boolean;
    isQueenAlive:                 boolean;
    isQueenLayingEggs:            boolean;
    isQueenLayingEggsIncorrectly: boolean;
    needMoreHoneyFrames:          boolean;
    needMoreBreedingFrames:       boolean;
    needMedicalAttention:         boolean;
    hasHiveDamage:                boolean;
    isTakingOutFrames:            boolean;
    abnormalBehaviorDescription:  string;
    medicalAttentionDescription:  string;
    hiveDamageDescription:        string;
    neededHoneyFrames:            number;
    neededBreedingFrames:         number;
    takenHoneyFrames:             number;
    takenBreedingFrames:          number;
}