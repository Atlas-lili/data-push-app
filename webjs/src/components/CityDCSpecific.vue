<template>
    <el-row :gutter="20">
        <el-col :span="24">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
            <span>各县市患者转换关系</span>
            <sub-btn url="/api/addSub" :params="{token:this.$store.getters.Userinfo.token,chartstr:'CityDCSpecific'}" :disabled="disable1"></sub-btn>
            </div>
            <div class="box-body">
                <e-chart :option="option" :height="400"></e-chart>
            </div>
        </el-card>
        </el-col>
    </el-row>
</template>

<script>
import EChart from './Echart';
import subBtn from './SubBtn';
import staticdata from '../../public/epidemic.json';
async function getStatus() {
    var res = staticdata;
    return res.data;
}
export default {
    name: 'CityDCSpecific',
    data() {
        return {
            city: {},
            cityScatter: {
                type: 'scatter',
                symbolSize: 10,
                markLine: {
                    silent: true,
                    symbol: ['none', 'none'],
                    lineStyle: {
                        type: 'dashed',
                        color: 'blue'
                    },
                    label: {
                        show: true,
                        position: 'middle',
                        formatter: '死亡/治愈均衡线'
                    },
                    data: [[
                        {
                            name: '死亡/治愈均衡线',
                            coord: [0, 0]
                        },
                        {
                            coord: [0.2, 0.2]
                        }
                    ]]
                },
                data: []
            }
        };
    },
    computed: {
        disable1(){
            var chartstr = 'CityDCSpecific'
            if(Array.isArray(this.$store.getters.Userinfo.subList)&&this.$store.getters.Userinfo.subList.indexOf(chartstr)!=-1){
              return true;
            }
            return false;
        },
        option() {
            return {
                title: {
                    text: '各县（市）患者转化图',
                    left: 'center',
                    top: 0
                },
                tooltip: {
                    formatter: ({data}) => {
                        if (data.name) return data.name;
                        return `${data[3]}:(${data[0].toFixed(3)}, ${data[1].toFixed(3)})`;
                    }
                },
                visualMap: {
                    realtime: true,
                    min: 0,
                    max: 12000,
                    dimension: 2,
                    orient: 'vertical',
                    right: 10,
                    top: 'center',
                    text: ['确诊人群基数'],
                    pieces: [
                        {min: 10000, color: '#ff0000'},
                        {min: 1000, max: 9999, color: '#cc0000'},
                        {min: 500, max: 1000, color: '#CC3300'},
                        {min: 100, max: 499, color: '#CC6600'},
                        {min: 10, max: 99, color: '#CC9900'},
                        {min: 1, max: 9, color: '#CCCC00'}
                    ],
                    textStyle: {color: '#000'},
                    showLabel: true
                },
                xAxis: {
                    name: '治愈/确诊',
                    type: 'value',
                    silent: false
                },
                yAxis: {
                    name: '死亡/确诊',
                    type: 'value',
                    max: 0.2,
                    silent: false
                },
                series: [{
                    ...this.cityScatter
                }]
            };
        }
    },
    methods: {
        update() {
            getStatus()
                .then(res => {
                    if (!res) {
                        this.$toast.error('拉取数据失败！');
                        return;
                    }
                    this.catchCity(res);
                });
        },
        catchCity({area}) {
            let citiesMap = {};
            let needlessList = ['外来务工人员', '未明确地区', '外地来沪人员'];
            for (let P of area) {
                for (let C of P.cities) {
                    if (~needlessList.indexOf(C.cityName) || !C.confirmedCount) continue;
                    citiesMap[C.cityName] = C;
                }
            }
            this.city = citiesMap;
        },
        transformStatusToData() {
            for (let item in this.$options.data()) {
                if (item === 'city') {
                    continue;
                }
                this.$data[item] = this.$options.data()[item];
            }
            for (let cityName in this.city) {
                let {confirmedCount, curedCount, deadCount} = this.city[cityName];
                let deadSpecific = deadCount && deadCount / confirmedCount;
                let curedSpecific = curedCount && curedCount / confirmedCount;
                this.cityScatter.data.push([curedSpecific, deadSpecific, confirmedCount, cityName]);
            }
        }
    },
    watch: {
        city: function () {
            this.transformStatusToData();
        }
    },
    created() {
        this.update();
        this.transformStatusToData();
    },
    components: {EChart,subBtn}
};
</script>

<style lang="scss" scoped>
.box-card{
  margin: 0 auto;
  width: 1080px;
}
</style>
