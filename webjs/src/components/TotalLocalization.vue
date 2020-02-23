<template>
    <div class="total-localization-container">
        <e-chart ref="toggle" :isMap="true" :mapConfig="{name: detailProvince, json: mapJson}" :option="option" :beforLoad="setMap" :onClick="onCheak" :height="600" :width="800"></e-chart>
        <!-- <veui-overlay
            target="toggle"
            position="top-start"
            :open.sync="isOverlayShow"
            overlay-class="relative-overlay"
        >
            <div v-outside:toggle="overlayHide">
                <province-detail :provinceName="detailProvince" :provinceData="detailData"></province-detail>
            </div>
        </veui-overlay> -->
    </div>
</template>

<script>
import http from 'axios';
import EChart from './Echart';
import ProvinceDetail from './ProvinceDetail';

async function getMapJson(province) {
    var res = await http.request({
        url: (province === 'China') ? '/map/China.json' : `/map/province/${province}.json`,
        method: 'get'
    });
    if (res.status !== 200) {
        return null;
    }
    return res.data;
}

export default {
    name: 'TotalLocalization',
    data() {
        return {
            provincesData: [],
            citiesData: [],
            provincesDetailMap: {},
            detailProvince: 'China',
            detailData: {},
            isOverlayShow: false,
            inFirstLevel: true,
            mapJson: null
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
                backgroundColor: '#404a59',
                title: {
                    text: `${(this.detailProvince === 'China') ? '各省' : this.detailProvince} 确诊人数图`,
                    left: 'center',
                    textStyle: {
                        color: '#ccc'
                    }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: ({data, name}) => {
                        if (this.detailProvince !== 'China' && !this.citiesData.length) {
                            return `确诊人数<br />${name}:未知`;
                        }
                        return `确诊人数<br />${name}:${(data) ? data.value : '0'}`;
                    },
                    animation: false
                },
                toolbox: {
                    feature: {
                        myBack: {
                            show: true,
                            title: '返回',
                            icon: 'path://M380.931 512c56.863-103.016 66.444-260.153-156.931-254.912v126.912l-192-192 192-192v124.186c267.481-6.971 297.285 236.107 156.931 387.814z',
                            iconStyle: {
                                borderColor: 'fff'
                            },
                            onclick: () => {
                                this.overlayHide();
                            }
                        }
                    }
                },
                visualMap: {
                    type: 'piecewise',
                    pieces: [
                        {min: 10000, color: '#ff0000'},
                        {min: 1000, max: 9999, color: '#cc0000'},
                        {min: 500, max: 1000, color: '#CC3300'},
                        {min: 100, max: 499, color: '#CC6600'},
                        {min: 10, max: 99, color: '#CC9900'},
                        {min: 1, max: 9, color: '#CCCC00'}
                    ],
                    textStyle: {
                        color: '#ffffff'
                    },
                    left: '20%',
                    bottom: '20%'
                },
                series: [
                    {
                        name: '确诊人数',
                        type: 'map',
                        roam: true,
                        map: this.detailProvince,
                        emphasis: {
                            label: {
                                show: true
                            }
                        },
                        textFixed: {
                            Alaska: [20, -20]
                        },
                        data: (this.detailProvince === 'China') ? this.provincesData : this.citiesData
                    }
                ]
            };
        }
    },
    watch: {
        status: function () {
            this.transformStatusToData();
        }
    },
    methods: {
        transformStatusToData: function () {
            this.provincesData.splice(0);
            for (let item of this.status) {
                this.provincesData.push({
                    name: item.provinceName,
                    value: item.confirmedCount
                });
                this.provincesDetailMap[item.provinceName] = {
                    cities: item.cities,
                    history: item.history
                };
            }
        },
        setMap: async function (province) {
            let res = await getMapJson(province);
            if (!res) {
                this.$toast.error('加载地图失败！');
                return;
            }
            this.mapJson = res;
        },
        onCheak: function ({data}) {
            if (this.detailProvince === data.name || !this.inFirstLevel) return;
            this.inFirstLevel = false;
            this.detailData = this.provincesDetailMap[data.name];
            this.isOverlayShow = true;
            this.updateMap(data.name);
        },
        overlayHide: function () {
            if (this.detailProvince === 'China' || this.inFirstLevel) return;
            this.inFirstLevel = true;
            this.detailData = {};
            this.isOverlayShow = false;
            this.updateMap('China');
        },
        updateMap: async function (province) {
            await this.setMap(province);
            this.detailProvince = province;
            this.citiesData.splice(0);
            if (!this.detailData.cities) return;
            for (let city of this.detailData.cities) {
                this.citiesData.push({
                    name: city.cityName,
                    value: city.confirmedCount
                });
            }
        }
    },
    created: async function () {
        await this.setMap('China');
        this.transformStatusToData();
    },
    components: {
        EChart,
        ProvinceDetail
    }
};
</script>

<style >
.total-localization-container{
    height:600px;
    width:800px;
}
.relative-overlay{
    width:800px;
    background-color: #fff;
    box-shadow: 0px 0px 5px #888888;
    border-radius: 5px;
}
</style>
