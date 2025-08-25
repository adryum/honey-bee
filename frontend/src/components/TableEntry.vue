<script setup>
import { useCssModule } from 'vue';
const props = defineProps({
    entry: Object,
    onDelete: Function
})
const s = useCssModule()

async function onUserDelete() {
    // await deleteUser(props.entry.id)
    await props.onDelete()
}
</script>

<template>
<div :class='s.container'>
    <p :class="s.id">{{ entry?.id }}</p>
    <p :class="s.user">{{ entry?.username }}</p>
    <p :class="s.acc_code">{{ entry?.account_code }}</p>
    <p :class="s.email">{{ entry?.e_mail }}</p>
    <p :class="s.password">{{ entry?.password }}</p>
    <p :class="s.hive_count">{{ entry?.hive_count }}</p>
    <p :class="s.role">{{ entry?.role }}</p>
    <button @click="onUserDelete()" :class="s.button">delete</button>
</div>

</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    display: flex
    height: 2.5rem
    // border-bottom: 1px solid rgb(220, 220, 220)
    gap: 1rem
    border-radius: 4px
    box-sizing: border-box
    margin: 0 .5rem
    padding: .2rem .5rem
    align-items: center

    font-size: main.$font-size-text
    color: black
    transition: .3s
    > * 
        display: flex
        align-items: center
        justify-content: flex-start

    .button
        all: unset
        cursor: pointer
        display: flex
        align-items: center
        justify-content: center

        border-radius: 4px
        color: white

        height: 100%
        width: 4rem
        background: #FF2B2B

        transition: .2s

        &:hover
            background: #B10F0F
            
    .id
        width: 7rem
        justify-content: center
    .user
        width: 12rem
    .acc_code
        width: 12rem

    .email
        width: 12rem

    .password
        width: 12rem
    .hive_count
        width: 10rem
        justify-content: center
    .role
        width: 10rem
        justify-content: center

    &:hover
        // transform: translateX(-5px)
        backdrop-filter: brightness(92%)
</style>