export interface ICreateApiaryRequestModel {
    identification: number
    name: string, 
    location: string, 
    description: string, 
    imagePath: string,
}

export interface IGetApiaryRequestModel {
    identification: number
    apiaryId: number
}

export interface IGetApiariesRequestModel {
    identification: number
    apiaryNameStartingSymbols: string
}

export interface IDeleteApiaryRequestModel {
    identification: number
    apiaryId: number
}

export interface IGetApiaryHivesRequestModel {
    identification: number
    apiaryId: number
    hiveNameStartingSymbols: string
}


// hives
export interface ICreateHiveRequestModel {
    identification: number
    name: string, 
    location: string, 
    description: string,
    imagePath: string,
    type: string, 
}

export interface IAssignHiveRequestModel {
    identification: number
    hiveId: number 
    apiaryId: number 
}

export interface IUnAssignHiveRequestModel {
    identification: number
    hiveId: number
}

export interface IGetHiveOverviewRequestModel {
    identification: number
    hiveId: number
}

// user
export interface IUserUpdateRequestModel {
    identification: number
    username: string
    email: string
    password: string
    picturePath: string
}

export interface IUserDeleteRequestModel {
    identification: number
    userId: number
}

export interface IUserLoginRequestModel {
    email: string
    password: string
}

export interface IUserSignUpRequestModel {
    username: string
    email: string
    password: string
    picturePath: string
}



