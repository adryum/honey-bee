<script setup lang="ts">
import { useCssModule } from 'vue';

const s = useCssModule()
defineEmits<{
    clickOutside: [],
}>()
</script>

<template>
<Teleport to="body">
    <div 
        :class="s.container"
        @click="$emit('clickOutside')"
    >
        <slot>

        </slot>
    </div>
</Teleport>
</template>

<style module lang="sass">
.container
    position:        fixed
    top:             0
    left:            0
    width:           100vw
    height:          100vh
    gap:             1rem
    padding:         1rem
    box-sizing:      border-box
    backdrop-filter: brightness(80%)
    z-index:         100
</style>
