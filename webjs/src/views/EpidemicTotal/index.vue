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
        <!-- <total-history :status="history" class="chart-center"></total-history> -->
        <total-history class="chart-center"></total-history>
    </div>
</template>

<script>
import http from 'axios';
import staticdata from '../../../public/epidemic.json';
import TotalHistory from '../../components/TotalHistory';

async function getStatus() {
    var res = staticdata;
    return res.data;
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
            }
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
                });
        },
        catchTotal({date, diagnosed, suspect, death, cured}) {
            this.totalStatus = {date, diagnosed, suspect, death, cured};
        }
    },
    created: function () {
        this.update();
    },
    components: {
        TotalHistory,
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
    margin: 24px;
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
