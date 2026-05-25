<script setup lang="ts">
import { useCssModule, ref } from 'vue';
import IconTextButton from '../input/buttons/IconTextButton.vue';
import { useFormValidator } from '@/core/composables/useFormValidator';
import ModalBase from './ModalBase.vue';
import { useModalBase } from '@/core/composables/useModalBase';
import { isValidValue } from '@/core/utils/others';
import { useQueenMutations } from '@/core/composables/useQueen';
import DateField from '../input/fields/used/DateField.vue';
import ModularDropdown from '../input/dropdowns/ModularDropdown.vue';
import { useSpeciesQuery } from '@/core/composables/useSpecies';
import type { QueenModelDB, SpeciesModelDB } from '@/core/stores/Models';
import ImageDropZone from '../input/fields/ImageDropZone.vue';
import StringFieldTopPart from '../input/dropdowns/dropdownItems/top/StringFieldTopPart.vue';
import { imageUrlToFile } from '@/core/utils/Utils';
import { useI18n } from 'vue-i18n';

const s = useCssModule()
const { t } = useI18n()
const props = defineProps<{
    hiveId: number,
    queen:  QueenModelDB
}>()

const emits = defineEmits<{
    submit: []
}>()

const { modal, exposed } = useModalBase()
defineExpose(exposed)

const { update, isUpdatingQueen } = useQueenMutations()
const { species } = useSpeciesQuery()

const { getFormValidee, isFormValid, onInitialization } = useFormValidator()

const image     = ref<File | undefined>()
const bornDate  = ref<string | undefined>()
const specie = ref<SpeciesModelDB | undefined>()
const specieSearchName = ref('')

onInitialization(async () => {
    image.value = props.queen.imageUrl ? await imageUrlToFile(props.queen.imageUrl, "queen") : undefined
})

async function updateQueen() {
    if (!isFormValid.value 
    || !isValidValue(props.hiveId)) return
    
    update({
        id:        props.queen.id,
        image:     image.value,
        bornDate:  new Date(bornDate.value!),
        speciesId: specie.value!.id,
    }, {
        onSuccess: () => {
            emits('submit')
            modal.value?.close();
        } 
    })
}
</script>

<template>
<ModalBase
    ref="modal"
    :label="t('modal.edit_queen_title')"
>
    <template #body>
    <div :class="s.grid">
        <ImageDropZone
            :class="s.image"
            v-model:imageFile="image"
        />
        <DateField
            :label="t('form.label_born')"
            :formValidee="getFormValidee({
                isValid: () => !!bornDate,
                onClear: () => bornDate = '',
                onInitialize: () => bornDate = queen.bornDate.toDDMMYYYY('-')
            })"
            v-model="bornDate"
        />

        <ModularDropdown
            :teleportTargetId="modal?.id"
        >
            <template #head="{ dropdown }">
                <StringFieldTopPart
                    :label="t('form.label_specie')"
                    :selection="specieSearchName"
                    :dropdown="dropdown"
                    :validee="getFormValidee({
                        isValid: () => !!specieSearchName,
                        onClear: () => specieSearchName = '',
                        onInitialize: () => specieSearchName = queen.species.scientificName
                    })"
                    @input="value => specieSearchName = value"
                />
            </template>
            <template #list="{ dropdown }">
                <p
                    v-if="!species?.length"
                    :class="s.item"
                    @click="dropdown.isShown.value = false"
                >{{ t('message.no_species') }}</p>

                <p
                    v-for="loopSpecie in species"
                    :class="s.item"
                    @click="specie = loopSpecie; specieSearchName = loopSpecie.scientificName; dropdown.isShown.value = false"
                >
                    {{ loopSpecie.scientificName }}
                </p>
            </template>
        </ModularDropdown>

        <IconTextButton 
            :text="t('button.add')"
            :disabled="!isFormValid" 
            :is-aligned-center="true"
            :is-submit="true"
            :hide-icon="true"
            :is-loading="isUpdatingQueen"
            @click="updateQueen" 
        />
    </div>
    </template>
</ModalBase>
</template>

<style module lang = 'sass'>

.item
    display: flex
    gap: .5rem
    height: 3rem
    display: flex
    align-items: center

    font-family: var(--font-family)
    font-size: var(--font-size-medium)
    font-weight: 400
    letter-spacing: .02em

    padding: .5rem 1rem
    box-sizing: border-box

    cursor: pointer
    transition: .1s

    .hives
        margin-left: auto
        gap: .5rem
        display: flex
        align-items: center

    &:hover
        background: var(--secondary)



.grid
    display: flex
    flex-direction: column
    flex: 1
    gap: 1rem
    padding: 1rem
    // height: calc( 25.5rem - 2.5rem - 2rem)
    width: 30rem

    .image
        height: 20rem

    .firstRow
        display: flex
        gap: 1rem

        .dropdown
            flex: 1

        .title
            flex: 5

    .buttons
        display: flex
        gap: 1rem

        & > *
            flex: 1
    
</style>