<template>
    <el-row :gutter="20">
        <el-col :span="24">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
            <span>近日天气</span>
            <sub-btn url="/api/addSub" :params="{token:this.$store.getters.Userinfo.token,chartstr:this.city+'-WeatherHistory'}" :disabled="disable1"></sub-btn>
            </div>
            <div class="box-body">
                <e-chart :option="option" :height="400"></e-chart>
            </div>
        </el-card>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
.box-card{
  margin: 0 auto;
  width: 1080px;
}
</style>

<script>
import axios from 'axios'
import EChart from './Echart'
import subBtn from './SubBtn'
export default {
    data() {
        return {
            timeLine: {
                type: 'category',
                data: [],
                axisTick: {
                    alignWithLabel: true
                }
            },
            maxTmpLine: {
                name: '最高气温',
                type: 'line',
                stack: '最高气温',
                itemStyle: {
                    color: '#ff0000'
                },
                data: []
            },
            minTmpLine: {
                name: '最低气温',
                type: 'line',
                stack: '最低气温',
                itemStyle: {
                    color: '#3300FF'
                },
                data: []
            },
            humLine: {
                name: '相对湿度',
                type: 'bar',
                stack: '相对湿度',
                itemStyle: {
                    color: '#5793f3'
                },
                yAxisIndex: 1,
                data: []
            }
        }
    },
    watch:{
        city: {
            immediate: true,
            handler (val) {
                this.getHistory(val)
            }
        }
    },
    computed:{
        disable1(){
            var chartstr = this.city+'-WeatherHistory'
            if(Array.isArray(this.$store.getters.Userinfo.subList)&&this.$store.getters.Userinfo.subList.indexOf(chartstr)!=-1){
                return true;
            }
            return false;
        },
        option() {
            return {
                title: {
                    text: '未来几天温湿度变换',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        nimation: false,
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data: ['最高气温', '最低气温', '相对湿度'],
                    left: '12%',
                    top: '6%'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    this.timeLine
                ],
                yAxis: [{
                    type: 'value',
                    name: '气温/摄氏度'
                }, {
                    axisLine: {
                        lineStyle: {
                            color: '#5793f3'
                        }
                    },
                    type: 'value',
                    name: '相对湿度/百分比',
                    position: 'right'
                }],
                series: [
                    this.maxTmpLine,
                    this.minTmpLine,
                    this.humLine
                ]
            };
        }
    },
    methods:{
        getHistory(city){
            axios.get('/api/history', {params: {city,}}).then(res => {
                if(res.data.code!=='000'){
                    this.$message.error(res.data.info);
                } else {
                    this.timeLine.data = [];
                    this.maxTmpLine.data = [];
                    this.minTmpLine.data = [];
                    this.humLine.data = [];
                    for (let item of res.data.data) {
                        this.timeLine.data.push(item.date);
                        this.maxTmpLine.data.push(item.tmp_max);
                        this.minTmpLine.data.push(item.tmp_min);
                        this.humLine.data.push(item.hum);

                    }
                }
            })
        }
    },
    mounted: function() {
    },
    created: function(){
        this.getHistory(this.city)
    },
    components:{
        subBtn,
        EChart
    },
    props:{
        city: { type: String, required: true }
    }
}


</script>