// for unfutunat souls User<T> T is table

export enum NoteT {
    tableName = "notes",
    id = "id",

    title = "title",
    content = "content",
    creationDate = "creation_date",
    type = "type",
    userId = "user_id"
}

export enum NotePlaceT {
    tableName = "note_place",
    id = "id",

    noteId = "note_id",
    queenBeeId = "queen_bee_id",
    hiveId = "hive_id",
    apiaryId = "apiary_id",
    inventoryId = "inventory_id"
}

export enum UserT {
    tableName = "users",
    id = "id",

    username = "username",
    picturePath = "profile_picture",
    email = "e_mail",
    password = "password",
    paidTier = "paid_tier",
    role = "role"
}

export enum HiveT {
    tableName = "hives",
    id = "id",

    name = "name",
    imagePath = "image_path",
    location = "location",
    type = "type",
    weight = "weight",
    frames = "frames",
    description = "description",

    queenBeeId = "queen_bee_id",
    apiaryId = "apiary_id",
    userId = "user_id"
}


export enum ApiaryT {
    tableName = "apiaries",
    id = "id",

    name = "name",
    imagePath = "image_path",
    location = "location",
    description = "description",

    userId = "user_id"
}