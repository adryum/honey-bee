<script setup lang="ts">
import { ref, useCssModule } from 'vue';
import { Role } from '@/core/DatabaseEnums';
import PopupFrame from './PopupFrame.vue';
import { SVG } from '@/assets/svgs/SVGLoader';
import LabeledInputField from '../input/fields/LabeledInputField.vue';
import ModularDropdown from '../input/dropdowns/ModularDropdown.vue';
import SelectedTextHead from '../input/dropdowns/dropdownItems/top/SelectedTextHead.vue';
import IconTextItem from '../input/dropdowns/dropdownItems/bottom/IconTextItem.vue';
import IconTextButton from '../input/buttons/IconTextButton.vue';
import type { AddToWhitelistRequestModel } from '@/core/api/Models';
import { useAdminMutations } from '@/core/composables/useAdmin';
import { useFormValidator } from '@/core/composables/useFormValidator';

const s = useCssModule()
const props = defineProps<{}>()

const email = ref('')
const role = ref<Role | undefined>()
const isEnabled = ref<boolean>(true)
    
const { getFormValidee, isFormValid } = useFormValidator()
const { addWhitelistEntry } = useAdminMutations()
async function add() {
    const payload: AddToWhitelistRequestModel  = {
        email: email.value,
        role: role.value!,
        isEnabled: isEnabled.value
    }
    
    addWhitelistEntry(payload, {
        onSuccess: () => close()
    })
}
</script>

<template>
<PopupFrame 
    label="Add Whitelist Entry"
>
    <template #body>
        
    </template>
</PopupFrame>
</template>

<style module lang='sass'>

</style>