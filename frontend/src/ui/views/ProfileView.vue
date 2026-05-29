<script setup lang="ts">
import { computed, ref, useCssModule } from "vue";
import Icon from "../components/Icon.vue";
import { IconType, SVG } from "@/assets/svgs/SVGLoader";
import AccessFragment from "../components/profile/AccessFragment.vue";
import { AdminTab, ProfileTab } from "@/core/ViewTabEnums";
import { useRouter } from "vue-router";
import { RouterViewPaths } from "@/core/router";
import { useProfileQuery } from "@/core/composables/useProfile";
import { useAuthStore } from "@/core/stores/useAuthStore";
import { storeToRefs } from "pinia";
import { UserRoles } from "@/core/DatabaseEnums";
import placeholderImage from '@/assets/images/ProfilePlaceholder.jpg'
import { useI18n } from "vue-i18n";

const s = useCssModule()
const { t } = useI18n()
const router = useRouter()
const props = defineProps<{
    userId: number
    tab:    ProfileTab
}>()

const { user, isLoading, isError } = useProfileQuery(props.userId)
const { user: THEUser } = storeToRefs(useAuthStore()) 
const isTHEUser = computed(() => user.value?.id === THEUser.value?.id)

const showedTabs = computed(() => {
    var tabs = Object.values(ProfileTab)

    if (THEUser.value?.role !== UserRoles.ADMINISTRATOR) {
        tabs = tabs.filter(tab => tab !== ProfileTab.ACCESS)
    }

    return tabs
})

function changeTab(tab: ProfileTab) {
    router.replace({
        name:   RouterViewPaths.Profile,
        params: { 
            userId: props.userId,
            tab:    tab
        }
    })
}
</script>

<template>
<div
    v-if="user"
    :class="s.container"
>
    <div
        :class="s.header"
    >
        <div
            :class="s.topLine"
        >
            <img 
                :src="user.picture ? user.picture : placeholderImage" alt="Profile Picture" 
                :class="s.img"    
            />
            <div 
                :class="s.infoBlock"
            >
                <p
                    :class="s.name"
                >
                    {{ user.username }}
                </p>
                <div
                    :class="s.row"
                >
                    <div
                        :class="s.tag"
                    >
                        <Icon
                            :icon="SVG.Profile"
                            :type="IconType.SMALL"
                        />
                        <p>
                            {{ user.role }}
                        </p>
                    </div>

                    <div
                        :class="s.tag"
                    >
                        <Icon
                            :icon="SVG.Profile"
                            :type="IconType.SMALL"
                        />
                        <p>
                            {{ t('profile.location_placeholder') }}
                        </p>
                    </div>
                </div>

            </div>
        </div>
        
        <div
            :class="s.navigation"
        >
            <button
                :class="[
                    s.button,
                ]"
                @click="changeTab(ProfileTab.ACCESS)"
            >
                {{ t('profile.access') }}
            </button>
        </div>

    </div>

    <AccessFragment
        v-if="tab === ProfileTab.ACCESS"
        :user-id="user?.id"
    />
</div>
</template>

<style module lang='sass'>

.navigation
    display: flex
    height:  2.5rem
    gap:     .5rem


    .button
        background: transparent
        border:     none
        font-size:  var(--font-size-medium)
        height:     2.5rem
        cursor:     pointer
        opacity:    .7

        &.selected
            opacity: 1
            color:   var(--orange)

        &:hover
        opacity: 1

.header
    display:        flex
    flex-direction: column
    width:          100%
    padding:        1rem 1rem 0 1rem
    gap:            1rem
    box-sizing:     border-box
    background:     var(--white)
    font-family:    var(--font-family)
    border-radius:  var(--border-radius-medium)

.topLine
    display: flex
    width:   100%
    gap:     1rem


.infoBlock
    display:        flex
    flex-direction: column
    height:         100%

    .row
        display: flex
        gap:     1rem

.tag
    display:        flex
    align-items:    center
    gap:            .5rem
    font-weight:    500
    letter-spacing: .02em
    opacity:        .7
    font-size:      var(--font-size-medium)

.name
    font-size: var(--font-size-huge)
    margin:    4rem 0 1rem 0
.img
    min-width:     10rem
    min-height:    10rem
    max-width:     10rem
    max-height:    10rem
    border-radius: 100px

.container 
    display:        flex
    flex-direction: column
    height:         calc( 100vh - var(--header-height))
    width:          100%
    padding:        1rem
    box-sizing:     border-box
    gap: 1rem
</style>