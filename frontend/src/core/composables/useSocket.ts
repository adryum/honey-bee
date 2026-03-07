import { ref, watch, onBeforeUnmount, type Ref } from "vue";
import { io, type Socket } from "socket.io-client";
import { useMainStore } from "../stores/MainStore";

export enum ClientEvents {
    REFRESH_PAGE    = "REFRESH_PAGE",
    LOGOUT          = "LOGOUT",
    SESSION_EXPIRED = "SESSION_EXPIRED"
}

export function useSocket(userId: Ref<string | undefined>) {
    const socket = ref<Socket | null>(null);
    const connected = ref(false);
    const mainStore = useMainStore()

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
            mainStore.logout()
        });

        socket.value.on(ClientEvents.SESSION_EXPIRED, () => {
            console.warn("Event: SESSION_EXPIRED");
            
            alert("Session expired.");
            mainStore.logout()
        });
    }, { immediate: true });

    onBeforeUnmount(() => {
        socket.value?.disconnect();
    });

    return { socket, connected };
}
