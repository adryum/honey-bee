<script setup lang="ts">
import { ref, useCssModule } from "vue";
import Icon from "../components/Icon.vue";
import { IconType, SVG } from "@/assets/svgs/SVGLoader";
import AccessFragment from "../components/view_fragments/profile/AccessFragment.vue";

enum ProfileTab {
    PROFILE = "Profile",
    ACCESS  = "Access"
}

const s = useCssModule()
const selectedTab = ref(ProfileTab.PROFILE)

</script>

<template>
<div :class="s.container">
    <div
        :class="s.header"
    >
        <div
            :class="s.topLine"
        >
            <img 
                src="@/assets/images/axe.jpg" alt="Profile Picture" 
                :class="s.img"    
            />
            <div 
                :class="s.infoBlock"
            >
                <p
                    :class="s.name"
                >
                    Adriano kirsteino
                </p>
                <div
                    :class="s.row"
                >
                    <div
                        :class="s.tag"
                    >
                        <Icon
                            :svg="SVG.Profile"
                            :type="IconType.SMALL"
                        />
                        <p>
                            Hive manager
                        </p>
                    </div>

                    <div
                        :class="s.tag"
                    >
                        <Icon
                            :svg="SVG.Profile"
                            :type="IconType.SMALL"
                        />
                        <p>
                            Rīga
                        </p>
                    </div>
                </div>

            </div>
        </div>
        
        <div
            :class="s.navigation"
        >
            <button
                v-for="tab in Object.values(ProfileTab) as ProfileTab[]"
                :key="tab"
                :class="[
                    s.button,
                    tab === selectedTab && s.selected,
                ]"
                @click="selectedTab = tab"
            >
                {{ tab }}
            </button>
        </div>

    </div>


    <AccessFragment

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