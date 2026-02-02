<script setup lang="ts">
import { computed, ref, Teleport, unref, useCssModule, watch } from 'vue';
import { IconType, SVG } from '@/assets/svgs/SVGLoader';
import type { StringDropdownOptions } from '@/core/models/Models';
import { useFieldValidator } from '@/core/composables/validators/UseFieldValidator';
import { useDropdown } from '@/core/composables/field/UseDropdown';
import { useFloatingUI } from '@/core/composables/field/useFloatingUI';
import Icon from '../../Icon.vue';

const s = useCssModule()
const props = withDefaults(defineProps<{
    options: StringDropdownOptions<string>
}>(), {
})
const emit = defineEmits<{
    onSelection: [string | undefined]
}>()
const search = ref('')
const isDropdownFocused = ref(false)
const dropdown = ref()
const list = ref()
const { 
    isOpened, 
    selectedItem, 
    filteredItems,
    setToFirstSuggestion, 
    removeSelectedItem,
    selectItem,
    close,
    open
} = useDropdown({
    initialValue: props.options.initialValue,
    items: unref(props.options.items),
    shownItemCount: unref(props.options.maxSuggestedItemCount),
    searchInput: search,
    closeOnEmptyInput: props.options.closeOnEmptyInput,
    openOnFilledInput: props.options.openOnFilledInput,
    onSelectedItemRemoval(item) {
        search.value = ''
        emit('onSelection', undefined)
    },
    onItemSelection(item) {
        close()
        search.value = item
        props.options.onItemSelection?.(item)
        emit('onSelection', item)
    },
    appliedFilter(item) {
        return item.toLowerCase().includes(search.value.toLowerCase())
    },
    onInitialItemSet(item) {
        search.value = item ?? ''
    },
})
const { floaterStyle } = useFloatingUI({
    anchorElement: dropdown, 
    floatingElement: list, 
    isShown: isOpened, 
    zIndex: unref(props.options.zIndex), 
    takeWidthFromAnchor: true,
    floaterOffset: 6
}) 
const { validator, showValidatorBorders } = useFieldValidator(
    search,
    props.options.validatorOptions ?? {},
    () => removeSelectedItem()
)
const showHint = computed(() => {
    
})
watch(search , (newVal) => {
    props.options.onInputChange?.(newVal)
})
</script>

<template>
    <div
        :class="s.container"
    >
        <div 
            ref="dropdown"
            :class="[
                s.row, 
                isDropdownFocused && s.focussed,
                !validator.isValid && showValidatorBorders && s.invalid
            ]"
            tabindex="0"
            @click="showValidatorBorders = true; options.openOnEmptyInput && open()"
        >
            <Icon 
                v-if="options.showIcon"
                :class="s.icon"
                :type="IconType.SMALL"
                :svg="SVG.Search"
            />
            <input 
                v-if="!selectedItem"
                :placeholder="unref(options.placeholder) ?? '...'"
                :class="[s.input]"
                v-model="search"
                @keydown.tab="setToFirstSuggestion"
                @keydown.enter.prevent="setToFirstSuggestion"
                @focus="isDropdownFocused = true"
                @blur="isDropdownFocused = false"
            />
            <div 
                v-else
                :class="[s.userTag]"
            >
                <p :class="s.name">
                    {{ selectedItem }}
                </p>
            </div>
            <button 
                type="button"
                :class="s.button"
                @click="removeSelectedItem"
            >
                <Icon
                    :class="s.clearIcon"
                    :type="IconType.SMALL"
                    :svg="SVG.Cross"
                />
            </button>
        </div>

        <Teleport to="body">
            <ol
                v-if="isOpened"
                ref="list"
                class="userSearchList"
                :style="floaterStyle 
                    ?  
                    { 
                        ...floaterStyle, 
                        ...(options.maxListHeightInItems ?? 0 > 0
                        ? {
                            overflowY: 'scroll',
                            maxHeight: `calc(2.25rem * ${options.maxListHeightInItems})`
                        }
                        : {}
                        )
                        
                    } 
                    : 'transform: translate(-9999px, -9999px)'"
            >
                <li 
                    v-if="filteredItems.length < 1"
                    class="emptyList"
                >
                    {{ options.noItemsText }}
                </li>
                <li 
                    v-for="item in filteredItems"
                    class="item"
                    @click="selectItem(item)"
                >
                    <p class="text">{{ item}}</p>
                </li>
            
            </ol>
        </Teleport>
    </div>
</template>

<style module lang='sass'>
.container
    position: relative
    display: flex
    flex-direction: column
    width: 100%
    font-family: var(--font-family)
    background: white
    border-radius: var(--border-radius-small)
    gap: .5rem

    .row
        display: flex
        max-height: 2rem
        height: 2rem
        
        box-sizing: border-box
        box-shadow: inset 0 0 0 1px var(--faint-border)
        border-radius: var(--border-radius-small)
        // border: 1px solid var(--blue)
        overflow: hidden
        transition: .1s
        outline-color: transparent

        &.invalid
            box-shadow: inset 0 0 0 1px var(--red) !important

        &.focussed
            box-shadow: inset 0 0 0 1px var(--orange) !important

        .icon
            width: 1rem
            height: 1rem
            background: none
            padding: .4rem
            margin-top: auto
            margin-bottom: auto

        .userTag
            display: inline-flex
            min-width: 0
            gap: .5rem
            padding: .5rem
            margin: .2rem 

            margin-right: auto 
            box-sizing: border-box
            background: var(--blue)
            border-radius: var(--border-radius-tiny)

            .name
                margin: 0
                align-self: center
                font-size: var(--font-size-small)
                font-weight: 500
                letter-spacing: .02em
                text-overflow: ellipsis
                white-space: nowrap
                overflow: hidden

            .image
                overflow: hidden
                align-self: center
                border-radius: 100px

        .input
            align-self: center
            min-width: 0
            height: 100%
            width: 100%
            padding: .5rem
            padding-right: 0
            border: none
            background: transparent
            line-height: 1rem
            font-size: var(--font-size-small)
            font-family: var(--font-family)
            font-weight: 300

            flex: 1
            box-sizing: border-box

            &:focus
                outline: none  
                box-shadow: none 

        
        .button
            display: flex
            justify-content: center
            align-items: center
            margin: 1px
            border: none
            border-radius: 0 calc( var(--border-radius-small) - 1px ) calc( var(--border-radius-small) - 1px ) 0
            box-sizing: border-box
            background: transparent

            min-width: 2rem
            cursor: pointer

            &:hover
                background: var(--faint-border)

            .clearIcon
                height: 1rem
                width: 1rem
</style>
