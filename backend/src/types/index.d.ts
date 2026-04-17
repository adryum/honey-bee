import "express-session";

// here you can change how COOKIE will look - what properties will it h
declare module "express-session" {
    interface SessionData {
        userId: number
    }
}

