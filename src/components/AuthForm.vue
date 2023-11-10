<template>
  <div>
    <h2 class="mb- text-2xl font-bold">
      {{ title }}
    </h2>
    <p class="mb-4 text-sm text-slate-500">
      {{ subtitle }}
    </p>
    <VBtnDev
      v-if="isDevEnv"
      class="mb-6"
      @click="
        credentials = { email: 'devel@rmorgado.ch', password: '123456789' }
      "
    >
      FakeData
    </VBtnDev>
    <v-form
      v-model="isFormValid"
      class="flex w-full flex-col items-start"
      ref="formRef"
      :validate-on="isFormValid === undefined ? 'submit' : 'input'"
      @submit.prevent="emailAuth"
    >
      <v-text-field
        v-model="credentials.email"
        required
        :disabled="loading"
        label="Email"
        name="email"
        id="email"
        type="email"
        :placeholder="emailPlaceholder"
        :rules="[validationRules.ruleRequired, validationRules.ruleEmail]"
      />
      <FieldPassword
        v-model="credentials.password"
        :disabled="loading"
        class="mb-4 w-full"
        name="password"
        id="password"
        label="Password"
        :placeholder="passwordPlaceholder"
      />

      <v-row>
        <v-col>
          <v-btn v-if="!signUp" to="/forgotpassword" variant="text">
            Forgot your password?
          </v-btn>
        </v-col>
        <v-col align="end">
          <VBtnPrimary
            :loading="emailLoading"
            :disabled="loading"
            type="submit"
          >
            {{ signUp ? 'Sign Up' : 'Sign In' }}
          </VBtnPrimary>
        </v-col>
      </v-row>
    </v-form>
    <v-row>
      <v-col>
        <v-btn
          :loading="gitHubLoading"
          :disabled="loading"
          color="black"
          @click="gitHubAuth"
        >
          <v-icon>mdi-github</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          :loading="googleLoading"
          :disabled="loading"
          color="#EA4335"
          @click="googleAuth"
        >
          <v-icon>mdi-google</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          :loading="twitterLoading"
          :disabled="true"
          color="#1DA1F2"
          @click="twitterAuth"
        >
          <v-icon>mdi-twitter</v-icon>
        </v-btn>
      </v-col>
      <v-col>
        <v-btn
          :loading="facebookLoading"
          :disabled="true"
          color="#425F9C"
          @click="facebookAuth"
        >
          <v-icon>mdi-facebook</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <slot name="actions" />
  </div>
</template>

<script lang="ts" setup>
import FieldPassword from '@/components/fields/FieldPassword.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import validationRules from '@/utils/validations/rules'
import { toast } from 'vue-sonner'
import { isDevEnv } from '@/utils'

const props = defineProps<{
  signUp: boolean
  title: string
  subtitle: string
  emailPlaceholder: string
  passwordPlaceholder: string
}>()

const isFormValid = ref(false)

const credentials = ref({
  email: '',
  password: '',
})

const router = useRouter()
const {
  loginWithFacebook,
  loginWithGithub,
  loginWithGoogle,
  loginWithTwitter,
  login,
} = useAuthStore()

const formRef = ref()

const emailLoading = ref(false)
async function emailAuth() {
  const { valid } = await formRef.value.validate()
  if (valid) {
    emailLoading.value = true
    try {
      await login(credentials.value.email, credentials.value.password)
      router.push('/')
      toast.success('Login success')
    } catch (error) {
      toast.error(error.message)
    } finally {
      emailLoading.value = false
    }
  } else {
    toast.error('Invalid form')
  }
}

const gitHubLoading = ref(false)
async function gitHubAuth() {
  gitHubLoading.value = true
  try {
    await loginWithGithub()
    router.push('/')
    toast.success('Login success')
  } catch (error) {
    toast.error(error.message)
  } finally {
    gitHubLoading.value = false
  }
}

const googleLoading = ref(false)
async function googleAuth() {
  googleLoading.value = true
  try {
    await loginWithGoogle()
    router.push('/')
    toast.success('Login success')
  } catch (error) {
    toast.error(error.message)
  } finally {
    googleLoading.value = false
  }
}

const twitterLoading = ref(false)
async function twitterAuth() {
  twitterLoading.value = true
  try {
    await loginWithTwitter()
    router.push('/')
    toast.success('Login success')
  } catch (error) {
    toast.error(error.message)
  } finally {
    twitterLoading.value = false
  }
}

const facebookLoading = ref(false)
async function facebookAuth() {
  facebookLoading.value = true
  try {
    await loginWithFacebook()
    router.push('/')
    toast.success('Login success')
  } catch (error) {
    toast.error(error.message)
  } finally {
    facebookLoading.value = false
  }
}

const loading = computed(
  () =>
    gitHubLoading.value ||
    emailLoading.value ||
    googleLoading.value ||
    twitterLoading.value ||
    facebookLoading.value
)
</script>
