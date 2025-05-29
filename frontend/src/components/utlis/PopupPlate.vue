<script setup>

</script>

<template>
  <div class="modal-container">
    <slot>

    </slot>
  </div>
</template>

<style scoped lang="sass">
.modal-container
    position: absolute
    z-index: 100
    display: flex
    width: 100%
    height: 100%

    justify-content: center
    align-items: center

    backdrop-filter: brightness(70%)

    transition: .3s
</style>
