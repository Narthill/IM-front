<template>
  <q-page class="login-input row justify-center  layout-padding q-mt-xl ">
    <div style="width:300px; max-width: 90vw;">
      <q-field icon="account_circle" :error="error"  class="q-mt-sm">
        <q-input v-model="registerInfo.username" color="cyan-9" type="text" float-label="用户名"/>
      </q-field>
      <q-field icon="email" :error="error2"  class="q-mt-sm">
        <q-input v-model="registerInfo.email" color="cyan-9" type="text" float-label="邮箱"/>
      </q-field>
      <q-field icon="lock" :error="error3"  class="q-mt-sm">
        <q-input v-model="registerInfo.password" color="cyan-9" type="password" float-label="密码"/>
        <q-input  v-model="confirmPassword" @keyup.enter="register" color="cyan-9" type="password" float-label="验证密码"/>
      </q-field>

      <q-btn color="red-5" class="full-width q-mt-md" @click="register()" label="注册"/>
      <q-btn color="cyan-9" class="full-width q-mt-sm" @click="goToLogin()" label="返回"/>
    </div>
  </q-page>
</template>

<script>
export default {
  name: "PageRegister",

  data() {
    return {
      registerInfo: {
        email: "",
        username: "",
        password: ""
      },
      confirmPassword:"",
      error: false,
      error2: false,
      error3: false,
    };
  },
  methods: {
    register() {
      this.$axios
        .post("http://localhost:5000/api/user/register", {
          email: this.registerInfo.email,
          password: this.registerInfo.password,
          username: this.registerInfo.username
        })
        .then(response => {
          console.log(response);
          this.$q.notify({
            type: "positive",
            position: "bottom-right",
            message: "注册成功,1S后跳转"
          });
          setTimeout(() => {
            this.$router.push({ path: "/login" });
          }, 1000);
        })
        .catch(error => {
          if (error.response.data.statusText === "重名") {
            this.$q.notify({
              type: "negative",
              position: "bottom-right",
              message: "重名,注册失败,请重新注册"
            });
          } else {
            this.$q.notify({
              type: "negative",
              position: "bottom-right",
              message: "位置错误,注册失败"
            });
          }
        });
    },
    goToLogin() {
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style lang="stylus" scope>
</style>
