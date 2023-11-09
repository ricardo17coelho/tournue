<template>
  <v-text-field
    v-bind="$attrs"
    :append-inner-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
    :rules="rules"
    :type="show ? 'text' : 'password'"
    name="field-password"
    label="Password"
    @click:append-inner="show = !show"
  ></v-text-field>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import validationRules from '@/utils/validations/rules'

defineProps({
  rules: {
    type: Array,
    default: () => [
      validationRules.ruleRequired,
      (v) => validationRules.ruleMinLength(v, 8),
    ],
  },
})

const show = ref(false)
</script>
