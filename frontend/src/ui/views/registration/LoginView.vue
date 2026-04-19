<script setup lang="ts">
import { computed, onMounted, useCssModule } from "vue";
import {ref} from "vue";
import IconTextButton from "@/ui/components/input/buttons/IconTextButton.vue";
import { SVG } from "@/assets/svgs/SVGLoader";
import { useAuthStore } from "@/core/stores/useAuthStore";

const s = useCssModule()
const authStore = useAuthStore()
const email = ref('')
const password = ref('') 
const rememberMe = ref(false) 

const isEverythingValid = computed(() => {
    return email.value && password.value
})

async function login() {
    window.location.href = import.meta.env.VITE_API + "/auth/google";
}

// auto login
onMounted(async () => {
    await authStore.authenticate()
})
</script>

<template>
<div :class="s.view">
    <form @submit.prevent="login" :class="s.container">
        <img :class="s.logo" src="@/assets/images/BeeLogo.png" alt="logo">
        <h1 :class="s.title">HoneyBee</h1>
        
        <IconTextButton
            :icon="SVG.Checkmark"
            text="Login with Google"
            @click="login"
        />
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