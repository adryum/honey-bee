<script setup>
const props = defineProps({
  type: String,
  text: String,
  isUnlocked: Boolean
})
</script>

<template>
  <button :class="(isUnlocked) ? 'active-button' : 'disabled-button'" :type="type"><strong>{{ text }}</strong></button>
</template>

<style scoped>
button {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--font-color-main);
  text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
  width: 100%;
  text-align: center;
  border: none;
  margin: 0;
  z-index: 1;

  transition: .5s;
}
button:hover {
  filter: brightness(90%);
}
.disabled-button, .active-button {
  border-radius: var(--widget-border-radius);
  transition: .3s;
}
.active-button:hover {
  scale: 1.05;
}
.active-button {
  background: linear-gradient(100deg,
  rgb(236, 210, 15),
  rgb(154, 198, 108) 95%
  );
}

.disabled-button {
  background:  linear-gradient(100deg,
  rgb(228, 40, 40) ,
  rgb(135, 21, 0) 95%
  );
}
</style>
