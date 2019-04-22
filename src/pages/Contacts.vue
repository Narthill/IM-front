<template>
  <q-page class="row justify-center">
    <div style="width: 100%; max-width: 100vw;">
      <q-list multiline no-border link inset-separator v-for="friend in friends" :key="friend.id">
        <q-item @click.native="goToChatRoom(friend.id,friend.username)">
          <q-item-side avatar="statics/guy-avatar.png"/>
          <q-item-main
            :label="friend.username"
            label-lines="1"
            :sublabel="friend.email"
            sublabel-lines="1"
          />
          <q-item-side right>
            <q-item-tile stamp>10 min ago</q-item-tile>
          </q-item-side>
        </q-item>
      </q-list>
      <!-- 模态窗口 -->
    </div>
  </q-page>
</template>

<style scope>
</style>

<script>
export default {
  name: "PageContacts",
  data() {
    return {
      friends: null
    };
  },
  mounted: function() {
    this.$axios.get("/user/getFriendsList").then(response => {
      console.log(response.data.friends);
      this.friends = response.data.friends;
    });
  },
  methods: {
    goToChatRoom: function(targetId,targetName) {
      this.$router.push({ path: `/ChatRoom/${targetId}`,query: { ChatName: targetName }});
    }
  }
};
</script>
