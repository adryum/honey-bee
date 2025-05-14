<script setup>

import CenteredDimmedPopup from "@/ui/components/utlis/CenteredDimmedPopup.vue";
import InputField from "@/ui/components/InputField.vue";
import {ref} from "vue";

const emits = defineEmits([
  "onCloseClick"
])

const isUserAddingMultiple = ref(false)
function toggleAddingMultiple() {
  isUserAddingMultiple.value = !isUserAddingMultiple.value
}
function  closeThisPopup() {
  emits("onCloseClick")
}
</script>

<template>
  <CenteredDimmedPopup>
    <div class="container">
      <div class="header">
        <button @click="closeThisPopup">X</button>
      </div>
      <div class="image-div pop-out-centered-shadow"><img src="/src/ui/assets/images/no-image.jpg" alt="image"></div>
      <div class="action-buttons">
        <button>Cancel</button>
        <button>Create</button>
      </div>
      <div class="main-form pop-out-centered-shadow">
        <h1>NEW ITEM</h1>
        <hr>
        <div class="input-row">
          <h2>Name:</h2><input-field/>
        </div>
        <div class="input-row">
          <h2>Item category:</h2><input-field/>
        </div>
        <div class="input-row">
          <h2>Special tags:</h2><input-field/>
        </div>

        <div v-if="isUserAddingMultiple" class="input-row">
          <h2 class="underline">Amount:</h2><input-field/>
        </div>
        <hr>
        <div class="input-row">
          <h2>Description:</h2><input-field/>
        </div>
        <button class="special-button" @click="toggleAddingMultiple">
          {{(isUserAddingMultiple) ? 'Add single' : 'Add multiple'}} </button>
      </div>
    </div>
  </CenteredDimmedPopup>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: flex-end;
  grid-row: 1/ 2;
  grid-column: 1 / 3;
  background: aliceblue;
/*
  box-shadow: 0 2px 2px black;*/
}
.header > button {
  height: 100%;
  aspect-ratio: 1/1;
}
.main-form {
  grid-column: 2 / 3;
  grid-row: 2 / 4;
  margin: 10px;
  padding: 10px;
  border-radius: 8px;
  background: linear-gradient(120deg, #838383, #575757);

  display: flex;
  flex-direction: column;
  overflow: auto;
}
.main-form > hr {
  width: 100%;
  border: none;
  min-height: 4px;
  background: whitesmoke;
  margin: 8px 0 8px 0;

}
.input-row {
  display: grid;
  grid-template-columns: 50% 50%;
}
.input-row > h2 {
  margin: 0;
}
.input-row > * {
  display: flex;
  align-items: center;
}
.special-button {
  width: 100%;
  min-height: 3rem;
  margin-top: auto;
}
h1 {
  color: azure;
}
.underline {
  text-decoration: black underline;
}
.container {
  display: grid;
  grid-template-columns: 40% 60%;
  grid-template-rows: 5rem 50% calc(50% - 5rem);

  width: 60%;
  height: 70%;
  background: #789197;

  font-family: Ebrima;
}
.image-div {
  grid-column: 1 / 2;
  grid-row: 2 / 3;

  margin: 10px;
  border-radius: 8px;
  overflow: hidden;
  transition: .3s;
}
.image-div:hover {
  scale: 1.01;
  filter: brightness(80%);
  cursor: pointer;
}
.image-div > img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.action-buttons {
  display: flex;
  flex-direction: column;

  margin: 10px;
  gap: 10px;

  grid-column: 1 / 2;
  grid-row: 3 / 4;
}
.action-buttons > button {
  flex: 1;
}

</style>
