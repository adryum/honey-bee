<script setup>
import ApiarySummaryCard from '@/components/ApiarySummaryCard.vue';
import SearchBar from '@/components/SearchBar.vue';
import { user, getApiaries } from '@/core/repositories/homeRepository';
import { onMounted, ref } from 'vue';

const rApiaries = ref([])
const rStartWith = ref('')

async function assignApiaries() {
    rApiaries.value = await getApiaries(user.value['account_code'], rStartWith.value)
}

onMounted(async () => {
    rApiaries.value = await getApiaries(user.value['account_code'])
})
</script>

<template>
<div class="view-container">
    <div class="header">
        <SearchBar id="search-bar" :onClick="assignApiaries" v-model="rStartWith"/>
    </div>
    <div class="page">
        <ApiarySummaryCard class="item" v-for="apiary in rApiaries" :apiary="apiary"/>
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

    display: flex
    align-items: center
    justify-content: end
    gap: 2rem
    padding: 0 1.5rem 0 1.5rem

    z-index: 1

    position: sticky
    top: 0

    #search-bar
        width: 12rem

.page
    grid-area: page
    background: $base-main
    border-radius: 4px 4px 0 0
    border-top: 6px solid $base-light
    border-right: 6px solid $base-light
    border-left: 6px solid $base-light

    display: grid
    grid-template-columns: repeat(auto-fill, minmax(30rem, 1fr))
    gap: 3rem

    justify-items: center


    padding: .5rem
</style>