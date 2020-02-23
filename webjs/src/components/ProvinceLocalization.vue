<template>
    <e-chart :option="option"></e-chart>
</template>

<script>
import EChart from './Echart';
import localizationMap from './localizationMap.json';

export default {
    name: 'ProvinceLocalization',
    data() {
        return {
            nodes: [],
            links: [],
            categories: [
                {min: 10000, itemStyle: {color: '#ff0000'}, name: '>10000'},
                {min: 1000, max: 9999, itemStyle: {color: '#cc0000'}, name: '1000 - 9999'},
                {min: 500, max: 999, itemStyle: {color: '#CC3300'}, name: '500 - 999'},
                {min: 100, max: 499, itemStyle: {color: '#CC6600'}, name: '100 - 499'},
                {min: 10, max: 99, itemStyle: {color: '#CC9900'}, name: '10 - 99'},
                {min: 1, max: 9, itemStyle: {color: '#CCCC00'}, name: '1 - 9'}
            ]
        };
    },
    props: {
        status: {
            type: Array,
            required: true
        }
    },
    computed: {
        option: function () {
            return {
                title: {
                    text: '各省地缘-确诊病例 关系图',
                    left: 'center',
                    top: 0
                },
                tooltip: {
                    formatter: function ({data, dataType, seriesName}) {
                        if (dataType === 'edge') {
                            return data.name;
                        } else if (dataType === 'node') {
                            return `${seriesName}<br />${data.name}: ${data.value}`;
                        }
                    }
                },
                legend: [{
                    dimension: 2,
                    orient: 'vertical',
                    right: 20,
                    top: 'center',
                    data: this.categories.map(function (a) {
                        return a.name;
                    })
                }],
                animation: false,
                series: [
                    {
                        name: '确诊病例',
                        type: 'graph',
                        layout: 'force',
                        data: this.nodes,
                        links: this.links,
                        categories: this.categories,
                        roam: true,
                        label: {
                            position: 'right'
                        },
                        force: {
                            repulsion: 100
                        }
                    }
                ]
            };
        }
    },
    methods: {
        transformStatusToData() {
            this.nodes.splice(0);
            for (let P of this.status) {
                let category = 0;
                category = this.categories.findIndex(item => {
                    return P.confirmedCount >= item.min && (!item.max || P.confirmedCount <= item.max);
                });
                this.nodes.push({
                    category: category,
                    draggable: true,
                    id: P.provinceName,
                    name: P.provinceName,
                    value: P.confirmedCount,
                    symbolSize: 10,
                    x: null,
                    y: null
                });
            }
        },
        setLink() {
            this.links.splice(0);
            for (let source in localizationMap) {
                for (let target of localizationMap[source]) {
                    this.links.push({
                        id: `${source}-${target}`,
                        name: `${source}-${target}`,
                        source,
                        target
                    });
                }
            }
        }
    },
    watch: {
        status: function () {
            this.transformStatusToData();
        }
    },
    created() {
        this.setLink();
        this.transformStatusToData();
    },
    components: {EChart}
};
</script>

<style>

</style>
