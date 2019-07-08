<template>
    <div class="roomcreate">
        <el-form :model="form" label-width="100px" >
      <el-form-item label="房间名称">
        <el-input v-model="form.room_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="房间描述">
        <el-input v-model="form.room_desc" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">创建</el-button>
      </el-form-item>
    </el-form>
    </div>
</template>

<script>
import { createRoom } from '../api'
export default {
    data () {
        return {
            form: {
                room_name: '',
                room_desc: ''
            }
        }
     
    },

    methods: {
         async submit () {
      const { data } = await createRoom(this.form.room_name, this.form.room_desc)
      console.log(data)
      if (data.code === 401) return this.$message.error(data.err)
      this.$message.success('房间创建成功')
      // 修改导航条上的房间id
      this.$store.commit('setRoomId', data.data.id)
      // 跳转首页
      this.$router.push('/room/' + data.data.id)
    }
  }
}

</script>

