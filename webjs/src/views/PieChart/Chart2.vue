<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>甜甜圈饼图</span>
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
            chartstr: 'piechart-2',
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
                tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            legend: {
                orient: 'vertical',
                left: 10,
                data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: [
                        {value: 335, name: '直接访问'},
                        {value: 310, name: '邮件营销'},
                        {value: 234, name: '联盟广告'},
                        {value: 135, name: '视频广告'},
                        {value: 1548, name: '搜索引擎'}
                    ]
                }
            ]
        }
        }
    },
    // created() {
    //     for (var i = 0; i < 100; i++) {
    //         this.xAxisData.push('类目' + i);
    //         this.value1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
    //         this.value2.push((Math.cos(i / 5) * (i / 5 -10) + i / 6) * 5);
    //     }
    // },
    components:{
      SubBtn,
      EChart
    }
}
</script>
<style lang="scss" scoped>

</style>