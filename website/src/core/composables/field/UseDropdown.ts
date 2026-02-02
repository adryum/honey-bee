import { isNumber } from "@/core/utils/others";
import { onClickOutside, type MaybeElement } from "@vueuse/core";
import { computed, ref, shallowRef, unref, watch, type MaybeRef, type Ref, type ShallowRef } from "vue";

export type UseDropdownModel<T> = {
    searchInput?: Ref<string>
    closeOnEmptyInput?: MaybeRef<boolean>
    openOnFilledInput?: MaybeRef<boolean>
    initialValue?: MaybeRef<T>
    items?: MaybeRef<T[]>
    shownItemCount?: MaybeRef<number>
    clearSelectionOnOpening?: boolean
    closeOnClickOutside?: boolean
    container?: Ref<MaybeElement>
    appliedFilter?: (item: T) => boolean
    onOpen?: () => void
    onClose?: () => void
    onItemSelection?: (item: T) => void
    onSelectedItemRemoval?: (item: T | undefined) => void
    onInitialItemSet?: (item: T | undefined) => void
}

export function useDropdown<T>(
    dropdown: UseDropdownModel<T>
) {
    const isOpened: Ref<boolean> = ref(false)
    const selectedItem: ShallowRef<T | undefined> = shallowRef(unref(dropdown.initialValue))
    dropdown.onInitialItemSet?.(selectedItem.value);

    const filteredItems = computed(() => {
        if (dropdown.items) {
            const filterResult = unref(dropdown.items).filter(item => (dropdown.appliedFilter) 
                ? dropdown.appliedFilter(item) 
                : true
            )
            
            const itemCount = unref(dropdown?.shownItemCount)
            return (isNumber(itemCount) && itemCount! > 0)
            ? filterResult.slice(0, itemCount)
            : filterResult
        }
        else return []
    })

    function reInitialize() {
        console.log('reinitialized');
        
        isOpened.value = false
        selectedItem.value = unref(dropdown.initialValue)
        dropdown.onInitialItemSet?.(selectedItem.value);
    }

    function plainOpen() {
        isOpened.value = true        
    }

    function open() {
        isOpened.value = true
        if (dropdown.clearSelectionOnOpening) removeSelectedItem()
    }

    function close() {
        isOpened.value = false
    }

    function toggle() {
        isOpened.value ? close() : open()
    }

    /**
     * Selects item and calls on selection
     * @param item 
     */
    function selectItem(item: T) {
        selectedItem.value = item
        dropdown.onItemSelection?.(item)
    }

    function removeSelectedItem() {
        dropdown.onSelectedItemRemoval?.(selectedItem.value)
        selectedItem.value = undefined
    }

    function setToFirstSuggestion() {
        const firstSuggestion = filteredItems.value?.[0]

        if (firstSuggestion) selectItem(firstSuggestion)
    }

    watch(isOpened, (newVal) => {
        if (newVal) dropdown.onOpen?.()
        else dropdown.onClose?.()
    })

    if (dropdown.searchInput)
        watch(dropdown.searchInput, (newVal) => {
            if (unref(dropdown.closeOnEmptyInput) && newVal === '') close()
                
            const isInputDifferentFromSelectedItem = newVal !== selectedItem.value
            if (unref(dropdown.openOnFilledInput) && isInputDifferentFromSelectedItem && newVal !== '') open()
        })

    if (dropdown.closeOnClickOutside && dropdown.container)
        onClickOutside(dropdown.container, () => close())

    return {
        isOpened,
        filteredItems,
        selectedItem,
        plainOpen,
        open,
        close,
        toggle,
        selectItem,
        removeSelectedItem,
        setToFirstSuggestion,
        reInitialize,
    }
}