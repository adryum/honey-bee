<script setup lang="ts">
import { ref, useCssModule } from "vue";
import WhitelistFragment from "../components/view_fragments/admin/WhitelistFragment.vue";

enum AdminFragment {
    Whitelist = "Whitelist",
    Users     = "Users",
    Access    = "Access"
}
const s = useCssModule()
const seletedFragment = ref<AdminFragment>(AdminFragment.Whitelist)

</script>

<template>
<div :class="s.container">
    <div :class="s.header">
        <button
            v-for="item in Object.values(AdminFragment) as AdminFragment[]"
            :class="[
                s.button,
                seletedFragment === item && s.selected
            ]"
            @click="seletedFragment = item"
        >
            <p>{{ item }}</p>
        </button>
    </div>

    <WhitelistFragment
        v-if="seletedFragment === AdminFragment.Whitelist"
    />
</div>
</template>

<style module lang='sass'>
.header
    width: 100%
    // border-bottom: 4px solid var(--white)

.selected
    background: var(--white) !important
    transform:  translateY(0)
    & > *
        opacity: 1 !important

.button
    margin:         0
    border:         none
    background:     var(--dark)
    padding:        0 1rem
    height:         2rem
    letter-spacing: .02em
    font-family:    var(--font-family)
    font-size:      var(--font-size-small)
    border-radius:  var(--border-radius-small) var(--border-radius-small) 0 0
    cursor:         pointer
    transition:     0.1s

    & > *
        opacity: 0.7

    &:hover
        filter: brightness(1.05)

        & > *
            opacity: 1

.container 
    display:        flex
    flex-direction: column
    height:         calc( 100vh - var(--header-height))
    width:          100%
    padding:        1rem
    box-sizing:     border-box
</style>