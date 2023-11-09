<template>
  <div>
    <h2 class="mb- text-2xl font-bold">Lost your password?</h2>
    <p class="mb-4 text-sm text-slate-500">Let's sort that for you</p>
    <v-form class="flex w-full flex-col items-start" @submit.prevent="onSubmit">
      <v-text-field
        required
        :disabled="loading"
        label="Email"
        class="w-full"
        name="email"
        id="email"
        type="email"
        placeholder="Enter your email"
        v-model="email"
      />

      <v-btn
        :loading="loading"
        type="submit"
        variant="plain"
        class="bg-teal-700"
      >
        Reset
      </v-btn>
    </v-form>

    <v-row>
      <v-col>
        <v-btn to="/signup" color="secondary">Sign up</v-btn><br />
      </v-col>
      <v-col align="end">
        <VBtnPrimary to="/signin">Sign in</VBtnPrimary>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from '@/stores/main'

const { passwordReset } = useStore()

const email = ref('')
const loading = ref(false)
async function onSubmit() {
  loading.value = true
  try {
    await passwordReset(email.value)
    alert('please follow the link in your email')
  } catch (e) {
    alert(e.message)
  } finally {
    loading.value = false
  }
}
</script>
