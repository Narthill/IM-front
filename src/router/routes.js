const routes = [
  {
    path: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') },
      { path: 'register', component: () => import('pages/Register.vue') }
    ]
  },
  {
    path: '/index',//主页面
    component: () => import('layouts/IndexLayout.vue'),
    children: [
      {
        path: '', name: 'contacts', components: { default: () => import('pages/Contacts.vue')}, meta: {requireAuth: true}
      },
      {
        path: 'groups', name: 'groups', components: { default: () => import('pages/Groups.vue') }, meta: {requireAuth: true}
      }
    ]
  },
  {
    path:'/ChatRoom/:targetId',
    component: () => import('layouts/ChatRoomLayout.vue'),
    meta: {requireAuth: true}
  }

]



// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}



export default routes
