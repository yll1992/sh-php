<template>
     <div class="login">
     <el-form label-position="top" label-width="50px" :model="form">
        <el-form-item label="用户名">
            <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm">登录</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        </el-form>
</div>
</template>

<script>
import {login} from '../api'
export default {
    data () {
        return {
            form:{
                username:'',
                password:''
            }
        }
    },

    methods: {
       async submitForm() {
           const res = await login(this.form.username,this.form.password)
           console.log(res)
           if(res.data.code == 401) {
               return this.$message.error('登录失败')
           }
           this.$message.success('登录成功')
           sessionStorage.setItem('token',res.data.token)
           this.$store.dispatch('getUserInfo')
           this.$router.push('/')
        }
    }
}
</script>


<style>
    .login {
        width:30%;
        margin-left: 30%;
    }
</style>