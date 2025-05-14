<script setup>

</script>

<template>
  <div class="modal-container">
    <slot>

    </slot>
  </div>
</template>

<style scoped>
.modal-container {

  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  bottom: 0;
  backdrop-filter: brightness(20%) blur(4px);

  transition: .3s;
}
</style>
