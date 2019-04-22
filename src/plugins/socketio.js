import io from 'socket.io-client'



// leave the export, even if you don't use it
export default ({ app, router, Vue, store}) => {
  var socket;
  router.afterEach((to, from) => {
    if (to.meta.requireAuth) {
      console.log(sessionStorage.isConnect)
      // 如果没连接
      var isConnect=JSON.parse(sessionStorage.getItem('isConnect'))
      if(!isConnect){
        var opt = {
          query: "token=" + sessionStorage.token
        };
    
        socket = io.connect("http://192.168.1.5:9099", opt);
      
        socket.on("connect", function() {
          console.log("连接服务器成功");
        });
      
        socket.on("chatEvent", function(data) {
          console.log("接收信息:"+data);
          data.sent=false;
          store.state.chatRoom.messages.push(data)
          console.log(store.state.chatRoom.messages);
          
        });
      
        socket.on("disconnect", function() {
          console.log("下线成功");
        });

        sessionStorage.isConnect=true
        Vue.prototype.$socket = socket
      }
    }

    // 在不需要权限的界面如果有连接就断开
    if (!to.meta.requireAuth) {
      if(typeof(socket)==='object'){
          socket.disconnect();
      }
    }
 
  })

  // 
}
