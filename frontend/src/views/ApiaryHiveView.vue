<script setup>
import Hive from '@/components/hive/Hive.vue';
import { ref } from "vue";
import { user, getApiaryHives } from "../core/repositories/homeRepository.js"
import { onMounted } from 'vue';
import TabPage from '@/components/TabPage.vue';

const props = defineProps({
    id: String
})

const hives = ref([])

onMounted(async () => {
    hives.value = await getApiaryHives(user.value['account_code'], props.id)
})
</script>

<template>
    <TabPage>
        <Hive v-for="(hive, i) in hives" :key="i"
            :name="hive.name"
            :weight="hive.weight"
            :frames="hive.frames"
            :type="hive.type"
            ></Hive>
    </TabPage>
</template>

<style scoped lang='sass'>
@use '../assets/colors.sass' as *

</style>