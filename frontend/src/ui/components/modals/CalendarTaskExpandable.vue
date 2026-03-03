<script setup lang="ts">
import { ref, useCssModule } from "vue";

const s = useCssModule()
const isTaskOpen = ref(false)
</script>

<template>
    <div
        :class="[
            s.task,
            s.shadow
        ]"
        @click="isTaskOpen = !isTaskOpen"
    >
        <div :class="s.header">
            <p>
                Eat all bees! no exclusions!!!
            </p>
            <button
                :class="s.editButton"
                @click.stop=""
            >
                Edit
            </button>
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
                    Checkup
                </p>
                <label 
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
                </p>
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
                    Andrea Kirsteno
                </p>
            </div>


            <p 
                :class="s.description"
            >
                Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton Realllly long descripton
            </p>
        </div>
    </div>
</template>

<style module lang='sass'>

.label
    +bulletLabel
.value
    +bulletValue
.description
    +descriptionText
.shadow
    box-shadow:    0 0 0 1px var(--yellow)
    border-radius: var(--border-radius-tiny)

.grid
    display:               grid
    grid-template-rows:    2rem 2rem 2rem
    grid-template-columns: 10rem 1fr
    width: 100%
.task
    display:        flex
    flex-direction: column
    border-radius:  var(--border-radius-tiny)

    .extendablePart
        display:        inline-flex
        flex-direction: column
        gap:            .5rem
        align-items:    center
        width:          100%
        padding:        1rem
        box-sizing:     border-box

        

    .header
        display:     flex
        gap:         .5rem
        align-items: center
        width:       100%
        height:      3rem
        background:  var(--yellow)
        padding:     0 1rem
        box-sizing:  border-box
        transition:  .3s

        &:hover
            background:  color-mix(in srgb, var(--yellow) 70%, var(--orange) )

        p
            font-family:    var(--font-family)
            font-size:      var(--font-size-medium)
            opacity:        1
            font-weight:    500
            letter-spacing: .04em
            color:          var(--black)
            line-height:    1.5rem

        .editButton
            all:            unset
            margin-left:    auto
            font-family:    var(--font-family)
            font-size:      var(--font-size-medium)
            opacity:        .8
            font-weight:    500
            letter-spacing: .02em
            color:          var(--black)
            line-height:    1.5rem
            transition:     .3s
            cursor:         pointer

            &:hover
                opacity: 1
</style>