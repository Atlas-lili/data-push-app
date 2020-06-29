<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>柱状图动画延迟</span>
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
            chartstr: 'histogram-1',
            xAxisData: [],
            value1: [],
            value2: []
        }
    },
    computed:{
        disable1(){
            return Array.isArray(this.$store.getters.Userinfo.subList)&&this.$store.getters.Userinfo.subList.indexOf(this.chartstr)!=-1;
        },
        option(){
            return {
                legend: {
                    data: ['bar', 'bar2']
                },
                tooltip: {},
                xAxis: {
                    data: this.xAxisData,
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                },
                series: [{
                    name: 'bar',
                    type: 'bar',
                    data: this.value1,
                    animationDelay: function (idx) {
                        return idx * 10;
                    }
                }, {
                    name: 'bar2',
                    type: 'bar',
                    data: this.value2,
                    animationDelay: function (idx) {
                        return idx * 10 + 100;
                    }
                }],
                animationEasing: 'elasticOut',
                animationDelayUpdate: function (idx) {
                    return idx * 5;
                }
            };
        }
    },
    created() {
        for (var i = 0; i < 100; i++) {
            this.xAxisData.push('类目' + i);
            this.value1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
            this.value2.push((Math.cos(i / 5) * (i / 5 -10) + i / 6) * 5);
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