<script setup>
import { useCssModule } from 'vue';

defineProps({
    label: {
        type: String,
        default: 'Button'
    }
})

const s = useCssModule()
</script>

<template>
  <div :class="s.wrapper, s['cool-border']">
    <label :class="s.text">{{ label }}</label>
  </div>
</template>

<style module lang="sass">
.wrapper 
  display: flex
  position: relative
  align-items: center
  justify-content: center

  cursor: pointer
  background: rgba(2,2,2, 0.5)
  border-radius: var(--outer-border)


.text 
  display: flex
  align-items: center
  justify-content: center
  margin: 10px

  font-family: var(--font-main)
  font-size: 4rem
  z-index: 2
  color: var(--font-color-main)
  width: 100%
  height: 100%
  user-select: none



.wrapper::before 
  position: absolute
  content: ''
  width: calc(100% - 10px)
  height: calc(100% - 10px)
  background: rgba(70,70,70, 1)
  border-radius: var(--inner-border)
  z-index: 1
  box-shadow: inset 1px 1px 2px 1px rgba(0, 0, 0, .3)


.wrapper::after 
  position: absolute
  content: ''
  width: 100%
  height: 100%
  z-index: 0
  border-radius: var(--outer-border)

  opacity: 0
  background-image: conic-gradient(from var(--angle),red, yellow, green, red 360deg)
  animation: 3s spin linear infinite
  transition: .4s


.wrapper:hover::after
  opacity: 1


@property --angle 
  syntax: "<angle>"
  initial-value: 0deg
  inherits: false;

@keyframes spin 
  from 
    --angle: 0deg
  
  to 
    --angle: 360deg
  

</style>
