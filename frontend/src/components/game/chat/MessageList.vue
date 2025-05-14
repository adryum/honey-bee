<script setup>
import UserMessage from "@/ui/components/game/chat/UserMessage.vue";

defineProps({
  messages: Array,
})
</script>

<template>
  <div class="chat">
    <UserMessage v-for="(user, index) in messages" :key="index"
                 :UserMessageModel="user"
    />
  </div>
</template>

<style scoped>
.chat {
  overflow-y: scroll;
}
</style>
