<template>
  <div>
    <h2>Home</h2>
    <p>Welcome {{ authStore.user?.email }}</p>
    <button class="form-button" @click="authStore.logout">Logout</button>
  </div>
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

watch(
  () => authStore.user,
  (user) => {
    if (!user) {
      router.push({ name: 'signin' })
    }
  },
  { immediate: true }
)
</script>
