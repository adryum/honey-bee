<script setup lang="ts">
import { SVG } from "@/assets/svgs/SVGLoader";
import { computed, useCssModule } from "vue";
import IconCubeButton from "../input/buttons/IconCubeButton.vue";
import ModularDropdown from "../input/dropdowns/ModularDropdown.vue";
import IconTextItem from "../input/dropdowns/dropdownItems/bottom/IconTextItem.vue";
import type { DropdownModel } from "@/core/models/Models";
import { storeToRefs } from "pinia";
import { Role } from "@/core/DatabaseEnums";
import router, { RouterViewPaths } from "@/core/router";
import { useAuthStore } from "@/core/stores/useAuthStore";

const s = useCssModule()
const authStore = useAuthStore()
const { logout } = authStore
const { user } = storeToRefs(authStore)

const placeholderImage = "src/assets/images/ProfilePlaceholder.jpg"
const settingDestinations = computed(() => {
    var arr = [
        { name: 'Profile', path: '/profile', svg: SVG.Profile },
        { name: 'Settings', path: '/settings', svg: SVG.Cog },
        { name: 'Logout', path: '/logout', svg: SVG.Logout }
    ]

    if (user.value?.role === Role.ADMINISTRATOR) {
        arr.unshift({ name: 'Admin Panel', path: '/admin', svg: SVG.Key })
    }
    
    return arr
})
const profileCircleColor = computed(() => {
    const role = user.value?.role
    switch (role) {
        case Role.ADMINISTRATOR:     return "var(--orange)"
        case Role.MANAGEMENT:        return "var(--red)"
        case Role.APIARY_MAINTAINER: return "var(--light-gray)"
        case Role.HIVE_WORKER:       return "lime-green"
        default:                     return "var(--black)"
    }
})
type SettingDestination = {
    name: string
    path: string
    svg:  SVG
}

function onClick(dropdown: DropdownModel, destination: SettingDestination) {
    dropdown.isShown.value = false

    switch (destination.name) {
        case "Profile":     break;
        case "Settings":    break;
        case "Logout":      logout(); break;
        case "Admin Panel": router.push(RouterViewPaths.Admin); break;
        default:break;
    }
}
</script>

<template>
<ModularDropdown
    color="var(--faint-border)"
    :floater-offset="8"
>
    <template #head="{ dropdown }">
        <div 
            :class="[
                s.profile,
                dropdown.isShown.value && s.filled
            ]"
            @click="dropdown.isShown.value = !dropdown.isShown.value"
        >
            <img 
                alt="profile picture"
                :class="s.image" 
                :src="user?.picture || placeholderImage"
                :style="{ 
                    outline: `2px solid ${profileCircleColor}`,
                    outlineOffset: '-2px'

                }"
            />
            <div :class="s.column">
                <p :class="s.name">{{ user?.username }}</p>
                <p :class="s.email">{{ user?.email }}</p>
            </div>
            <IconCubeButton 
                :svg="SVG.DropdownArrow"
            />
        </div>
    </template>
    <template #list="{ dropdown }">
        <IconTextItem
            v-for="item in settingDestinations"
            :key="item.name"
            :options="{
                svg: item.svg,
                text: item.name
            }"
            @click="onClick(dropdown, item)"
        />
    </template>
</ModularDropdown>

</template>

<style module lang='sass'>
.filled
    background: var(--gray)

.profile
    display:       inline-flex
    max-width:     15rem
    max-height:    2.5rem
    min-height:    2.5rem
    gap:           .5rem
    align-items:   center
    padding:       .25rem
    border-radius: var(--border-radius-small)
    box-sizing:    border-box

    &:hover
        background: var(--gray)

    .image
        width:         2rem
        height:        2rem
        border-radius: 100rem
        object-fit:    cover

    .column
        display:        flex
        flex-direction: column

        .name
            font-weight:    500
            letter-spacing: .02em
            font-size:      var(--font-size-small)
        
        .email
            font-size: var(--font-size-tiny)
            opacity:   .6
</style>