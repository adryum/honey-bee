<script setup>
import { onMounted, useCssModule, ref } from 'vue';
import ProfileIcon from '../ProfileIcon.vue';
import RegistrationInputField from '../input_fields/RegistrationInputField.vue';
import RegistrationButton from '../buttons/RegistrationButton.vue';
import TagContentBox from '../TagContentBox.vue';
import { updateUserData, rUser } from '@/core/repositories/homeRepository';
import VerticalTextArea from '../hive/widgets/stimulant/VerticalTextArea.vue';
import HorizontalTextArea from '../hive/widgets/stimulant/HorizontalTextArea.vue';
import CircleImage from '../CircleImage.vue';

const props = defineProps({
    
})
const rUsername = ref("")
const rName = ref("")
const rSurname = ref("")
const rEmail = ref("")
const rPassword = ref("")
const rProfilePicture = ref("")

// export const user = ref(
// {
//     account_code: "#2",
//     e_mail: "em@gmail.com",
//     name: "Emīls",
//     password: "emils",
//     profile_picture: null,
//     role: "Admin",
//     surname: "Griņečovs"
// })

function compressToUser() {
    return {
        account_code: "#2",
        username: rSurname.value,
        name: rName.value,
        surname: rSurname.value,
        profile_picture: rProfilePicture.value,
        e_mail: rEmail.value,
        password: rPassword.value,
        role: "Admin",
    }
}

const s = useCssModule()
onMounted(() => {
    rUsername.value = rUser.value.username
    rName.value = rUser.value.name
    rSurname.value = rUser.value.surname
    rEmail.value = rUser.value['e_mail']
    rPassword.value = rUser.value.password
})
</script>

<template>
<div :class='s.container'>
    <h1>User Profile</h1>
    <form @submit.prevent="updateUserData(rUser.account_code, compressToUser())" :class="s.content">
        <div :class="s.left">
            <CircleImage :class="s.icon" :res="rProfilePicture"/>
            <HorizontalTextArea :class="s.role" title="Role" :content="rUser.role"/>
        </div>
        <div :class="s.right">
            <RegistrationInputField v-model="rUsername" hint="Username" type="text" :is-required="true"/>
            <RegistrationInputField v-model="rName" hint="Name" type="text" :is-required="true"/>
            <RegistrationInputField v-model="rSurname" hint="Surname" type="text" :is-required="true"/>
            <RegistrationInputField v-model="rEmail" hint="E-mail" type="email" :is-required="true"/>
            <RegistrationInputField v-model="rPassword" hint="Password" type="password" :is-required="true"/>
            <RegistrationButton text="Save changes"/>
        </div>
    </form>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    flex-direction: column
    align-items: center

    width: 40rem

    background: white
    border-radius: 4px
    box-shadow: 0 0 10px rgba(0, 0, 0, .2)

    .content
        display: flex
        gap: 1rem
        width: 100%

        box-sizing: border-box
        padding: 1rem
        .left
            flex: 1
            display: flex
            flex-direction: column
            gap: 1rem

            .icon
                flex: 1

            .role
                height: 3rem
           
        .right
            display: flex
            flex-direction: column
            gap: 1rem
            flex: 1


</style>