<template>
  <div class="page">
    当前城市：<el-tag type="success">{{this.city.City_CN}}</el-tag><el-link class="link" icon="el-icon-location">定位</el-link><el-link class="link" icon="el-icon-edit">切换城市</el-link>
    <el-divider></el-divider>
    <card :city="this.city.City_EN"></card>
  </div>
</template>

<style lang="scss" scoped>
.page{
  margin: 24px;
}
.link{
  margin-left: 20px;
}
</style>

<script>
import Card from '../../components/WeatherAirNow'
export default {
    data(){
        return {
            city: {
              name: "北京市",
              province: "北京",
              lat: 39.9031324643,
              lon: 116.4010433787,
              x: 6763,
              level: { level: 1, name: "北京" },
              y: 6381,
              cityNo: "CN101010100",
              City_CN: "北京",
              City_EN: "beijing"
            }
        }
    },
    components:{
        Card
    }
  }
</script>