<script setup lang="ts">
import { ref, useCssModule } from 'vue';
import { usePopup } from '@/core/composables/UsePopup';
import { useFormValidator } from '@/core/composables/validators/UseFormValidator';
import IconTextButton from '../input/buttons/IconTextButton.vue';
import { SVG } from '@/assets/svgs/SVGLoader';
import LabeledInputField from '../input/fields/LabeledInputField.vue';
import LabeledDropdownField from '../input/dropdowns/LabeledDropdownField.vue';

import PopupFrameSimple from './PopupFrameSimple.vue';
import type { PopupData } from '@/core/utils/PopupHiarchy';

const s = useCssModule()
const props = defineProps<{
    popupData: PopupData
}>()
const email = ref('')
const role = ref<Role | undefined>()
const isEnabled = ref<boolean>(true)
const { frameModel, close  } = usePopup({
    label: 'Add entry',
    functions: props.popupData.functions,
    info: props.popupData.info
})
const formValidator = useFormValidator()
const { isFormValid } = formValidator
// const adminStore = useAdminStore()
async function add() {
    // try {
    //     const payload: AddToWhitelistRequestModel  = {
    //         email: email.value,
    //         role: role.value!,
    //         isEnabled: isEnabled.value
    //     }
    //     const callback: ResponseCallbacks = {
    //         onSuccess: () => close()
    //     }

    //     await adminStore.addToWhiteList(payload, callback)

    // } catch (error) {
        
    // }

}
</script>

<template>
<PopupFrameSimple v-model:frame-model="frameModel">
    <template #body>
        <div :class="s.body">
            <div :class="s.fields">
                <LabeledInputField 
                    :class="s.email"
                    label="Email"
                    :options="{
                        formValidator: formValidator,
                        isRequired: true
                    }"
                    v-model:input="email"
                />
                <LabeledDropdownField 
                    label="Role"
                    :class="s.role"
                    :options="{
                        items: Object.values(Role).filter(role => role !== Role.NOT_A_ROLE) as Role[],
                        noItemsText: 'noRole',
                        validatorOptions: {
                            formValidator: formValidator,
                            isRequired: true
                        },
                        zIndex: props.popupData.info.zIndex
                    }" 
                    @on-selection="(value: any) => role = value ? string_To_Role(value) : undefined"
                />
            </div>
            <IconTextButton 
                text="Add"
                :disabled="!isFormValid" 
                :svg="SVG.Plus"
                @click="add"
            />
        </div>
    </template>
</PopupFrameSimple>
</template>

<style module lang='sass'>
.body
    display: flex
    flex-direction: column
    gap: .5rem
    width: 35rem

    .fields
        display: flex
        gap: .5rem
        .email
            width: 100%
        .role
            width: 100%

        .button
            margin-top: auto
</style>