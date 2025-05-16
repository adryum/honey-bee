<script setup>
import ApiarySummaryCard from '@/components/ApiarySummaryCard.vue';


</script>

<template>
<div class="view-container">
    <div class="header">

    </div>
    <div class="page">
        <ApiarySummaryCard />
    </div>
</div>
</template>

<style scoped lang='sass'>
@use '../assets/_colors.sass' as *
.view-container
    width: 100%
    height: 100vh

    display: grid
    grid-template-areas: 'a header header header b' 'a c c c b' 'a k page l b'
    grid-template-columns: 1rem 2rem 1fr 2rem 1rem
    grid-template-rows: 6rem 2rem 1fr

    background: $base-dark

.header
    grid-area: header
    background: $special-dark
    box-shadow: 0 6px 8px 0px rgba(0, 0, 0, .3)
    border-radius: 0 0 8px 8px

    position: sticky
    top: 0

.page
    grid-area: page
    background: $base-main
    border-radius: 4px 4px 0 0
    border-top: 6px solid $base-light
    border-right: 6px solid $base-light
    border-left: 6px solid $base-light

    padding: .5rem

</style>