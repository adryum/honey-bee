<script setup>
import { onMounted, ref, useCssModule } from 'vue';
import TableEntry from './TableEntry.vue';
import { getUsers } from '@/core/repositories/homeRepository';

const rUsers = ref([])
const s = useCssModule()

async function refresUsers() {
    rUsers.value = await getUsers()
}

onMounted(async () => {
    refresUsers()
})
</script>

<template>
<div :class='s.container'>
    <header :class="s.header">
        <h1>Users</h1>
    </header>

    <div :class="s.grid">
        <div :class="s.row">
            <p :class="s.id">Id</p>
            <p :class="s.user">User</p>
            <p :class="s.acc_code">Account code</p>
            <p :class="s.email">Email</p>
            <p :class="s.password">Password</p>
            <p :class="s.hive_count">Hive Count</p>
            <p :class="s.role">Role</p>
            <p :class="s.actions">Actions</p>
            
        </div>
        <TableEntry v-for="entry in rUsers" :onDelete="refresUsers" :entry="entry"/>
    </div>
</div>
</template>

<style module lang='sass'>
@use '@/assets/main.sass' as main
.container
    width: 80rem
    height: 30rem
    background: white
    border: 1px solid rgb(220, 220, 220)
    margin: 0 .5rem
    .header
        display: flex
        padding: .5rem 1rem
        box-sizing: border-box

        h1
            all: unset
            font-size: main.$font-size-big
    .row
        padding: 0 .5rem
        display: flex
        height: 2.5rem
        border-bottom: 1px solid rgb(220, 220, 220)
        gap: 1rem
        font-size: main.$font-size-text
        color: #A1A1A1
        > * 
            display: flex
            align-items: center
            justify-content: flex-start
        .id
            margin-left: .5rem
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
        .actions
            margin-right: .5rem
            width: 4rem
            justify-content: center

    
</style>