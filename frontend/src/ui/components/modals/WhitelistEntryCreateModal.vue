<script setup lang="ts">
import { ref, useCssModule, watch } from "vue";
import ModalBase from "./ModalBase.vue";
import { Role } from "@/core/DatabaseEnums";
import type { WhitelistEntryCreateModel } from "@/core/api/Models";
import { useAdminMutations } from "@/core/composables/useAdmin";
import { useFormValidator } from "@/core/composables/useFormValidator";
import { SVG } from "@/assets/svgs/SVGLoader";
import { useModalBase } from "@/core/composables/useModalBase";
import ModularDropdown from "../input/dropdowns/ModularDropdown.vue";
import IconTextItem from "../input/dropdowns/dropdownItems/bottom/IconTextItem.vue";
import IconTextButton from "../input/buttons/IconTextButton.vue";
import StringField from "../input/fields/used/StringField.vue";
import StringFieldTopPart from "../input/dropdowns/dropdownItems/top/StringFieldTopPart.vue";

const s = useCssModule()
const props = defineProps<{}>()

const { modal, exposed } = useModalBase()
defineExpose(exposed)

const { getFormValidee, isFormValid, clear } = useFormValidator()
const { addWhitelistEntry } = useAdminMutations()

const email = ref('')
const role = ref<Role | undefined>()
const isEnabled = ref<boolean>(true)
        
async function add() {
    const payload: WhitelistEntryCreateModel  = {
        email: email.value,
        role: role.value!,
        isEnabled: isEnabled.value
    }
    
    addWhitelistEntry(payload, {
        onSuccess: () => modal.value?.close()
    })
}

watch(() => exposed.isOpen(), (val) => {
    if (!val) return 
    clear()
})
</script>

<template>
<ModalBase
    ref="modal"
    label="Add Whitelist entry"
>
    <template #body>
        <div :class="s.body">
            <div :class="s.fields">
                <StringField
                    :class="s.email"
                    label="Email"
                    :selection="email"
                    :validee="getFormValidee({
                        isValid: () => !!email,
                        onClear: () => email = '',
                        onInitialize: () => email = ''
                    })"
                    @input="value => email = value"
                />

                <ModularDropdown
                    :class="s.role"
                    :teleport-target-id="modal?.id"
                >
                    <template #head="{ dropdown }">
                        <StringFieldTopPart
                            label="Type"
                            :dropdown="dropdown"
                            :selection="role"
                            :validee="getFormValidee({
                                isValid: () => !!role,
                                onClear: () => role = undefined,
                                onInitialize: () => role = undefined
                            })"
                            @input="value => role = value as Role"
                            @click="dropdown.isShown.value = true"
                        />
                    </template>
                    <template #list="{ dropdown }">
                        <IconTextItem
                            v-for="item in Object.values(Role).filter(type => type !== Role.NOT_A_ROLE)"
                            :key="item"
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
                :hide-icon="true"
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