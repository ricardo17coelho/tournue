import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import { useAuthStore } from '@/stores/auth'

import LayoutAuth from '@/layouts/LayoutAuth.vue'
import LayoutDefault from '@/layouts/LayoutDefault.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/errors/NotFound.vue'),
    },
    {
      path: '/signin',
      component: LayoutAuth,
      meta: {
        requiresNoAuth: true,
      },
      children: [
        {
          path: '',
          name: 'signin',
          component: () => import('@/views/auth/SignIn.vue'),
        },
        {
          path: '/signup',
          name: 'signUp',
          component: () => import('@/views/auth/SignUp.vue'),
        },
        {
          path: '/forgotpassword',
          name: 'forgotPassword',
          component: () => import('@/views/auth/ForgotPassword.vue'),
        },
      ],
    },
    {
      path: '/',
      component: LayoutDefault,
      meta: {
        requiresAuth: true,
        showOnDrawer: true,
      },
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import('@/views/HomeView.vue'),
          meta: {
            showOnDrawer: true,
          },
        },
      ],
    },
  ],
})

router.beforeEach(async (to) => {
  const { requiresNoAuth } = to.meta
  console.warn('requiresNoAuth', requiresNoAuth)
  const { isAuthenticated, getCurrentUser } = useAuthStore()
  console.warn('isAuthenticated', isAuthenticated)
  const user = await getCurrentUser()
  console.warn('user', user)

  const isSignInRoute = to.name === 'signin'

  if (isSignInRoute && user) {
    return {
      path: '/',
    }
  }

  if (!user && !isSignInRoute && !requiresNoAuth) {
    return {
      path: '/signin',
    }
  }

  if (requiresNoAuth && isAuthenticated) {
    return {
      path: '/',
    }
  }
})

export default router
