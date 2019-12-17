<template>
  <div class="log-p">
    <el-container class="cont-box">
        <el-header class="H1">天气订阅平台</el-header>
        <el-main>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="登录" name="Login">
                    <login-form :exchange="exchange"></login-form>
                </el-tab-pane>
                <el-tab-pane label="注册" name="Logon">
                    <logon-form :exchange="exchange"></logon-form>
                </el-tab-pane>
            </el-tabs>
        </el-main>
    </el-container>
  </div>
</template>

<style lang="scss">
.log-p{
    width: 100vw;
    height: 100vh;
    background-image: linear-gradient(rgb(27, 29, 92) 0%, rgb(93, 66, 142) 84%);
    position: relative;
    .cont-box{
        width: 40%;
        min-height: 300px;
        background-color: white;
        border-radius: 30px;
        position: absolute;
        margin: 0 auto;
        top: 20%;
        right: 0;
        left: 0;
        header{
            color: black;
            font-weight: bold;
            height: 60px;
            line-height: 60px;
        }
        .el-main{
            padding-top:0;
            .el-tabs__nav{
                float:none;
            }
            .el-tabs__item{
                width: 50%;
                text-align: center;
            }
        }
    }
}
</style>

<script>
import LoginForm from './LoginForm'
import LogonForm from './LogonForm'

export default {
    data() {
      return {
        activeName: this.$route.name,
      }
    },
    methods:{
        handleClick(tab, event) {
            let to = event.target.id.split('tab-')[1];
            if(this.$route.name!==to){
                this.$router.replace(to)
            }
        },
        exchange(){
            let to = '';
            if (this.$route.name==='Login'){
                to = 'Logon'
            } else if (this.$route.name==='Logon'){
                to = 'Login'
            }
            this.$router.replace(to);
            this.activeName = to;
        }
    },
    components: {
        LoginForm,LogonForm
    },
    beforeRouteUpdate (to, from, next) {
        this.$data.activeName = to.name
        console.log(to.name)
        next()
    }
  }
</script>