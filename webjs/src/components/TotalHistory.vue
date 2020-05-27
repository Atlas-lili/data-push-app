<template>
    <el-row :gutter="20">
        <el-col :span="24">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
            <span>全国疫情概览</span>
            <sub-btn url="/api/addSub" :params="{token:this.$store.getters.Userinfo.token,chartstr:'TotalHistory'}" :disabled="disable1"></sub-btn>
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
    name: 'TotalHistory',
    data() {
        return {
            history: [],
            timeLine: {
                type: 'category',
                // boundaryGap: false,
                data: [],
                axisTick: {
                    alignWithLabel: true
                }
            },
            diagnosedLine: {
                name: '确诊病例',
                type: 'line',
                stack: '确诊病例',
                itemStyle: {
                    color: '#ff0000'
                },
                data: []
            },
            increaseLine: {
                name: '新增确诊',
                type: 'bar',
                stack: '新增确诊',
                yAxisIndex: 1,
                itemStyle: {
                    color: '#3300FF'
                },
                data: [0]
            },
            suspectLine: {
                name: '疑似病例',
                type: 'line',
                stack: '疑似病例',
                itemStyle: {
                    color: '#FF6600'
                },
                data: []
            },
            deathLine: {
                name: '死亡人数',
                type: 'line',
                stack: '死亡人数',
                yAxisIndex: 1,
                itemStyle: {
                    color: '#CC6600'
                },
                data: []
            },
            curedLine: {
                name: '治愈人数',
                type: 'line',
                stack: '治愈人数',
                yAxisIndex: 1,
                itemStyle: {
                    color: '#00CC00'
                },
                data: []
            }
        };
    },
    computed: {
        disable1(){
            var chartstr = 'TotalHistory'
            if(Array.isArray(this.$store.getters.Userinfo.subList)&&this.$store.getters.Userinfo.subList.indexOf(chartstr)!=-1){
              return true;
            }
            return false;
        },
        option() {
            return {
                title: {
                    text: '全国疫情变化图（12天）',
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
                    data: ['确诊病例', '疑似病例', '死亡人数', '治愈人数', '新增确诊'],
                    selected: {
                        '新增确诊': false
                    },
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
                    name: '确诊|疑似',
                    max: 40000,
                    splitNumber: 8
                }, {
                    type: 'value',
                    name: '死亡|治愈|新增',
                    max: 4000,
                    splitNumber: 8,
                    position: 'right'
                }],
                series: [
                    this.diagnosedLine,
                    this.suspectLine,
                    this.deathLine,
                    this.curedLine,
                    this.increaseLine
                ]
            };
        }
    },
    watch: {
        history: function () {
            this.transformStatusToData();
        }
    },
    methods: {
        catchHistory({history}) {
            this.history = history;
        },
        catchTotal({date, diagnosed, suspect, death, cured}) {
            this.totalStatus = {date, diagnosed, suspect, death, cured};
        },
        update() {
            getStatus()
                .then(res => {
                    if (!res) {
                        this.$toast.error('拉取数据失败！');
                        return;
                    }
                    this.catchTotal(res);
                    this.catchHistory(res);
                });
        },
        transformStatusToData() {
            const codeMap = {
                timeLine: 'date',
                diagnosedLine: 'confirmedNum',
                suspectLine: 'suspectedNum',
                deathLine: 'deathsNum',
                curedLine: 'curesNum'
            };
            for (let item in this.$options.data()) {
                if (item === 'history') {
                    continue;
                }
                this.$data[item] = this.$options.data()[item];
            }
            for (let item of this.history) {
                for (let code in codeMap) {
                    this[code].data.unshift(item[codeMap[code]]);
                }
            }
            let pre = this.diagnosedLine.data[0];
            let now = 0;
            for (let i = 1; i < this.diagnosedLine.data.length; i++) {
                now = this.diagnosedLine.data[i];
                this.increaseLine.data.push(now - pre);
                pre = now;
            }
        }
    },
    created: function () {
        this.update();
        this.transformStatusToData();
    },
    components: {EChart, subBtn}
};
</script>

<style lang="scss" scoped>
.box-card{
  margin: 0 auto;
  width: 1080px;
}
</style>
