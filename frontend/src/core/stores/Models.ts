import type { HistoryActionType, HiveType, NoteTypes, Role } from "../DatabaseEnums"

export type ApiaryModelDB = {
    id:           number
    name:         string
    description:  string
    image:        string
    location:     string
    creationDate: Date
    hiveCount:    number
}

export type HiveModelDB = {
    id:           number
    name:         string
    imageUrl:     string
    location:     string
    type:         HiveType
    description:  string
    apiaryId:     number
    creationTimestampDate: Date
    calendarId:   string
    user: {
        id:       number
        username: string
        imageUrl: string
    } | undefined
}

export type HiveCreateModel = {
    name:         string
    description?: string
    type:         HiveType
    image?:       File
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

export type HistoryEntryDB = {
    id:           number 
    text:         string 
    type:         HistoryActionType
    userId:       number 
    username:     string 
    userImage:    string 
    creationDate: string 
}

export type CalendarEventDB = {
    calendarId:   string
    eventId:      string
    start:        Date
    end:          Date
    title:        string
    description:  string
    creatorEmail: string
    color:        string
    type:         string
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

export type UserModelDB = {
    id:       number
    role:     Role
    email:    string
    username: string
    picture:  string
}

export type InspectionFormUI = {
    id?:                          number;
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
    needMoreHoneyFramesAmount:    number;
    needMoreBreedingFramesAmount: number;
    takenHoneyFrames:             number;
    takenBreedingFrames:          number;
    isSubmited:                   boolean;
    hasMadeChanges:               boolean;
}

export type InspectionDB = {
    id:               number
    apiaryId:         number
    apiaryName:       string
    userIdCreator:    number
    userPicture:      string
    username:         string
    creationDate:     Date
    forms:            InspectionFormDB[]
    hasBeenProcessed: boolean
}

export type InspectionFormDB = {
    id:                           number;
    hiveId:                       number;
    hiveName:                     string;
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
    needMoreHoneyFramesAmount:    number;
    needMoreBreedingFramesAmount: number;
    takenHoneyFrames:             number;
    takenBreedingFrames:          number;
}

export type InspectionEntryModelDB = {
    id:        number
    formCount: number
    processed: boolean
    createdAt: Date
    user:      {
        id:       number
        image:    string
        username: string
    } | undefined
    apiary: {
        id:   number
        name: string
    } | undefined
}

export type QueenHistoryModelDB = {
    id:           number
    species:      string
    placedHereAt: string
    timeInHive:   string
} 

export type QueenModelDB = {
    id:              number
    species:         {
        id:             number
        scientificName: string
        lifeExpectancy: string
    }
    addedToHiveDate: Date
    age:             string
    imageUrl:        string
    bornDate:        Date
} 

export type MoreAboutSpeciesModel = {
    species:     string
    description: string
    behavior:    string
    preferences: string
}

export type SpeciesModelDB = {
    id:             number
    scientificName: string
    knownAsName:    string
    lifeExpectancy: string
    description:    string
    behavior:       string
    preferences:    string
}

export type LineGraphLineModel = {
    id:    number,
    name:  string
    color: string
    data:  {
        value:     number
        timestamp: string
    }[]
}

export type DateRange = {
    fromISO: string
    toISO:   string
}