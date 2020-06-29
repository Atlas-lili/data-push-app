<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>Bar with Background</span>
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
            chartstr: 'histogram-2',
        }
    },
    computed:{
        disable1(){
            return Array.isArray(this.$store.getters.Userinfo.subList)&&this.$store.getters.Userinfo.subList.indexOf(this.chartstr)!=-1;
        },
        option(){
            return {
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [120, 200, 150, 80, 70, 110, 130],
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(220, 220, 220, 0.8)'
                    }
                }]
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