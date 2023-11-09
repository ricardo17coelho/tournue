import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { auth } from '@/plugins/firebase'
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
  signInWithRedirect,
  GithubAuthProvider,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
} from 'firebase/auth'
import type { User, UserProfile } from 'firebase/auth'

export const useStore = defineStore('main', () => {
  const user = ref<User | null>(null)

  const isAuthenticated = computed(() => !!user.value)

  onAuthStateChanged(auth, (u) => {
    console.warn('onAuthStateChanged', u)
    user.value = u
  })

  // in some global file
  async function getCurrentUser(): Promise<User | null> {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe()
        resolve(user)
      }, reject)
    })
  }

  async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password)
  }

  async function logout() {
    await signOut(auth)
  }

  async function passwordReset(email: string) {
    await sendPasswordResetEmail(auth, email)
  }

  async function updateUserProfile(userProfile: UserProfile) {
    await updateProfile(user.value, userProfile)
  }

  async function signUpEmail(email: string, password: string) {
    await createUserWithEmailAndPassword(auth, email, password)
    await signInWithEmailAndPassword(auth, email, password)

    await sendEmailVerification(auth.currentUser)
  }

  async function loginWithGoogle() {
    const provider = new GoogleAuthProvider()
    await signInWithRedirect(auth, provider)
  }

  async function loginWithFacebook() {
    const provider = new FacebookAuthProvider()
    await signInWithRedirect(auth, provider)
  }

  async function loginWithGithub() {
    const provider = new GithubAuthProvider()
    await signInWithRedirect(auth, provider)
  }

  async function loginWithTwitter() {
    const provider = new TwitterAuthProvider()
    await signInWithRedirect(auth, provider)
  }

  // async function loginWithPhone() {},
  //
  // async function loginWithSaml() {
  //   const provider = new SAMLAuthProvider(saml_provider_id)
  //
  //  await signInWithRedirect(auth, provider)
  // }

  return {
    user,
    isAuthenticated,
    getCurrentUser,
    login,
    logout,
    passwordReset,
    signUpEmail,
    updateUserProfile,
    // Login Providers
    loginWithGoogle,
    loginWithFacebook,
    loginWithGithub,
    loginWithTwitter,
  }
})
