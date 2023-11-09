<template>
  <LoadingIcon class="mx-auto w-16" />
</template>
<script lang="ts" setup>
import LoadingIcon from '@/components/LoadingIcon.vue'
import { useStore } from '@/stores/main'

const router = useRouter()
const { isAuthenticated } = useStore()

onMounted(() => {
  if (isAuthenticated) {
    console.log('arrived on callback page with an existing user, so going home')
    setTimeout(() => {
      router.push('/')
    }, 0)
  }
})
</script>
