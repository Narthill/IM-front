<template>
  <q-page class="row justify-center layout-padding q-mt-xl ">
    <div style="width:300px; max-width: 90vw;">
      <q-field icon="account_circle" :error="error" class="q-mt-sm">
        <q-input v-model="username" color="cyan-9" type="text" float-label="用户名"/>
      </q-field>
      <q-field icon="lock" :error="error2" class="q-mt-sm">
        <q-input
          v-model="password"
          color="cyan-9"
          type="password"
          @keyup.enter="login"
          float-label="密码"
        />
      </q-field>
      <q-btn color="cyan-9" class="full-width q-mt-md" @click="login()" label="登录"/>
      <q-btn color="red-5" class="full-width q-mt-sm" @click="register()" label="注册"/>
    </div>
  </q-page>
</template>
   
<script>
export default {
  name: "PageLogin",
  data() {
    return {
      username: "",
      password: "",
      error: false,
      error2: false
    };
  },
  methods: {
    login() {
      this.$axios
        .post("/user/login", {
          username: this.username,
          password: this.password
        })
        .then(response => {
          var token = response.headers.authorization;
          // 异步事件
          // this.$store.dispatch('login/getUserInfo');
          // 同步事件
          this.$store.commit('login/set_userInfo',token);
          // console.log(JSON.parse(sessionStorage.getItem('userInfo')));
          // 路由改变
          this.$router.push({ path: "/index" });
        })
        .catch(error => {
          console.log(error);
          this.$q.notify({
            type: "negative",
            position: "bottom-right",
            message: "登录失败"
          });
        });
    },
    register() {
      this.$router.push({ path: "/login/register" });
    }
  },
  watch: {
    error(val) {
      if (val) {
        console.log(val);
        this.warning = true;
      }
    },
    error2(val) {
      if (val) {
        this.warning2 = false;
      }
    }
  }
};
</script>

<style lang="stylus" scope></style>
