<template>
  <AuthForm
    :sign-up="false"
    title="Welcome back"
    subtitle="Please enter your details"
    email-placeholder="Enter your email"
    password-placeholder="Enter your password"
  >
    <template #actions>
      <v-card-actions class="text-sm">
        Don't have an account?
        <v-btn to="/signup" class="font-bold ml-2"> Sign up here! </v-btn>
      </v-card-actions>
    </template>
  </AuthForm>
</template>
<script lang="ts" setup>
import AuthForm from '@/components/AuthForm.vue'
</script>
