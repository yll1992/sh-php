<template>
    <div class="index">
        <el-row :gutter="20">
            <el-col :xs="12" :sm="8" :md="6" :lg="4" :span="6" v-for="(i,index) in roomsList" :key="index">
                <el-card class="box-card">
                    <router-link :to="'/room/' + i.id">
                        <p class="title">{{i.room_name}}</p>
                        <p class="desc">{{i.room_desc}}</p>
                        <p class="time">{{i.created_at}}</p>
                    </router-link>
                    </el-card>
            </el-col>
    </el-row>
        
    </div>
</template>

<script>
import {getRooms} from '../api'
export default {
    data () {
        return {
            roomsList:[]
        }
    },
   async created () {
        const res = await getRooms(1,100)
        if(res.data.code == 200){
            this.roomsList=res.data.data
        }
        console.log(res)
    }
}
</script>



<style>
   .index .el-col {
       margin-bottom: 10px;
   }

   .index .el-col .title {
       margin: 0;
       color: #cccccc;
   }

   .index .el-col .desc {
       font-size: 12px;
      color: #cccccc;
      margin: 0;
   }

     .index .el-col .time {
       font-size: 12px;
      color: #cccccc;
      margin: 0;
   }

   .index .el-col .el-card {
       height: 100px;
   }
</style>





