<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>正负条形图</span>
            <sub-btn url="/api/addSub" :params="{token:this.$store.getters.Userinfo.token,chartstr}" :disabled="disable1"></sub-btn>
        </div>
        <div class="box-body">
            <e-chart :option="option" :height="300"></e-chart>
        </div>
    </el-card>
</template>
<script>
import SubBtn from '../../components/SubBtn';
import EChart from '../../components/Echart';
export default {
    data(){
        return {
            chartstr: 'histogram-4',
        }
    },
    computed:{
        disable1(){
            return Array.isArray(this.$store.getters.Userinfo.subList)&&this.$store.getters.Userinfo.subList.indexOf(this.chartstr)!=-1;
        },
        option(){
            return {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    data: ['利润', '支出', '收入']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'value'
                    }
                ],
                yAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            show: false
                        },
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    }
                ],
                series: [
                    {
                        name: '利润',
                        type: 'bar',
                        label: {
                            show: true,
                            position: 'inside'
                        },
                        data: [200, 170, 240, 244, 200, 220, 210]
                    },
                    {
                        name: '收入',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            show: true
                        },
                        data: [320, 302, 341, 374, 390, 450, 420]
                    },
                    {
                        name: '支出',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            show: true,
                            position: 'left'
                        },
                        data: [-120, -132, -101, -134, -190, -230, -210]
                    }
                ]
            }
        }
    },
    components:{
      SubBtn,
      EChart
    }
}
</script>
<style lang="scss" scoped>

</style>