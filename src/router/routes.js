
import RequireAuth from '../utils/auth'

const routes = [
  {
    path: '/search',
    name: 'search',
    component: () => import('layouts/Auth.vue'),
    children: [
      { path: '', component: () => import('pages/Website/Search.vue') }
    ]
  },
  {
    path: '/transactions',
    name: 'transactions',
    component: () => import('layouts/Auth.vue'),
    children: [
      { path: '', component: () => import('pages/Website/Transactions.vue') }
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('layouts/Auth.vue'),
    children: [
      { path: '', component: () => import('pages/Website/About.vue') }
    ]
  },
  {
    path: '/how-it-works',
    name: 'How It Works',
    component: () => import('layouts/Auth.vue'),
    children: [
      { path: '', component: () => import('pages/Website/How.vue') }
    ]
  },
  {
    path: '/become-partner',
    name: 'Become a Partner',
    component: () => import('layouts/Auth.vue'),
    children: [
      { path: '', component: () => import('pages/Website/Partner.vue') }
    ]
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('layouts/Auth.vue'),
    children: [
      { path: '', component: () => import('pages/Website/Privacy.vue') }
    ]
  },
  {
    path: '/app',
    name: 'AppDownload',
    component: () => import('layouts/Auth.vue'),
    children: [
      { path: '', component: () => import('pages/Website/DownloadApp.vue') }
    ]
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import('layouts/Auth.vue'),
    children: [
      { path: '', component: () => import('pages/Website/Terms.vue') }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('layouts/Auth.vue'),
    children: [
      { path: '', component: () => import('pages/Auth/Login.vue') }
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('layouts/Auth.vue'),
    children: [
      { path: '', component: () => import('pages/Auth/Register.vue') }
    ]
  },
  {
    path: '/forgot-password',
    name: 'forgot_password',
    component: () => import('layouts/Auth.vue'),
    children: [
      { path: '', component: () => import('pages/Auth/ForgotPassword.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: RequireAuth,
    children: [
      { path: '', name: 'app', component: () => import('pages/Index.vue') },
      { path: '/chat', component: () => import('pages/Messages.vue') },
      { path: '/bulk-insert', component: () => import('pages/BulkInsert.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error/Error404.vue')
  })
}

export default routes
