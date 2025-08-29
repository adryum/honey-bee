interface BaseRequirements {
    getResource(): string
}

export class PublicIdBuilder implements BaseRequirements {
    userId: string
    
    constructor(userId: string) {
        this.userId = userId
    }

    Hive(id: string) {
        return new Hive(this, id);
    }

    Apiary(id: string) {
        return new Apiary(this, id);
    }

    Bee(id: string) {
        return new Bee(this, id);
    }

    getResource(): string {
        return "User:" + this.userId
    }
}

class Hive implements BaseRequirements {
    parent: PublicIdBuilder
    hiveId: string
    
    constructor(parent: PublicIdBuilder, hiveId: string) {
        this.parent = parent
        this.hiveId = hiveId
    }

    getResource(): string {
        var parentRes = this.parent.getResource()
        if (!parentRes.endsWith("_"))
            parentRes += "_"

        return parentRes + "Hive:" + this.hiveId
    }
}

class Apiary implements BaseRequirements {
    parent: PublicIdBuilder
    apiaryId: string
    
    constructor(parent: PublicIdBuilder, apiaryId: string) {
        this.parent = parent
        this.apiaryId = apiaryId
    }

    getResource(): string {
        var parentRes = this.parent.getResource()
        if (!parentRes.endsWith("_"))
            parentRes += "_"

        return parentRes + "Apiary:" + this.apiaryId
    }
}

class Bee implements BaseRequirements {
    parent: PublicIdBuilder
    beeId: string
    
    constructor(parent: PublicIdBuilder, beeId: string) {
        this.parent = parent
        this.beeId = beeId
    }

    getResource(): string {
        var parentRes = this.parent.getResource()
        if (!parentRes.endsWith("_"))
            parentRes += "_"

        return parentRes + "Bee:" + this.beeId
    }
}


