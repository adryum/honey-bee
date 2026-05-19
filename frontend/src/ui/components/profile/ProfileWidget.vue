<script setup lang="ts">
import { SVG } from "@/assets/svgs/SVGLoader";
import { computed, useCssModule } from "vue";
import ModularDropdown from "../input/dropdowns/ModularDropdown.vue";
import IconTextItem from "../input/dropdowns/dropdownItems/bottom/IconTextItem.vue";
import type { DropdownModel } from "@/core/models/Models";
import { storeToRefs } from "pinia";
import { UserRoles } from "@/core/DatabaseEnums";
import { useAuthStore } from "@/core/stores/useAuthStore";
import { AdminTab, ProfileTab } from "@/core/ViewTabEnums";
import { useRouter } from "vue-router";
import IconCubeButton from "../input/buttons/IconCubeButton.vue";
import placeholderImage from '@/assets/images/ProfilePlaceholder.jpg'
import { useI18n } from "vue-i18n";

const s = useCssModule()
const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()
const { logout } = authStore
const { user } = storeToRefs(authStore)
const avatarSrc = computed(() => { 
    return user.value?.picture || placeholderImage
})

const settingDestinations = computed(() => {
    var arr = [
        { id: 'profile_widget.menu_profile',  path: `/profile/${user.value?.id}/${ProfileTab.ACCESS}`, svg: SVG.Profile },
        // { id: 'profile_widget.menu_settings', path: '/settings', svg: SVG.Cog },
        { id: 'profile_widget.menu_logout',   path: '/logout', svg: SVG.Logout }
    ]

    if (user.value?.role === UserRoles.ADMINISTRATOR) {
        arr.unshift({ id: 'profile_widget.menu_admin', path: `/admin/${AdminTab.Whitelist}`, svg: SVG.Key })
    }
    
    return arr
})
const profileCircleColor = computed(() => {
    const role = user.value?.role
    switch (role) {
        case UserRoles.ADMINISTRATOR:     return "var(--orange)"
        case UserRoles.MANAGEMENT:        return "var(--red)"
        case UserRoles.APIARY_MAINTAINER: return "var(--secondary)"
        case UserRoles.HIVE_WORKER:       return "lime-green"
        default:                     return "var(--black)"
    }
})
type SettingDestination = {
    id: string
    path: string
    svg:  SVG
}

function onClick(dropdown: DropdownModel, destination: SettingDestination) {
    dropdown.isShown.value = false

    switch (destination.id) {
        case "profile_widget.menu_profile":     router.push(destination.path); break;
        // case "profile_widget.menu_settings":    break;
        case "profile_widget.menu_logout":      logout(); break;
        case "profile_widget.menu_admin": router.push(destination.path); break;
        default:break;
    }
}
</script>

<template>
<ModularDropdown
    :floater-offset="4"
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
                referrerpolicy="no-referrer"
                :class="s.image" 
                :src="avatarSrc"
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
                :icon="SVG.DropdownArrow"
            />
        </div>
    </template>
    <template #list="{ dropdown }">
        <IconTextItem
            v-for="item in settingDestinations"
            :key="item.id"
            :options="{
                svg: item.svg,
                text: t(item.id)
            }"
            @click="onClick(dropdown, item)"
        />
    </template>
</ModularDropdown>

</template>

<style module lang='sass'>
.filled
    background: var(--secondary)

.profile
    display:       inline-flex
    
    height: 100%
    gap:           .5rem
    align-items:   center
    padding:       .5rem
    box-sizing:    border-box

    &:hover
        background: var(--secondary)

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