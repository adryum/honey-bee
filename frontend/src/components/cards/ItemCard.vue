<script setup>
import {ref, useTemplateRef} from "vue";
import ModalItemCard from "@/ui/components/cards/ModalItemCard.vue";

defineProps({
  name: String,
  src: String,
  storedCount: String,
  registeredCount: String
})

const isCardOpened = ref(false)
const cardModal = {
  "openModal" : () => isCardOpened.value = true,
  "closeModal" : () => isCardOpened.value = false
}

// card leaning
let isAnimationCanceled = ref(false)
let card = useTemplateRef('card') // only this card element. NOT THOSE CHILDRENNN!!!!
function tran() {
  new Promise(resolve => setTimeout(() => {resolve; isAnimationCanceled.value = true; console.log('entered')}, 100));
}

function clearTransform() {
  // Needs to be called only when exiting THE card
  card.value.style.transition = '.15s'
  card.value.style.transform = ''
  isAnimationCanceled.value = false
  console.log('cleared')
}

function leanTowardsMouse(e) {
  let elementsHalfOfTheWidth = card.value.getBoundingClientRect().width / 2
  let elementsHalfOfTheHeight = card.value.getBoundingClientRect().height / 2

  let elementCenterXPos = card.value.getBoundingClientRect().x + elementsHalfOfTheWidth  // y axis
  let elementCenterYPos = card.value.getBoundingClientRect().y + elementsHalfOfTheHeight  // x axis

  // Gets values from -1 to 1 (from cursor pos)
  let xPosError = (e.clientX - elementCenterXPos) / elementsHalfOfTheWidth
  let yPosError = (e.clientY - elementCenterYPos) / elementsHalfOfTheHeight

  if (isAnimationCanceled.value) card.value.style.transition = 'none'
  card.value.style.transform = `rotateY(${xPosError}deg) rotateX(${-yPosError}deg)`
}
</script>

<template>
  <div class="perspective-box">
    <div ref="card" id="card"
         class="item-card-wrapper pop-out-centered-shadow cut-rounded-border perspective-100"
         @mouseleave="clearTransform"
         @mouseenter="tran"
         @mousemove="leanTowardsMouse"
         @click="cardModal.openModal"
    >
      <div class="image-div">
        <img class="card-image"
             :src="(src !== undefined) ? src : '/src/ui/assets/images/honeyCombWall.jpg'" alt="">
      </div>
      <hr class="splitter">
      <div class="information">
        <h2>{{ (name !== undefined) ? name : "NONAME" }}</h2>
        <hr>
        <div class="bottom-info">
          <p>In storage:</p>
          <div>
            <p>{{ (storedCount !== undefined) ? storedCount : "nan" }}</p>
          </div>
          <p>Total registered:</p>
          <div>
            <p>{{ (registeredCount !== undefined) ? registeredCount : "nan" }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ModalItemCard v-if="isCardOpened" class="modal" :onCloseClick="cardModal.closeModal"/>
</template>

<style scoped>
.splitter {
  margin: 0;
  width: 100%;
  border: none;
  height: 4px;
  background: #322929;
}
.perspective-box {
  perspective: 500px;
}
.item-card-wrapper {
  display: flex;
  flex-direction: column;
  /*
  width: 25rem;
  height: 30rem;
  */

  height: 100%;
  width: 100%;

  font-family: Ebrima;

  transition: .1s;
}
.image-div {
  height: 60%;
}
.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  margin: 0;
  padding: 0;
}
.information {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;

  flex: auto;
  background: linear-gradient(150deg,  #313137, #484b55 40%, #313137);
}
.information > h2 {
  color: azure;
  font-size: 3rem;
  margin: 0;
}
.information > hr {
  width: 85%;
  height: 4px;
  background: white;
  border: none;
  border-radius: 8px;
  margin: 0;
}
.bottom-info {
  display: flex;
  width: 100%;
}
.bottom-info > * {
  font-size: 1.1rem;
  font-weight: bold;
  flex: auto;
  width: 50%;
  margin: 0 0 0 1rem;
  text-align: start;
  color: #dad8b6;
}
.bottom-info > div {
  backdrop-filter: brightness(80%);
  margin-right: 1rem;
  border-radius: 10%;
  text-align: center;
  align-self: center;
}
</style>
