<template>
    <div class="access-page">
        <div class="center">
            <h2>个性化定制</h2>
            <el-divider></el-divider>
            <el-form :inline="true">
                <el-form-item label="邮件推送">
                    <el-switch
                    @change="changeSub"
                        v-model="Userinfo.needSub"
                        active-color="#13ce66" />
                </el-form-item>
            </el-form>
            <div class='card-list'>
                <p class="none-txt" v-if="sortList.length==0">暂无订阅</p>
                <draggable v-else v-model="sortList" group="people" @start="drag=true" @end="drag=false">
                    <el-card shadow="hover" v-for="(item, index) in sortList" :key="item.EN">
                        {{item.CN}}
                        <el-button style="float: right; padding:3px;" type="primary" icon="el-icon-close" @click="deleteItem(index)" >
                        </el-button>
                    </el-card>
                </draggable>
            </div>
            <el-row class="center-btn">
                <el-col :span="12">
                    <el-button @click="()=>{this.transformList(this.subList)}">重置</el-button>
                </el-col>
                <el-col :span="12">
                    <el-button type="primary" @click="submit">提交</el-button>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import axios from 'axios'
import { mapMutations,mapGetters } from 'vuex'

var chartsMap = {
    "histogram":['', '柱状图动画延迟', 'Bar with Background', '极坐标系下的堆叠柱状图', '正负条形图']
}
export default {
    data() {
        return {
            needSub: true,
            subList: [],
            sortList:[]
        }
    },
    computed:{
        ...mapGetters([
			'Userinfo'
        ])
    },
    methods:{
		...mapMutations([
			'rewriteUserinfo'
        ]),
        changeSub(val){
            axios.post('/api/changeSub', {
                token: this.$store.getters.Userinfo.token,
                needSub: val
            }).then(res => {
                if(!res.data){
                    this.$message.error('请求出错！');
                    return;
                }
                if(res.data.code!=='000'){
                    this.$message.error(res.data.info);
                    return;
                }
                this.$message({
                    message: '配置成功！',
                    type: 'success'})
                this.$store.commit('assignUserinfo',{needSub:res.data.data})
            })
        },
        //订阅疫情修改
        transformList(list){
            if(!list.length) {
                this.subList = [];
                this.sortList = [];
            }
            this.subList = list;
            this.sortList =  list.map(item=>{
                if(!item.includes('-')){
                    return{
                        EN: item,
                        CN: item
                    }
                } else {
                    var [chartType, chartId] = item.split('-');
                    if (!this.chartsMap[chartType] || !this.chartsMap[chartType][Number(chartId)]){
                        return{
                            EN: item,
                            CN: item
                        }
                    }
                    return{
                        EN: item,
                        CN: this.chartsMap[chartType][Number(chartId)]
                    }
                }
            });
        },
        deleteItem(index){
            this.sortList.splice(index,1);
        },
        submit(){
            var arr = this.sortList.map(item=>item.EN);
            axios.post('/api/confSubList', {
                token: this.$store.getters.Userinfo.token,
                subList: arr
            }).then(res => {
                if(!res.data){
                    this.$message.error('请求出错！');
                    return;
                }
                if(res.data.code!=='000'){
                    this.$message.error(res.data.info);
                    return;
                }
                this.$message({
                    message: '配置成功！',
                    type: 'success'})
                this.$store.commit('assignUserinfo',{subList:res.data.data});
                this.transformList(res.data.data);
            })
        }
	},
    mounted: function(){
      if(this.$route.name === 'conf-sub'){
        const loading = this.$loading({
          target: '.access-page',
          lock: true,
          text: '加载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.7)'
        });
        if(this.$store.getters.Userinfo.token){
          loading.close();
        } else {
          this.$message.error('抱歉，该功能需要先登录哦！');
        }
      }
    },
    created: function (){
        this.chartsMap = chartsMap;
        this.needSub = this.Userinfo.needSub;
        this.transformList(this.Userinfo.subList);
    },
    components: {
        draggable,
    },
}
</script>

<style lang="scss">
.center{
  margin: 24px;
  .card-list{
    min-height: 200px;
    background-color: #bbb;
    color: white;
    .none-txt{
        text-align: center;
        line-height: 200px;
    }
  }
  .center-btn{
        margin:20px auto 0;
        width: 200px;
    }
}
</style>