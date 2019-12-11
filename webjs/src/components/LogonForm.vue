<template>
  <el-form :model="logonForm" status-icon :rules="logoTest" ref="logonForm" label-width="80px" class="demo-ruleForm">
  <el-form-item label="用户名" prop="ID">
    <el-input v-model="logonForm.ID" placeholder="ID为6-8位字符，包含数字字母下划线" auto-complete="off"></el-input>
  </el-form-item>
  <el-form-item label="邮箱" prop="email">
    <el-input v-model="logonForm.email" placeholder="邮箱"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="pass">
    <el-input type="password" v-model="logonForm.pass" auto-complete="off" placeholder="密码为6-8位字符，包含数字字母下划线"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="logonForm.checkPass" auto-complete="off" placeholder="再次输入密码"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('logonForm')">提交</el-button>
    <el-button @click="resetForm('logonForm')">重置</el-button>
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
                callback(new Error('请输入正确格式密码'));
            } else {
                if (this.logonForm.checkPass !== '') {
                    this.$refs.logonForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.logonForm.pass) {
                callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
        var checkID = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'));
            } else if (!/^[\w\d_]{6,8}$/.test(value)) {
                callback(new Error('请输入正确格式用户名'));
            } else {
                // 异步请求验证用户名重复与否
                // callback('该用户名已有人注册，请更换重试'); or callback('网络状况不佳，无法验证用户名');
                axios.get('/api/testUniqueID', {
　　                params: {ID:value}
                }).then(res => {
                    if(!res.data){
                        callback('网络状况不佳，无法验证用户名');
                        return;
                    }
                    if(res.data.code=='003'){
                        callback('该用户名已有人注册，请更换重试');
                        return;
                    }
                    callback();
                })
            }
        }
        return {
            logonForm: {
                ID: '',
                pass: '',
                checkPass: '',
                email: ''
            },
            logoTest: {
                pass: [
                    { required: true, validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { required: true, validator: validatePass2, trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
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
                const {ID,pass,email}= this.logonForm
                axios.post('/api/logon',{ID,pass,email}).then(res => {
                    if(!res.data){
                        this.$message.error('请求出错！');
                        return;
                    }
                    if(res.data.code!=='000'){
                        this.$message.error(res.data.info);
                        return;
                    }
                    this.$message({
                        message: '注册成功！',
                        type: 'success'})
                    this.resetForm(formName);
                    this.exchange();
                })
            } else {
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    props:{
        exchange: Function
    }
  }
</script>

<style lang="scss">

</style>