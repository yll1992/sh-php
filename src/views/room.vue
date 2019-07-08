<template>
    <div class="room">
        <el-row :gutter="20">
             <el-col :span="18">
                  <h1>{{room.room_name}}</h1>
                    <div>主播：{{room.username}}</div>
                    <p>{{room.room_desc}}</p>
                     <div class="video">
                         </div>
                 </el-col>

                 <el-col :span="6" class="message-box">
                      <ul ref="mess-list">
                            <li v-for="(item,index) in messageList" :key="index"><div>{{name}}</div>{{item}}</li>
                        </ul>
                         <div class="tool">
                            <el-input @keyup.enter.native="send" v-model="content" placeholder="输入内容按回车发送"></el-input>
                        </div>
                     </el-col>
            </el-row>
    </div>
</template>

<script>
// import VueAliplayer from 'vue-aliplayer'
import { roomInfo } from '../api'
import io from 'socket.io-client'
import {mapState} from 'vuex'
export default {
   
     computed: {
    ...mapState(['username'])
  },
    created () {
        this.init()
    },

    // 监听路由参数
   watch: {
    $route: async function (to, from) {
      this.init()
    }
  },

    methods: {
       async init() {
            const res = await roomInfo(this.$route.params.id)
            console.log(res)
            this.room=res.data.data
            if(this.username !== ''){
                this.name=this.username
            }
            let token = sessionStorage.getItem('token')
            if(token == undefined){
                this.socket = io('http://localhost:3000?room_user_id=' + this.room.id);
            }else{
                this.socket = io('http://localhost:3000?room_user_id=' + this.room.id+ '&token=' + token);
            }
            this.socket.on('connect', ()=>{
                console.log('连接成功')
                })

            this.socket.on(this.room.id,data => {
                console.log(data)
                this.messageList.push(data)
            })
        },

        send () {
             // 向当前房间发消息
            this.socket.emit(this.room.id, this.content)
            // 清空输入框
            this.content = ''
            // 滚动到最后
            this.$refs['mess-list'].scrollTop = this.$refs['mess-list'].scrollHeight
         }
    },

    data () {
        return {
            socket:null,// 保存聊天服务器的对象
            name:'游客',
            messageList: [], // 接收到的消息
            content:'',//输入框中的值
            room:{}
        }
    }

}
</script>


<style>
    .room {
        height: 100%;
        width: 1100px;
        margin: 0 auto;
    }
    
    .room .el-row {
        height: 100%;
        padding: 0;
    }
    .room .el-row .video {
        height: 550px;
        width: 100%;
        background-color: #333;
    }

    .room .el-row .message-box {
         padding: 0 !important;
         height: 100%;
         position: relative;
    }

    .room .el-row .message-box ul {
         border: 1px solid #DCDFE6;
         height: 350px;
         overflow: auto;
         padding-bottom: 75px;
         box-sizing: border-box;
    }

    .room .el-row .message-box li {
        background-color: #fdf6ed;
        padding: 5px;
        font-size: 12px;
    }

    .room .el-row .message-box .tool {
         bottom: 0;
         position: absolute;
         width: 100%;
    }
</style>
