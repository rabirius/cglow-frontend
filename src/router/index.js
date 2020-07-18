import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'CgLow',
      metaTags: [
        {
          name: 'description',
          content: 'CgLow Online Judge'
        },
        {
          property: 'og:description',
          content: 'CgLow Online Judge'
        }
      ]
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta: {
      title: 'CgLow - Login',
      metaTags: [
        {
          name: 'description',
          content: 'Login to cglow'
        },
        {
          property: 'og:description',
          content: 'Login to cglow'
        }
      ]
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/auth/github',
    name: 'github',
    component: () => import('../views/AuthGithub.vue')
  },
  {
    path: '*',
    name: '404',
    component: () => import('../views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login', '/register', '/auth/github']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  // This goes through the matched routes from last to first, finding the closest route with a title.
  // eg. if we have /some/deep/nested/route and /some, /deep, and /nested have titles, nested's will be chosen.
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title)

  // Find the nearest route element with meta tags.
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags)
  // eslint-disable-next-line no-unused-vars
  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.metaTags)

  // If a route with a title was found, set the document (page) title to that value.
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title

  // Remove any stale meta tags from the document using the key attribute we set below.
  Array.from(
    document.querySelectorAll('[data-vue-router-controlled]')
  ).map(el => el.parentNode.removeChild(el))

  // Skip rendering meta tags if there are none.
  if (!nearestWithMeta) return next()

  // Turn the meta tag definitions into actual elements in the head.
  nearestWithMeta.meta.metaTags
    .map(tagDef => {
      const tag = document.createElement('meta')

      Object.keys(tagDef).forEach(key => {
        tag.setAttribute(key, tagDef[key])
      })

      // We use this to track which meta tags we create, so we don't interfere with other ones.
      tag.setAttribute('data-vue-router-controlled', '')

      return tag
    })
    // Add the meta tags to the document head.
    .forEach(tag => document.head.appendChild(tag))

  next()
})

export default router
