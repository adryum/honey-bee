<script setup lang="ts">
import { ref, useCssModule } from 'vue';
import { useFormValidator } from '@/core/composables/validators/UseFormValidator';
import type { PopupData } from '@/core/utils/PopupHiarchy';
import { Role, String_to_Role } from '@/core/DatabaseEnums';
import PopupFrame from './PopupFrame.vue';
import { SVG } from '@/assets/svgs/SVGLoader';
import LabeledInputField from '../input/fields/LabeledInputField.vue';
import ModularDropdown from '../input/dropdowns/ModularDropdown.vue';
import SelectedTextHead from '../input/dropdowns/dropdownItems/top/SelectedTextHead.vue';
import IconTextItem from '../input/dropdowns/dropdownItems/bottom/IconTextItem.vue';
import IconTextButton from '../input/buttons/IconTextButton.vue';
import type { AddToWhitelistRequestModel } from '@/core/api/Models';
import type { CallbackModel } from '@/core/models/SupperModels';
import { useAdminStore } from '@/core/stores/AdminStore';

const s = useCssModule()
const props = defineProps<{}>()

const email = ref('')
const role = ref<Role | undefined>()
const isEnabled = ref<boolean>(true)
    
const formValidator = useFormValidator()
const { isFormValid } = formValidator
const adminStore = useAdminStore()
async function add() {
    try {
        const payload: AddToWhitelistRequestModel  = {
            email: email.value,
            role: role.value!,
            isEnabled: isEnabled.value
        }
        const callback: CallbackModel = {
            onSuccess: () => close(),
            onFailure: function (): void {
                throw new Error('Function not implemented.');
            }
        }

        await adminStore.addToWhiteList(payload, callback)

    } catch (error) {
        
    }
}
</script>

<template>
<PopupFrame 
    label="Add User Entry"
>
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
                <ModularDropdown
                    label="Role"
                    :class="s.role"
                >
                    <template #head="{dropdown}">
                       <SelectedTextHead
                            :selection="role"
                            :dropdown="dropdown"
                        />
                    </template>
                    <template #list="{ dropdown }">
                        <IconTextItem
                            v-for="item in Object.values(Role).filter(type => type !== Role.NOT_A_ROLE)"
                            :options="{
                                svg: SVG.Apiaries,
                                text: item.toSentenceCase()
                            }"
                            @click="role = item; dropdown.isShown.value = false"
                        /> 
                    </template>
                </ModularDropdown>
            </div>
            <IconTextButton 
                text="Add"
                :disabled="!isFormValid" 
                :svg="SVG.Plus"
                @click="add"
            />
        </div>
    </template>
</PopupFrame>
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