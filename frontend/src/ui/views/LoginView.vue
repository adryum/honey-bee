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
    <img :class="s.background" src="@/assets/images/sunflowers.webp" alt="logo">
    <form 
        :class="s.form"
        @submit.prevent="login" 
    >
        <img :class="s.logo" src="@/assets/images/happybee.png" alt="logo">
        <h1 :class="s.title">HoneyBee</h1>
        
        <IconTextButton
            :class="[s.signIn]"
            :icon="SVG.Checkmark"
            :is-submit="true"
            text="Login with Google"
            @click="login"
        >
            <img :class="s.icon" src="@/assets/images/GoogleIcon.png" alt="logo">

        </IconTextButton>
        <a 
            :class="s.helpText"
            href="/fuck-you"
        >Contact support</a>
    </form>
</div>
</template>

<style module lang="sass">
.icon
    width: 1.45rem
    height: 1.45rem
.background
    position: absolute
    width: 100vw
    height: 100vh
    object-fit: cover
    object-position: top
    filter: blur(3px)
    transform: scale(1.01)

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
    top: -6.2rem
    left: -0rem
    rotate: -10deg
    height: 18rem
    scale: .5
    transform: scaleX(-1)

.title
    font-family: var(--font-family)
    font-size: 3rem
    letter-spacing: 1px
    margin-top: 2rem
    align-self: center
    font-weight: 900
    rotate: -3deg
    color: #2D1E02

.helpText
    font-family: var(--font-family)
    font-size: var(--font-size-small)
    font-weight: 500
    color: var(--black)

    // &:hover
    //     color: #e8e6e0

.signIn
    
    margin-top: 3rem 
    
.view
    position: relative
    display: flex
    width: 100%
    height: 100vh
    align-items: center
    overflow: hidden

.form
    position: relative
    margin: auto auto auto 10vw

    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.15), 0 6px 20px 0 rgba(0, 0, 0, 0.10)
    width: 27rem
    // height: 20rem


    display: flex
    flex-direction: column
    gap: 1rem

    box-sizing:    border-box
    padding:       2rem
    border-radius: 8px
    // border-bottom: 2px solid #B9A554
    // box-shadow: 0 0 10px rgba(0, 0, 0, .2)

    background: white
    z-index: 1

@media (max-width: 600px) 
    .container
        padding: 1rem 1rem
        margin: 0 2rem

    .logo
        display: none

</style>