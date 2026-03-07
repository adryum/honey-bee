import { Server as SocketIOServer, Socket } from "socket.io";
import { type Server as HttpServer } from "http";

export enum ClientEvents {
    REFRESH_PAGE    = "REFRESH_PAGE",
    LOGOUT          = "LOGOUT",
    SESSION_EXPIRED = "SESSION_EXPIRED"
}

export let io: SocketIOServer

export function initializeSocket(server: HttpServer) {
    io = new SocketIOServer(server, {
        path:        "/api/socket.io",
        cors: {
            origin:      process.env.WEBSITEORIGIN,
            methods:     ["GET", "POST"],
            credentials: true
        },
    });

    // Rooms will be "user<userId>" for multi-device support
    io.on("connection", (socket: Socket) => {
        console.log("New socket connected:", socket.id);

        socket.on("register", (userId: string) => {
            socket.join(getUserRoom(userId));
            console.log(`Socket ${socket.id} joined room ${getUserRoom(userId)}`);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected:", socket.id);
            // Socket.IO automatically removes socket from all rooms
        });
    });
}

export function getUserRoom(userId: string | number) {
    return `user_${userId}`
}