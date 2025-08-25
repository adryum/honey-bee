<script setup lang="ts">
import {computed, onMounted, ref, useCssModule} from "vue";
import RegistrationInputField from "@/components/input/fields/RegistrationInputField.vue";
import CheckboxWText from "@/components/input/fields/CheckboxWText.vue";
import RegistrationButton from "@/components/input/buttons/RegistrationButton.vue";
import FaintButton from "@/components/input/buttons/FaintButton.vue";
import { RegistrationRepository } from "../../core/repositories/RegistrationRepository";

const s = useCssModule()
const username = ref("")
const email = ref("")
const password = ref("")
const repeatPassword = ref("")
const hasAgreedToTerms = ref(false)
const hasAgreedToSpam = ref(false)

async function signUp() {
    if (!isEverythingValid.value) return 

    await RegistrationRepository.signUp({
        username: username.value,
        email: email.value,
        password: password.value,
    })
}

const isEverythingValid = computed(() => {
    return email.value 
    && password.value 
    && username.value 
    && hasAgreedToTerms.value 
    && password.value === repeatPassword.value
})
</script>

<template>
<div :class="s.view">
    <form @submit.prevent="signUp" :class="s.container">
        <img :class="s.logo" src="@/assets/images/BeeLogo.png" alt="logo">
        <h1 :class="s.title">HoneyBee</h1>
        <RegistrationInputField
            v-model="username" 
            hint="Username" type="text" :is-required="true"/>
        <RegistrationInputField v-model="email"
            hint="E-mail" type="email" :is-required="true"/>
        <RegistrationInputField :at-least-one-uppercase="true" :min-length="6" v-model="password"
            hint="Password" type="password" :is-required="true"/>
        <RegistrationInputField v-model="repeatPassword" hint="Repeat Password" type="password" :is-required="true"/>
        <CheckboxWText v-model="hasAgreedToSpam" text="Agree to receive spam" :isRequired="true"/>
        <CheckboxWText v-model="hasAgreedToTerms" text="Agree to Terms of Service" :isRequired="true"/>
        <CheckboxWText text="Remember me!"/>
        <div :class='s.container_bottom'>
            <RegistrationButton :is-enabled="isEverythingValid" type="submit" :class="s.submit" text="Sign up"/>
            <FaintButton @click="$router.push('/recovery')" :class="s.left" text="Forgot Password!"/>
            <FaintButton @click="$router.push('/login')" :class="s.right" text="Log in"/>
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