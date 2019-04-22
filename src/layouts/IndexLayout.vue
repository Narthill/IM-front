<template>
  <q-layout view="hHh LpR lFr">
    <q-layout-header>
      <q-toolbar color="cyan-9">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu"/>
        </q-btn>

        <q-toolbar-title>
          {{chatTitle}}
          <div slot="subtitle">本次登录时间 : {{ date }}</div>
        </q-toolbar-title>
        <q-btn icon="add" round flat></q-btn>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list no-border inset-delimiter>
        <q-list-header>Setting</q-list-header>
        <q-item link @click.native="openURL('http://quasar-framework.org')">
          <q-item-side icon="school"/>
          <q-item-main label="Docs" sublabel="quasar-framework.org"/>
        </q-item>
        <q-item>
          <q-btn color="red" @click="loginOut()" class="full-width">登出</q-btn>
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <transition name="fade" mode="out-in">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </transition>
    </q-page-container>

    <q-layout-footer>
      <q-tabs color="cyan-9" align="justify">
        <q-route-tab icon="chat" to="/index" slot="title" exact/>
        <q-route-tab icon="people" to="/index/groups" slot="title" exact/>
      </q-tabs>
    </q-layout-footer>
  </q-layout>
</template>

<script>
import { openURL } from "quasar";

export default {
  name: "MyLayout",
  data() {
    return {
      leftDrawerOpen: false,
      date: new Date().toLocaleString()
    };
  },
  computed: {
    chatTitle: function() {
      if (this.$route.name === "contacts") {
        return "好友列表";
      } else {
        return "群列表";
      }
    }
  },
  methods: {
    openURL,
    loginOut() {
      this.$store.commit("login/del_userInfo");
      this.$router.push({ path: "/login" });
    }
  }
};
</script>

<style>
</style>
