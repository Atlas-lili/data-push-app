<template>
  <div class="page">
    当前城市：<el-tag type="success">{{this.city.name}}</el-tag><el-link @click="searchByIp" class="link" icon="el-icon-location">定位</el-link><router-link tag="span" :to="{name:'weather-air-now-city',params:{city_name:city.name}}"><el-link class="link" icon="el-icon-edit">切换城市</el-link></router-link>
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
import axios from 'axios'
import Card from '../../components/WeatherAirNow'
import cityMap from '../../assets/cityMap.json'
export default {
    data(){
        return {
            city: {}
        }
    },
    components:{
        Card
    },
    methods:{
      searchByIp(){
        axios.get('/api/ipSearch').then(res => {
          if(res.data.code!=='000'){
            this.$message.error('定位失败');
          } else {
            let city = cityMap[res.data.data.city]
            if(!city){
              this.$message.error('定位失败');
            } else {
              this.$message({
                message: '定位成功：'+city.name,
                type: 'success'
              });
              this.city = city;
            }
          }
        })
      }
    },
    created: function(){
      var city_name = this.city_name||this.$store.getters.Userinfo.city||"北京市"
      var city = cityMap[city_name]
      if(city){
        this.city = city;
      }
    },
    props:{
        city_name: String
    }
  }
</script>