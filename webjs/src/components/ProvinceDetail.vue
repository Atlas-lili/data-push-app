<template>
    <e-chart :option="option" :height="540" :width="800"></e-chart>
</template>

<script>
import EChart from './Echart';

export default {
    name: 'ProvinceDetail',
    data() {
        return {
            cityList: [],
            todayBar: {
                name: '今天',
                type: 'bar',
                data: [],
                itemStyle: {
                    color: '#3300FF'
                }
            },
            yesterdayBar: {
                name: '昨天',
                type: 'bar',
                data: [],
                itemStyle: {
                    color: '#339933'
                }
            },
            confirmedBar: {
                name: '确诊病例',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: [],
                itemStyle: {
                    color: '#ff0000'
                }
            },
            confirmedPie: {
                type: 'pie',
                radius: ['8%', '15%'],
                center: ['75%', '25%'],
                selectedMode: 'single',
                data: [],
                label: {
                    show: false,
                    rotate: 120
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            },
            deadBar: {
                name: '死亡人数',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: [],
                itemStyle: {
                    color: '#CC6600'
                }
            },
            curedBar: {
                name: '治愈人数',
                type: 'bar',
                xAxisIndex: 1,
                yAxisIndex: 1,
                data: [],
                itemStyle: {
                    color: '#00CC00'
                }
            }
        };
    },
    props: {
        provinceName: {
            type: String,
            required: true
        },
        provinceData: {
            type: Object,
            required: true
        }
    },
    computed: {
        option: function () {
            return {
                title: [{
                    text: `${this.provinceName} 近两日疫情变化图`,
                    left: '20%',
                    top: 'top'
                }, {
                    text: `${this.provinceName} 各县（市）疫情图`,
                    left: '20%',
                    top: '47%'
                }, {
                    text: `${this.provinceName} 各县（市）确诊比例图`,
                    left: '60%',
                    top: 'top'
                }],
                tooltip: {},
                grid: [{
                    top: '8%',
                    left: '12%',
                    right: '50%',
                    height: '38%',
                    containLabel: true
                }, {
                    top: '54%',
                    left: '12%',
                    right: '12%',
                    height: '38%',
                    containLabel: true
                }],
                legend: [{
                    data: ['今天', '昨天'],
                    top: '8%',
                    left: '2%',
                    orient: 'vertical'
                }, {
                    data: ['确诊病例', '死亡人数', '治愈人数'],
                    top: '54%',
                    left: '2%',
                    orient: 'vertical'
                }, {
                    bottom: '54%',
                    left: '50%',
                    data: this.cityList
                }],
                graphic: [{
                    type: 'text',
                    left: 74.6 - 0.2 * String(this.todayBar.data[0]).length + '%',
                    top: '24%',
                    style: {
                        text: `${this.todayBar.data[0]}`,
                        textAlign: 'center',
                        fill: '#cc0000',
                        width: 1000,
                        height: 30,
                        fontSize: 10
                    }
                }],
                xAxis: [{
                    type: 'value',
                    position: 'top'
                }, {
                    gridIndex: 1,
                    type: 'category',
                    data: this.cityList,
                    position: 'bottom',
                    axisLabel: {
                        interval: 0,
                        rotate: 30
                    }
                }],
                yAxis: [{
                    type: 'category',
                    data: ['确诊病例', '死亡人数', '治愈人数']
                }, {
                    gridIndex: 1,
                    type: 'value'
                }],
                series: [
                    this.todayBar,
                    this.yesterdayBar,
                    this.confirmedBar,
                    this.deadBar,
                    this.curedBar,
                    this.confirmedPie
                ]
            };
        }
    },
    watch: {
        provinceName: function () {
            this.transformStatusToData();
        },
        provinceData: function () {
            this.transformStatusToData();
        }
    },
    methods: {
        transformStatusToData() {
            Object.assign(this.$data, this.$options.data());
            if (this.provinceName === 'China' || !Object.keys(this.provinceData).length) return;
            this.transformToHistory();
            this.transformTolocalization();
        },
        transformToHistory() {
            var sortList = ['confirmedCount', 'deadCount', 'curedCount'];
            for (let key of sortList) {
                this.todayBar.data.push(this.provinceData.history[0][key]);
                this.yesterdayBar.data.push(this.provinceData.history[1][key]);
            }
        },
        transformTolocalization() {
            for (let city of this.provinceData.cities) {
                this.cityList.push(city.cityName);
                this.confirmedBar.data.push(city.confirmedCount);
                this.deadBar.data.push(city.deadCount);
                this.curedBar.data.push(city.curedCount);
                this.confirmedPie.data.push({
                    name: city.cityName,
                    value: city.confirmedCount
                });
            }
        }
    },
    created() {
        this.transformStatusToData();
    },
    components: {EChart}
};
</script>

<style>

</style>
