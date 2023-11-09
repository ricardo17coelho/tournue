<template>
  <AuthForm
    :sign-up="true"
    title="Good to have you"
    subtitle="We just need some details from you"
    email-placeholder="Enter your email"
    password-placeholder="Choose a password"
  >
    <template #actions>
      <v-card-actions class="text-sm">
        Already registered?
        <v-btn to="/signin" class="font-bold ml-2"> Sign in here!</v-btn>
      </v-card-actions>
    </template>
  </AuthForm>
</template>
<script lang="ts" setup>
import AuthForm from '@/components/AuthForm.vue'
</script>
