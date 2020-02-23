<template>
    <div class="page">
        <h1>新型冠状病毒全国疫情概览</h1>
        <div class="date">当前统计截止时间：{{totalStatus.date}}</div>
        <el-row class="total-container">
            <el-col v-for="item in totalList" :span="6" :class="item.EN" :key="item.EN">
                <div class="title">{{item.CN}}</div>
                <div class="content">{{totalStatus[item.EN]}}</div>
            </el-col>
        </el-row>
        <total-history :status="history" class="chart-center"></total-history>
        <total-localization :status="area"  class="chart-center"></total-localization>
        <city-d-c-specific :status="city"  class="chart-center"></city-d-c-specific>
        <province-localization :status="area" class="chart-center"></province-localization>
    </div>
</template>

<script>
import http from 'axios';

import TotalHistory from '../../components/TotalHistory';
import TotalLocalization from '../../components/TotalLocalization';
import CityDCSpecific from '../../components/CityDCSpecific';
import ProvinceLocalization from '../../components/ProvinceLocalization';
async function getStatus() {
    var res = await http.request({
        url: 'https://www.tianqiapi.com/api',
        // url: '/static/epidemic.json',
        method: 'get',
        params: {
            version: 'epidemic',
            appid: '46933394',
            appsecret: 'RHE7MNqo'
        }
    });
    if (res.status !== 200 || res.data.errcode !== 0) {
        return null;
    }
    return res.data.data;
}
export default {
    name: 'App',
    data() {
        return {
            totalList: [{
                EN: 'diagnosed', CN: '确诊病例'
            }, {
                EN: 'suspect', CN: '疑似病例'
            }, {
                EN: 'death', CN: '死亡人数'
            }, {
                EN: 'cured', CN: '治愈人数'
            }],
            totalStatus: {
                date: 'xxxx-xx-xx xx:xx:xx',
                diagnosed: 0,
                suspect: 0,
                death: 0,
                cured: 0
            },
            history: [],
            area: [],
            city: {}
        };
    },
    methods: {
        update() {
            getStatus()
                .then(res => {
                    if (!res) {
                        this.$toast.error('拉取数据失败！');
                        return;
                    }
                    this.catchTotal(res);
                    this.catchHistory(res);
                    this.catchArea(res);
                    this.catchCity(res);
                });
        },
        catchTotal({date, diagnosed, suspect, death, cured}) {
            this.totalStatus = {date, diagnosed, suspect, death, cured};
        },
        catchHistory({history}) {
            this.history = history;
        },
        catchArea({area}) {
            let simpleArea = [];
            for (let P of area) {
                let {provinceName, confirmedCount, curedCount, deadCount, suspectedCount, cities, yesterdayIncreased} = P;
                simpleArea.push({
                    provinceName,
                    confirmedCount,
                    curedCount,
                    deadCount,
                    suspectedCount,
                    cities,
                    history: [{
                        confirmedCount, curedCount, deadCount, suspectedCount
                    }, {
                        ...yesterdayIncreased
                    }]
                });
            }
            this.area = simpleArea;
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
        }
    },
    created: function () {
        this.update();
    },
    components: {
        TotalHistory,
        TotalLocalization,
        CityDCSpecific,
        ProvinceLocalization
    }
};
</script>

<style lang="scss" scoped>
.page {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
    color: #2c3e50;
    margin-top: 30px;
    &>h1{text-align: center;}
    .date{
        font-size: 15px;
        margin-right: 30px;
        float: right;
    }
    .total-container{
        clear: both;
        margin-top: 100px;
        text-align: center;
        .title{
            font-size: 20px;
        }
        .content{
            font-size: 40px;
            font-weight: bold;
        }
        .diagnosed{color:#ff0000;}
        .suspect{color:#FF6600;}
        .death{color:#CC6600;}
        .cured{color:#00CC00;}
    }
    .chart-center{margin: 20px auto;}
}
</style>
