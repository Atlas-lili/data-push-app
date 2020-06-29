<template>
    <div ref="chart"
    :style="{height: height + 'px' , width: (!width)?'auto' : width+ 'px'}"></div>
</template>

<script>
import echarts from 'echarts';
export default {
    name: 'EChart',
    props: {
        option: {
            type: Object,
            required: true
        },
        height: {
            type: Number,
            required: false,
            default: 320
        },
        width: {
            type: Number,
            required: false,
            default: 0
        },
        beforLoad: {
            type: Function,
            required: false
        },
        onClick: {
            type: Function,
            required: false
        },
        isMap: {
            type: Boolean,
            required: false,
            default: false
        },
        mapConfig: {
            type: Object,
            required: false,
            default: () => ({})
        }
    },
    watch: {
        option: {
            deep: true,
            handler: function (value) {
                if (this.isMap && this.mapConfig.name && this.mapConfig.json) {
                    echarts.registerMap(this.mapConfig.name, this.mapConfig.json);
                }
                this.renderChart(value);
            }
        }
    },
    methods: {
        renderChart: function (value) {
            let chartDom = this.$refs.chart;
            let chart = echarts.getInstanceByDom(chartDom) || echarts.init(chartDom);
            chart.setOption(value, true);
            if (this.onClick) {
                chart.off('click');
                chart.on('click', this.onClick);
            }
            this.chartInstance = chart;
            return chart;
        }
    },
    mounted() {
         if (this.isMap && this.mapConfig.name && this.mapConfig.json) {
            echarts.registerMap(this.mapConfig.name, this.mapConfig.json);
        }
        this.renderChart(this.option);
    }
};
</script>

<style>

</style>
