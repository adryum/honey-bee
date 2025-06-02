<script setup>
import {ref, useTemplateRef} from "vue";

defineProps({
  name: String
})

let isAnimationCanceled = ref(false)

let card = useTemplateRef('card') // only this card element. NOT THOSE CHILDRENNN!!!!
function tran() {
  new Promise(resolve => setTimeout(() => {resolve; isAnimationCanceled.value = true;}, 100));
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
    <div ref="card" @mouseleave="clearTransform" @mouseenter="tran" @mousemove="leanTowardsMouse" class="item-card-wrapper  scale-hover-1-1 pop-out-centered-shadow cut-rounded-border perspective-100">
      <div class="image-div"><img class="card-image" src="/src/ui/assets/images/honeyCombWall.jpg" alt=""></div>
      <div class="text-div"><h2>{{ name }}</h2></div>
    </div>
  </div>
</template>

<style scoped>
.item-card-wrapper {
  display: flex;
  flex-direction: column;
  width: 20vw;
  height: 25vw;

  transition: .1s;
}
.image-div {
  flex: 3;
}
.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.text-div {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(0.5rem, 1rem, 3rem);

  flex: 1;
  background: rgba(255,255,255, 1);
}
.text-div > h2 {
  margin: 0;

}
.perspective-box {
  perspective: 150px;
}
</style>
