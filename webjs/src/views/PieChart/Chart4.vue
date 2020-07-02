<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>南丁格尔玫瑰图</span>
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
            chartstr: 'piechart-4',
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
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    left: 'center',
                    top: 'bottom',
                    data: ['rose1', 'rose2', 'rose3', 'rose4', 'rose5', 'rose6', 'rose7', 'rose8']
                },
                series: [
                    {
                        name: '面积模式',
                        type: 'pie',
                        radius: [30, 110],
                        center: ['50%', '50%'],
                        roseType: 'area',
                        data: [
                            {value: 10, name: 'rose1'},
                            {value: 5, name: 'rose2'},
                            {value: 15, name: 'rose3'},
                            {value: 25, name: 'rose4'},
                            {value: 20, name: 'rose5'},
                            {value: 35, name: 'rose6'},
                            {value: 30, name: 'rose7'},
                            {value: 40, name: 'rose8'}
                        ]
                    }
                ]
            };
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