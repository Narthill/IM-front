<template>
  <div id="q-app">
      <transition name="fade" mode="out-in">
      <!-- <keep-alive> -->
        <router-view/>
      <!-- </keep-alive> -->
    </transition>
    <!-- <q-ajax-bar color="primary"/> -->
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      // transitionName: 'slide-left'
    };
  },
  // watch: {
  //   $route(to, from) {
  //     console.log(to.path)
  //     console.log(from.path)
  //     const toDepth = to.path.split("/").length;
  //     const fromDepth = from.path.split("/").length;
  //     console.log(toDepth)
  //     console.log(fromDepth)
  //     this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
  //   }
  // }
};
</script>

<style>
</style>
