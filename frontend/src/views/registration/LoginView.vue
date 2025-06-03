<script setup>
import { login } from "../../core/repositories/registrationRepository.js";
import { user } from "../../core/repositories/homeRepository.js";
import { useCssModule, watch } from "vue";
import router from '../../router/index.js';
import { isEmpty } from "../../utils/checks.js";
import {ref} from "vue";
import RegistrationInputField from "@/components/input_fields/RegistrationInputField.vue";
import CheckboxWText from "@/components/buttons/CheckboxWText.vue";
import RegistrationSubmitButtons from "@/components/combinations/RegistrationSubmitButtons.vue";

let rEmail = ref('')
let rPassword = ref('') 
const s = useCssModule()

watch(user, (newValue) => {
    if (!isEmpty(newValue)) {
        console.log('Sent to main');
        
        router.push('/')
    }
    },
    {
        immediate: true
    }
)
</script>

<template>
<div :class="s.view">
    <form @submit.prevent="login(rEmail, rPassword)" :class="s.container">
        <img :class="s.logo" src="@/assets/images/BeeLogo.png" alt="logo">
        <h1 :class="s.title">HoneyBee</h1>
        <RegistrationInputField v-model="rEmail" hint="E-mail" type="email"/>
        <RegistrationInputField v-model="rPassword" hint="Password" type="password"/>
        <CheckboxWText text="Remember me!"/>
        <RegistrationSubmitButtons 
            submit-text="Login"
            leftText="Forgot Password!"
            left-link="/recovery"
            right-text="Create an account"
            right-link="/signup"
        />
    </form>
</div>
</template>

<style module lang="sass">
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
</style>