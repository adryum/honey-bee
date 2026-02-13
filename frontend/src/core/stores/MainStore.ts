import { defineStore } from "pinia";
import { useApiaryStore } from "./ApiaryStore";
import { useAuthenticationApiStore } from "../network/AuthenticationApiStore";
import { ref } from "vue";
import type { UserProfileModel } from "./Models";
import router, { RouterViewPaths } from "../router";
import { ActionNotification, useActionsStore } from "./ActionStore";
import { useHiveStore } from "./HiveStore";
import { useNoteStore } from "./NoteStore";

export const useMainStore = defineStore("MainStore", () => {
    const apiaryStore = useApiaryStore()
    const hiveStore = useHiveStore()
    const noteStore = useNoteStore()
    const actionStore = useActionsStore()
    const authenticationApiStore = useAuthenticationApiStore()

    const user = ref<UserProfileModel | undefined>(undefined)

    async function initialize() {
        await apiaryStore.initialize()
        await hiveStore.initialize()
        await noteStore.initialize()

        apiaryStore.countHivesInApiaries()

        console.log("Main store initialized!");
    }

    async function authenticateUser() {
        console.log("Authenticating...");
        const response = await authenticationApiStore.getProfileInfo()

        if (response) {
            console.log("Authenticated!");

            user.value = response
            console.log("user: ", user.value);
            await onAuthentication()

            router.push(RouterViewPaths.Home)
        } else {
            actionStore.addAction(ActionNotification.DevFailedToGetUserInfo)
        }
    }

    async function onAuthentication() {
        await initialize()

        // const createdInvoices = await invoiceApiStore.getInvoices()
        // if (createdInvoices) {
        //     invoices.value = createdInvoices
        // }

        // const projectNames = await invoiceApiStore.getProjectInfo()
        // if (projectNames) {
        //     projects.value = ProjectInfoModel_To_stringArray(projectNames)
        //     console.log("proj names: ", projects.value);
        // }

        // const pms = await userAPIStore.getProjectManagers()
        // if (pms) {
        //     projectManagers.value = pms
        // }

        // const evtSource = new EventSource(import.meta.env.VITE_API + "/events", {withCredentials: true});

        // console.log("SETTING UP EVENT LISTENERS");

        // evtSource.addEventListener(ClientEvents.REFRESH_PAGE, () => {
        //     window.location.reload();
        //     console.log("====== RELOADED ======");
        // });

        // evtSource.addEventListener(ClientEvents.LOGOUT, async () => {
        //     await logout();
        //     console.log("====== LOGGED OUT ======");
        // });
    }

    return {
        user,
        initialize,
        authenticateUser
    }
})