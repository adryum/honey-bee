import axios from 'axios'
import { ref } from 'vue'

export const user = ref({
    account_code: "#2",
    e_mail: "em@gmail.com",
    name: "Emīls",
    password: "emils",
    profile_picture: null,
    role: "Admin",
    surename: "Griņečovs"
})

export async function getHives(accountCode) {
    try {
        console.log(`em: ${email} pass: ${password}`)

    } catch (error) {
        console.error(error);
    }
}