<template>
  <div>
    <h5 class="text-h5 py-2">Login</h5>
    <v-form @submit.prevent="login">
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="user.email" id="email" label="E-Mail">
          </v-text-field>
        </v-col>

        <v-col cols="12">
          <v-text-field v-model="user.password" id="password" label="Password">
          </v-text-field>
        </v-col>
      </v-row>
      <v-btn type="submit">Login</v-btn>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useStore } from '@/stores/main'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()

const user = reactive({
  email: '',
  password: '',
})

watch(
  () => store.isAuthenticated,
  (user) => {
    if (user) {
      router.push({ name: 'home' })
    }
  }
)

const login = async () => {
  if (user.email && user.password) {
    await store.login(user.email, user.password)
  }
}
</script>
