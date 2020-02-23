<template>
    <e-chart :option="option" :height="400"></e-chart>
</template>

<script>
import EChart from './Echart';
export default {
    name: 'TotalHistory',
    data() {
        return {
            timeLine: {
                type: 'category',
                boundaryGap: false,
                data: []
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
                    name: '确诊|疑似|新增',
                    max: 100000,
                    splitNumber: 5
                }, {
                    type: 'value',
                    name: '死亡|治愈',
                    max: 40000,
                    splitNumber: 5,
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
    props: {
        status: {
            type: Array,
            required: true
        }
    },
    watch: {
        status: function () {
            this.transformStatusToData();
        }
    },
    methods: {
        transformStatusToData() {
            const codeMap = {
                timeLine: 'date',
                diagnosedLine: 'confirmedNum',
                suspectLine: 'suspectedNum',
                deathLine: 'deathsNum',
                curedLine: 'curesNum'
            };
            Object.assign(this.$data, this.$options.data());
            for (let item of this.status) {
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
        this.transformStatusToData();
    },
    components: {EChart}
};
</script>

<style>

</style>
