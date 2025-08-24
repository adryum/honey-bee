export interface IGetApiaryResponseModel {
    id: number
    name: string
    description: string
    imagePath: string
    hiveCount: number
}

export interface IGetApiariesResponseModel {
    apiaries: IGetApiaryResponseModel[]
}

export interface IGetApiaryHivesResponseModel {
    hives: IGetHiveResponseModel[]
}



// hive
export interface IGetHiveResponseModel {
    id: number
    name: string
    imagePath: string
}

export interface IGetHiveOverviewResponseModel {
    id: number
    name: string
    description: string
    location: string
    imagePath: string
}

export interface IUserUpdateResponseModel {
    username: string
    email: string
    password: string
    picturePath: string
}

export interface IUserRegistrationResponseModel {
    identification: number
    username: string
    email: string
    password: string
    picturePath: string
}

