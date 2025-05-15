<script setup>
import {ref} from "vue";

defineProps({
  title: String,
  type: String,
  placeHolder: String
})
const emits = defineEmits(['onEdit'])

let value = ref("")
function onEdit() {
    emits('onEdit', value.value)
}
</script>

<template>
<div class="input-wrapper">
  <h1>{{ title }}</h1>
  <!-- v-model  changes value to input  -->
  <input class="local-input-field" @input="onEdit"
         :type="type"
         v-model="value" 
         :placeholder="placeHolder"
  />
</div>
</template>

<style scoped>
.input-wrapper {
  display: flex;
  flex-direction: column;

  font-family: var(--font-main);
}
.local-input-field {
  position: relative;
  font-size: 1rem;
  transition: .3s;
}
.local-input-field:focus {
  outline: none;
  background: #ffeeaa;
}
h1 {
  font-size: 1.5em;
  margin: 0 0 10px 0
}
input {
  align-self: center;
  height: 2.5rem;
  width: 100%;

  box-sizing: border-box;
  padding-left: 8px;
  border-radius: var(--widget-border-radius);
  border: none;
}
</style>
