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
  <el-form-item label="验证码" prop="checkCode">
    <el-input v-model="logonForm.checkCode" class="check-code" auto-complete="off" placeholder="请输入邮箱验证码"></el-input>
    <el-button class="code-btn" :disabled="codeBtn.disabled" @click="sendCode">{{codeBtn.text}}</el-button>
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
                email: '',
                checkCode: ''
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
                ],
                checkCode: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ]
            },
            codeBtnStatus: 'no-email',
            codeBtn: {
                disabled: true,
                text: '获取验证码'
            }
        };
    },
    watch: {
        'logonForm.email': function(val) {
            if (/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(val)) {
                if (this.codeBtnStatus === 'no-email') {
                    this.codeBtnStatus = 'on';
                }
            } else if (this.codeBtnStatus === 'on') {
                this.codeBtnStatus = 'no-email';
            }
        },
        codeBtnStatus(val) {
            switch(val) {
                case 'no-email':
                    this.codeBtn.disabled = true;
                    this.codeBtn.text = '获取验证码';
                    break;
                case 'on':
                    this.codeBtn.disabled = false;
                    this.codeBtn.text = '获取验证码';
                    break;
                case 'loading':
                    this.codeBtn.disabled = true;
                    this.codeBtn.text = '加载中';
                    break;
                case 'timing':
                    this.codeBtn.disabled = true;
                    this.codeBtn.text = '60s后可再次获取';
                    this.timingCount(60);
                    break;
            }
        }
    },
    methods: {
        timingCount(count) {
            if(!count) {
                this.codeBtnStatus = 'on';
                return;
            }
            this.codeBtn.text = `${count}s后可再次获取`;
            setTimeout(() => {
                this.timingCount(--count)
            },1000)
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                const {ID,pass,email,checkCode}= this.logonForm
                axios.post('/api/logon',{ID,pass,email,checkCode}).then(res => {
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
        },
        sendCode() {
            this.codeBtnStatus = 'loading';
            axios.post('/api/sendCheckCode', {email: this.logonForm.email}).then(res => {
                if(res.data && res.data.code==='000'){
                    this.codeBtnStatus = 'timing';
                    return;
                } else {
                    this.codeBtnStatus = 'on';
                }
            })
        }
    },
    props:{
        exchange: Function
    }
  }
</script>

<style lang="scss">
.demo-ruleForm {
    .check-code {
        width: 50%;
    }
    .code-btn {
        margin-left: 5%;
        width: 45%;
    }
}
</style>