<template>
    <div class="regist">
     <el-form label-position="top" label-width="50px" :model="form">
        <el-form-item label="用户名">
            <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
            <el-input v-model="form.passwordC"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm">注册</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
        </el-form>
</div>
</template>

<script>
import {regist} from '../api'
export default {
    data () {
        return {
            form:{
                username:'',
                password:'',
                passwordC:''
            }
        }
    },

    methods: {
       async submitForm () {
           const res = await regist(this.form.username,this.form.password,this.form.passwordC)
           if(res.data.code !== 201){
               return this.$message.err('注册失败')
           }
           this.$message.success('注册成功')
            console.log(res.data.code)
            this.$router.push('/login')
        }
    }
}
</script>

<style>
    .regist {
        width:30%;
        margin-left: 30%;
    }
</style>


