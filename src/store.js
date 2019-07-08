import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import {userInfo} from './api'
export default new Vuex.Store({
  state: {
    username:'',
    roomsId:0
  },
  mutations: {
    setUserName(state,username){
      state.username=username
    },

    setRoomId(state,roomsId){
      state.roomsId=roomsId
    }
  },
  actions: {
   async getUserInfo(context) {
      const res= await userInfo()
      if(res.data.code ==200){
        console.log(res)
        context.commit('setUserName',res.data.username)
        context.commit('setRoomId',res.data.data)
      }
     
    },

    logout(context){
      sessionStorage.clear()
      context.commit('setUserName','')
      context.commit('setRoomId',0)
      
    }
  }
})
