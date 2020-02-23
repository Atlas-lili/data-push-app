<template>
    <e-chart :option="option"></e-chart>
</template>

<script>
import EChart from './Echart';
export default {
    name: 'CityDCSpecific',
    data() {
        return {
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
    props: {
        status: {
            type: Object,
            required: true
        }
    },
    computed: {
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
        transformStatusToData() {
            Object.assign(this.$data, this.$options.data());
            for (let cityName in this.status) {
                let {confirmedCount, curedCount, deadCount} = this.status[cityName];
                let deadSpecific = deadCount && deadCount / confirmedCount;
                let curedSpecific = curedCount && curedCount / confirmedCount;
                this.cityScatter.data.push([curedSpecific, deadSpecific, confirmedCount, cityName]);
            }
        }
    },
    watch: {
        status: function () {
            this.transformStatusToData();
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
