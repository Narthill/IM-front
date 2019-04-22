// import something here

// leave the export, even if you don't use it
export default ({ router, store, Vue }) => {
  // 路由拦截器
  router.beforeEach((to, from, next) => {
    if(to.path==='/'){
      next({ path: '/login'})
    }

    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
      if (sessionStorage.token) {  // 获取当前的token是否存在
        console.log("token存在");
        next();
      } else {
        console.log("token不存在");
        next({
          path: '/login', // 将跳转的路由path作为参数，登录成功后跳转到该路由
          query: {redirect: to.fullPath}
        })
      }
    }
    else { // 如果不需要权限校验，直接进入路由界面
      next();
    }
  })
}
