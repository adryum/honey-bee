<script setup lang="ts">
import { computed, onMounted, useCssModule } from "vue";
import {ref} from "vue";
import RegistrationInputField from "@/components/input/fields/RegistrationInputField.vue";
import CheckboxWText from "@/components/input/fields/CheckboxWText.vue";
import RegistrationButton from "@/components/input/buttons/RegistrationButton.vue";
import FaintButton from "@/components/input/buttons/FaintButton.vue";
import { RegistrationRepository } from "../../core/repositories/RegistrationRepository.js";

const s = useCssModule()
const email = ref('')
const password = ref('') 
const rememberMe = ref(false) 

const isEverythingValid = computed(() => {
    return email.value && password.value
})

async function login() {
    if (!isEverythingValid.value) return

    await RegistrationRepository.login({
        email: email.value,
        password: password.value
    })
}

// auto login
onMounted(async () => {
    await RegistrationRepository.login({
        email: 'admin@gmail.com',
        password: 'Admin1'
    })
})
</script>

<template>
<div :class="s.view">
    <form @submit.prevent="login" :class="s.container">
        <img :class="s.logo" src="@/assets/images/BeeLogo.png" alt="logo">
        <h1 :class="s.title">HoneyBee</h1>
        <RegistrationInputField v-model="email"
            hint="E-mail" type="email" :is-required="true"/>
        <RegistrationInputField v-model="password"
            hint="Password" type="password" :is-required="true"/>
        <CheckboxWText v-model="rememberMe" text="Remember me!"/>
        <div :class='s.container_bottom'>
            <RegistrationButton  :is-enabled="isEverythingValid" type="submit" :class="s.submit" text="Login"/>
            <FaintButton @click="$router.push('/recovery')" :class="s.left" text="Forgot Password!"/>
            <FaintButton @click="$router.push('/signup')" :class="s.right" text="Create an account"/>
        </div>
    </form>
</div>
</template>

<style module lang="sass">
.container_bottom
    display: grid
    grid-template-areas: 'button button' 'left right'
    grid-template-rows: 1fr 1.5rem
    grid-auto-columns: 1fr 1fr
    gap: .6rem

    .submit
        grid-area: button
    .left
        grid-area: left
    .right
        grid-area: right
.logo
    position: absolute
    top: -6.5rem
    left: -7rem
    rotate: -2deg
    height: 18rem

.title
    all: unset
    font-size: 45px
    letter-spacing: 1px
    margin: 0 0 .5rem 0
    align-self: center
    color: #2D1E02
    
.view
    display: flex
    width: 100%
    height: 100vh
    align-items: center
    justify-content: center

.container
    width: 27rem

    position: relative
    display: flex
    flex-direction: column
    gap: 1rem

    box-sizing: border-box
    border-bottom: 2px solid #B9A554
    padding: 1rem 2.5rem
    border-radius: 8px
    box-shadow: 0 0 10px rgba(0, 0, 0, .2)

    background: white

@media (max-width: 600px) 
    .container
        padding: 1rem 1rem
        margin: 0 2rem

    .logo
        display: none

</style>