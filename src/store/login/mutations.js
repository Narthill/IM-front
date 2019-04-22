// export function pushUserInfo(state, userInfo) {
//     state.userInfo = userInfo;
// }
import axios from "axios";

export function set_userInfo(state, token) {
  sessionStorage.token = token;
  sessionStorage.isConnect=false;
  axios.get("/user/getInfo").then(response => {
    sessionStorage.setItem('userInfo', JSON.stringify(response.data));
    console.log("得到个人数据成功");
    
  });
}

export function del_userInfo(state) {
//   state.token = "";
//   state.userInfo = "";
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("userInfo");
  sessionStorage.removeItem("isConnect");
}
