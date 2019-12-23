<template>
    <el-button v-if="havaLoged" @click="sub" style="float: right; padding: 3px 0" type="text" :disabled="disabled">订阅</el-button>
</template>

<script>
import axios from 'axios'
export default {
    computed:{
		havaLoged(){
            return (this.$store.getters.Userinfo.token)?true:false
        }
    },
    methods:{
        sub(){
            axios.post(this.url,this.params).then(res => {
                if(!res.data){
                    this.$message.error('请求出错！');
                    return;
                }
                if(res.data.code!=='000'){
                    this.$message.error(res.data.info);
                    return;
                }
                this.$message({
                    message: '订阅成功！',
                    type: 'success'})
                this.$store.commit('assignUserinfo',{subList:res.data.data})
            })
        }
    },
    props:{
        params:Object,
        url:String,
        disabled: Boolean
    }
}
</script>

<style>

</style>template