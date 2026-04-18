<script setup lang="ts">
import type { CalendarEventDB } from "@/core/stores/Models";
import { ref, useCssModule } from "vue";
import IconDropdown from "../input/dropdowns/IconDropdown.vue";
import { SVG } from "@/assets/svgs/SVGLoader";

const s = useCssModule()
const props = defineProps<{
    task: CalendarEventDB
}>()
const isTaskOpen = ref(false)
</script>

<template>
    <div
        :class="[
            s.task,
            s.shadow,
            isTaskOpen && s.opened
        ]"
        @click="isTaskOpen = !isTaskOpen"
    >
        <div 
            :class="[
                s.header,
                isTaskOpen && s.opened
            ]"
        >
            <p>
                {{ task.title || "No title" }}
            </p>
            <IconDropdown
                :svg="SVG.MoreDots"
                :class="s.editButton"
            >
                <p>apple</p>
            </IconDropdown>

        </div>
        

        <div
            v-if="isTaskOpen"
            :class="s.extendablePart"
            @click.stop=""
        >
            <div
                :class="s.grid"
            >
                <label 
                    for="type"
                    :class="s.label"
                >
                    Type: 
                </label>
                <p
                    id="type"
                    :class="s.value"
                >
                    {{ task.type || "No type" }}
                </p>
                <!-- <label 
                    for="days-left"
                    :class="s.label"
                >
                    Days Left: 
                </label>
                <p
                    id="days-left"
                    :class="s.value"
                >
                    3
                </p> -->
                <label 
                    for="created-by"
                    :class="s.label"
                >
                    Created by: 
                </label>
                <p 
                    id="created-by"
                    :class="s.value"
                >
                    {{ task.creatorEmail || "Unknown" }}
                </p>
            </div>


            <p 
                :class="s.description"
            >
                {{ task.description || "No description" }}
                <!-- Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton -->
            </p>
        </div>
    </div>
</template>

<style module lang='sass'>

.label
    font-family: var(--font-family)
    font-size: var(--font-size-medium)
    font-weight: 300
    color: var(--faint-text)
    letter-spacing: .02em
.value
    font-family: var(--font-family)
    font-size: var(--font-size-medium)
    font-weight: 500
    color: var(--black)
    letter-spacing: .02em

.description
    align-self: flex-start
    font-family: var(--font-family)
    font-size: var(--font-size-medium)
    font-weight: 500
    color: var(--black)
    letter-spacing: .02em

.shadow
    box-shadow:    0 0 0 1px var(--gray)
    border-radius: var(--border-radius-tiny)

.grid
    display:               grid
    grid-template-rows:    2rem 2rem
    grid-template-columns: 10rem 1fr
    width: 100%

.editButton
    margin-left: auto

.task
    display:        flex
    flex-direction: column
    border-radius:  var(--border-radius-tiny)
    transition: .1s

    &:hover
        z-index: 1
        // box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.07), 0 3px 2px 0 rgba(0, 0, 0, 0.05)
        transform: scale(.99)

    &.opened
        &:hover
            z-index: auto !important
            transform: none

    .extendablePart
        display:        inline-flex
        flex-direction: column
        gap:            .5rem
        align-items:    center
        width:          100%
        padding:        1rem
        box-sizing:     border-box

        margin-top: .5rem


    .header
        display:     flex
        gap:         .5rem
        align-items: center
        width:       100%
        height:      3rem
        padding:     0 1rem
        box-sizing:  border-box
        transition:  .1s
        background: var(--gray)

        cursor: pointer

      

        &.opened
            background: var(--gray)
            &:hover
                z-index: auto !important
                box-shadow: none
                transform: none

        p
            font-family:    var(--font-family)
            font-size:      var(--font-size-medium)
            opacity:        1
            font-weight:    500
            letter-spacing: .04em
            color:          var(--black)
            line-height:    1.5rem
        
</style>