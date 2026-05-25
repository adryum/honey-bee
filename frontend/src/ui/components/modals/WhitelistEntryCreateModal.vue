<script setup lang="ts">
import { ref, useCssModule, watch } from "vue";
import ModalBase from "./ModalBase.vue";
import { UserRoles } from "@/core/DatabaseEnums";
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
import { useI18n } from "vue-i18n";

const s = useCssModule()
const { t } = useI18n()
const props = defineProps<{}>()

const { modal, exposed } = useModalBase()
defineExpose(exposed)

const { getFormValidee, isFormValid, clear } = useFormValidator()
const { addWhitelistEntry, isAddingWhitelistEntry } = useAdminMutations()

const email = ref('')
const role = ref<UserRoles | undefined>()
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
    :label="t('modal.whitelist_entry_title')"
>
    <template #body>
        <div :class="s.body">
            <div :class="s.fields">
                <StringField
                    :class="s.email"
                    :label="t('form.label_email')"
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
                            :label="t('form.label_type')"
                            :dropdown="dropdown"
                            :selection="role"
                            :validee="getFormValidee({
                                isValid: () => !!role,
                                onClear: () => role = undefined,
                                onInitialize: () => role = undefined
                            })"
                            @input="value => role = value as UserRoles"
                            @click="dropdown.isShown.value = true"
                        />
                    </template>
                    <template #list="{ dropdown }">
                        <IconTextItem
                            v-for="item in Object.values(UserRoles).filter(type => type !== UserRoles.NOT_A_ROLE)"
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
                :text="t('button.add')"
                :disabled="!isFormValid" 
                :hide-icon="true"
                :is-submit="true"
                :is-aligned-center="true"
                :is-loading="isAddingWhitelistEntry"
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