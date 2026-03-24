<script setup lang="ts">
import { ref, useCssModule } from "vue";
import ModalBase from "./ModalBase.vue";
import { Role } from "@/core/DatabaseEnums";
import type { AddToWhitelistRequestModel } from "@/core/api/Models";
import { useAdminMutations } from "@/core/composables/useAdmin";
import { useFormValidator } from "@/core/composables/useFormValidator";
import { SVG } from "@/assets/svgs/SVGLoader";
import { useModalBase } from "@/core/composables/useModalBase";
import ModularDropdown from "../input/dropdowns/ModularDropdown.vue";
import SelectedTextHead from "../input/dropdowns/dropdownItems/top/SelectedTextHead.vue";
import IconTextItem from "../input/dropdowns/dropdownItems/bottom/IconTextItem.vue";
import LabeledInputField from "../input/fields/LabeledInputField.vue";
import IconTextButton from "../input/buttons/IconTextButton.vue";

const s = useCssModule()
const props = defineProps<{}>()

const { modal, exposed } = useModalBase()
defineExpose(exposed)

const { getFormValidee, isFormValid } = useFormValidator()
const { addWhitelistEntry } = useAdminMutations()

const email = ref('')
const role = ref<Role | undefined>()
const isEnabled = ref<boolean>(true)
        
async function add() {
    const payload: AddToWhitelistRequestModel  = {
        email: email.value,
        role: role.value!,
        isEnabled: isEnabled.value
    }
    
    addWhitelistEntry(payload, {
        onSuccess: () => modal.value?.close()
    })
}
</script>

<template>
<ModalBase
    ref="modal"
    label="Add Whitelist entry"
>
    <template #body>
        <div :class="s.body">
            <div :class="s.fields">
                <LabeledInputField 
                    label="Email"
                    :class="s.email"
                    :validee="getFormValidee(() => !!email)"
                    v-model:input="email"
                />
                <ModularDropdown
                    label="Role"
                    :class="s.role"
                    :teleport-target-id="modal?.id"
                >
                    <template #head="{dropdown}">
                       <SelectedTextHead
                            :selection="role"
                            :dropdown="dropdown"
                            :validee="getFormValidee(() => !!role)"
                        />
                    </template>
                    <template #list="{ dropdown }">
                        <IconTextItem
                            v-for="item in Object.values(Role).filter(type => type !== Role.NOT_A_ROLE)"
                            :options="{
                                svg:  SVG.Apiaries,
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
                :is-submit="true"
                :is-aligned-center="true"
                @click="add"
            />
        </div>
    </template>
</ModalBase>
</template>

<style module lang="sass">
.container

.body
    display: flex
    flex-direction: column
    gap: .5rem
    width: 35rem
    padding: 1rem

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