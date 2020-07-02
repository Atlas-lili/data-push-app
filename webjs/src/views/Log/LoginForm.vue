<template>
  <el-form :model="loginForm" status-icon :rules="logoTest" ref="loginForm" label-width="80px" class="demo-ruleForm">
  <el-form-item label="ID" prop="ID">
    <el-input v-model="loginForm.ID" placeholder="用户名或邮箱地址" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="loginForm.pass" auto-complete="off" placeholder="密码为6-8位字符，包含数字字母下划线"></el-input>
  </el-form-item>
  <el-form-item justify="center">
    <el-button type="primary" @click="submitForm('loginForm')">登录</el-button>
  </el-form-item>
</el-form>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else if (!/^[\w\d_]{6,8}$/.test(value)) {
                callback(new Error('请输入正确密码'));
            } else {
                callback();
            }
        };
        var checkID = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入ID'));
            } else if ((!/^[\w\d_]{6,8}$/.test(value)&&
                (!/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(value)))) {
                callback(new Error('请输入正确ID'));
            } else {
                callback();
            }
        }
        return {
            loginForm: {
                ID: '',
                pass: '',
            },
            logoTest: {
                pass: [
                    { required: true, validator: validatePass, trigger: 'blur' }
                ],
                ID: [
                    { required: true, validator: checkID, trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                const {ID,pass}= this.loginForm
                axios.post('/api/login',{ID,pass}).then(res => {
                    if(!res.data){
                        this.$message.error('请求出错！');
                        return;
                    }
                    if(res.data.code!=='000'){
                        this.$message.error(res.data.info);
                        this.resetForm(formName);
                        return;
                    }
                    this.$message({
                        message: '登录成功！',
                        type: 'success'})
                    this.resetForm(formName);
                    this.$store.commit('rewriteUserinfo', res.data.data)
                    this.$router.push('/Sys/histogram')
                })
            } else {
                // eslint-disable-next-line no-console
                console.error('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
  }
</script>

<style lang="scss">

</style>
