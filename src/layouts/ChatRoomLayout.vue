<template>
  <q-layout class="bg-grey-12" view="hHh lPr fFf">
    <q-layout-header>
      <q-toolbar color="cyan-9">
        <q-btn flat round dense icon="keyboard_arrow_left" @click="goBack"/>
        <q-toolbar-title style="text-align:center">与{{targetName}}的会话</q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-page-container @click.native="emojiPickerVisible=false">
      <div class="layout-padding">
        <!-- <q-chat-message label="Sunday, 19th"/> -->

        <q-chat-message
          v-for="(msg,index) in filterMessages"
          :key="index"
          :name="msg.sourceName"
          avatar="statics/guy-avatar.png"
          :text="[msg.content]"
          :stamp="msg.date"
          :sent="msg.sent"
        />
      </div>
    </q-page-container>

    <q-layout-footer>
      <q-toolbar style="border-top: 1px solid #C7C7C7" class="bg-grey-12 column">
        <!-- <q-btn color="cyan-9 noshadow self-end" icon="mic"/> -->
        <div class="row" style="width:100%">
          <q-btn color="cyan-9 " class="col-1 noshadow self-end" icon="cloud_upload"/>

          <q-input
            style="width:100%"
            class="col noshadow self-end q-mx-sm"
            color="white"
            inverted-light
            flat
            v-model="newMessage.content"
            type="textarea"
            :after="[{icon: 'sentiment_satisfied', handler:openEmojiPicker }]"
          />
          <q-btn
            color="cyan-9 "
            icon="navigation"
            class="col-1 noshadow self-end"
            @click="sendMessage(newMessage)"
          />
        </div>

        <q-slide-transition style="width:100%" class="row">
          <VEmojiPicker
            class="q-mt-sm"
            labelSearch="搜索表情"
            :pack="pack"
            @select="selectEmoji"
            v-show="emojiPickerVisible"
          />
        </q-slide-transition>
      </q-toolbar>
    </q-layout-footer>
  </q-layout>
</template>

<script>
import VEmojiPicker from "v-emoji-picker";
import packData from "v-emoji-picker/data/emojis.json";

export default {
  name: "PagePointRoom",
  data() {
    return {
      pack: packData, //emoji数据
      chatFrameVisible: true, //对话框的可见性
      emojiPickerVisible: false, //emoji框可见性
      // ChatName: null,
      newMessage: {
        sourceId: "",
        sourceName: "",
        targetId: "",
        targetName: "",
        content: "",
        date: "",
        sent: false
      }
    };
  },
  computed: {
    userInfo: function() {
      // 用户信息
      return JSON.parse(sessionStorage.getItem("userInfo"));
    },
    // sourceId: function() {
    //   // 目标id
    //   return this.$route.params.targetId;
    // },
    targetId: function() {
      // 目标id
      return this.$route.params.targetId;
    },
    targetName: function() {
      // 对话框
      return this.$route.query.ChatName;
    },
    filterMessages: function() {
      // 过滤数组分配到对应的聊天框渲染
      return this.$store.state.chatRoom.messages.filter(
        item =>
          item.targetId === this.targetId || item.targetId === this.userInfo.id
      );
    }
  },
  methods: {
    selectEmoji: function(dataEmoji) {
      this.newMessage.content += dataEmoji.emoji;
    },
    sendMessage: function(newMessage) {
      if (newMessage.content !== "") {
        newMessage.date = new Date().toLocaleString();
        newMessage.sourceId = this.userInfo.id;
        newMessage.sourceName = this.userInfo.username;
        newMessage.targetId = this.targetId;
        newMessage.targetName = this.targetName;
        newMessage.sent = true;
        this.$socket.emit("chatEvent", newMessage, (desc, success) => {
          console.log(desc + " " + success);
          if (success === "success") {
            this.$store.state.chatRoom.messages.push(newMessage);
          }
        });
        this.clearNewMessage();
      }
    },
    getMessage: function() {},
    clearNewMessage() {
      this.newMessage = {
        sourceId: "",
        sourceName: "",
        targetId: "",
        targetName: "",
        content: "",
        date: "",
        sent: false
      };
    },
    openEmojiPicker: function() {
      // 打开emoji
      this.emojiPickerVisible = !this.emojiPickerVisible;
    },
    // 返回路由
    goBack: function() {
      this.$router.back();
    }
  },
  components: {
    VEmojiPicker
  }
};
</script>

<style scope>
.q-layout-footer {
  box-shadow: none;
}
.noshadow {
  box-shadow: none;
}
</style>
