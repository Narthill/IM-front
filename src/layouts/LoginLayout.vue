<template>
  <q-layout view="hHh LpR lFr">
    <!-- Be sure to play with the Layout demo on docs -->
    <q-layout-header>
      <q-toolbar class="bg-cyan-9">
        <q-toolbar-title>基于websocket的IM系统</q-toolbar-title>
      </q-toolbar>
    </q-layout-header>
    <q-page-container class="bg-grey-3">
      <transition name="fade" mode="out-in">
        <keep-alive>
          <router-view/>
        </keep-alive>
      </transition>
    </q-page-container>
    <q-layout-footer class="no-shadow">
      <q-toolbar class="bg-grey-3 text-grey-8">
        <q-toolbar-title style="text-align:center;">© 2019 Narthil</q-toolbar-title>
      </q-toolbar>
    </q-layout-footer>
  </q-layout>
</template>

<script>
export default {
  name: "LoginLayout"
};
</script>

<style>
</style>
