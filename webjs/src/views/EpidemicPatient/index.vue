<template>
  <div class="page">
    <city-d-c-specific  class="chart-center"></city-d-c-specific>
  </div>
</template>

<script>
import staticdata from '../../../public/epidemic.json';
import CityDCSpecific from '../../components/CityDCSpecific';
async function getStatus() {
    var res = staticdata;
    return res.data;
}
export default {
  name:'EpidemicPatient',
  data() {
        return {
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
        }
    },
    created: function () {
        this.update();
    },
    components: {
        CityDCSpecific,
    }
}
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