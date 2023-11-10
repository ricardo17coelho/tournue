<template>
  <LoadingIcon class="mx-auto w-16" />
</template>
<script lang="ts" setup>
import LoadingIcon from '@/components/LoadingIcon.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const { isAuthenticated } = useAuthStore()

onMounted(() => {
  if (isAuthenticated) {
    console.log('arrived on callback page with an existing user, so going home')
    setTimeout(() => {
      router.push('/')
    }, 0)
  }
})
</script>
