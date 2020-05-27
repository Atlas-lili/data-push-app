<template>
  <div class="page">
    <province-localization class="chart-center"></province-localization>
  </div>
</template>

<script>
import ProvinceLocalization from '../../components/ProvinceLocalization';

export default {
    name:'EpidemicCity',
    components: {
        ProvinceLocalization
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