import { ref, watch, onBeforeUnmount, type Ref, type ShallowRef, shallowRef, computed } from "vue";
import { io, type Socket } from 'socket.io-client'
import type {  UserModelDB } from "../stores/Models";
import { useAuthStore } from "../stores/useAuthStore";

export enum ClientEvents {
    REFRESH_PAGE    = "REFRESH_PAGE",
    LOGOUT          = "LOGOUT",
    SESSION_EXPIRED = "SESSION_EXPIRED"
}

export type SocketModel = {
    socket:    ShallowRef<Socket | undefined>
    connected: Ref<boolean>
}

export function startSocket(user: Ref<UserModelDB | undefined>) {
    const userId = computed(() => user.value?.id.toString() ?? undefined)
    return useSocket(userId)
}

export function useSocket(
    userId: Ref<string | undefined>
): SocketModel {
    const socket    = shallowRef<Socket | undefined>(undefined);
    const connected = ref(false);
    const { logout } = useAuthStore()

    // Watch the userId. Whenever it changes, reconnect.
    watch(userId, (newId) => {
        // 1. Clean up the old connection
        if (socket.value) {
            socket.value.disconnect();
        }

        if (!newId) return;
        
        // 2. Establish new connection
        socket.value = io(import.meta.env.VITE_API, { 
            path: "/api/socket.io",
            withCredentials: true,
            transports: ["websocket"] // Force WebSocket for better performance
        });

        socket.value.on("connect", () => {
            console.log("Connected to socket:", socket.value?.id);
            connected.value = true;
            socket.value?.emit("register", newId);
        });

        socket.value.on("disconnect", (reason) => {
            console.log("Disconnected:", reason);
            connected.value = false;
        });

        socket.value.on(ClientEvents.REFRESH_PAGE, () => window.location.reload());
        
        socket.value.on(ClientEvents.LOGOUT, () => {
            console.warn("Event: LOGOUT");
            alert("Session expired.");
            logout()
        });

        socket.value.on(ClientEvents.SESSION_EXPIRED, () => {
            console.warn("Event: SESSION_EXPIRED");
            
            alert("Session expired.");
            logout()
        });
    }, { immediate: true });

    onBeforeUnmount(() => {
        socket.value?.disconnect();
    });

    return { 
        socket: socket, 
        connected: connected 
    };
}


