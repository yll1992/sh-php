<template>
  <div id="app">
  <el-container>
    <el-header>
          <el-menu
            :router="true"
            default-active="/"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
          <el-menu-item index="/">首页</el-menu-item>
            <template v-if="username !==''">
                  <el-menu-item >您好，{{username}}</el-menu-item>
                <el-menu-item v-if="roomsId !==0" :index="'/room/'+roomsId">我的房间</el-menu-item>
                <el-menu-item v-else index="/roomcreate">创建房间</el-menu-item>
                <el-menu-item @click="logout1">退出</el-menu-item>
            </template>
            <template v-else>
          <el-menu-item index="/regist">注册</el-menu-item>
          <el-menu-item index="/login">登录</el-menu-item>
          </template>
        </el-menu>
    </el-header>
    <el-main>
      <router-view></router-view>
      </el-main>
  </el-container>
  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
  created () {
    // 先获取用户信息
    this.getUserInfo()
  },

  computed: {
    ...mapState(['username','roomsId'])
  },

  methods: {
    ...mapActions(['logout','getUserInfo']),

    logout1 () {
      this.logout()
      console.log(this.username)
      this.$router.push('/')
    }

  }
}
</script>


<style>
.app .el-header{
   background-color: #545c63;
}

.app .el-header .el-menu{
    width: 50%;
    margin: 0 auto;
}
  
   
</style>


