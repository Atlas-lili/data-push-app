<template>
    <el-row :gutter="20">
        <el-col :span="12">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
            <span>当前天气</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div class="box-body">
            <img class="cond-img" :src="cond_img" :alt="cond.txt" />
            <div class="cond">
                <p class="tmp">{{cond.tmp}}&#176;</p>
                <div class="cond-txt">{{cond.txt}}</div>
            </div>
            <el-row :gutter="20">
                <el-col :span="12">
                <el-form label-position="left" label-width="120px">
                    <el-form-item class="title" label="风向">{{cond.wind_dir}}</el-form-item>
                    <el-form-item class="title" label="风力">{{cond.wind_sc}}</el-form-item>
                    <el-form-item class="title" label="风速">{{cond.wind_spd}}<span>km/h</span></el-form-item>
                    <el-form-item class="title" label="相对湿度">{{cond.hum}}<span>%</span></el-form-item>
                </el-form>
                </el-col>
                <el-col :span="12">
                <el-form label-position="left" label-width="120px">
                    <el-form-item class="title" label="气压">{{cond.pres}}<span>hPa</span></el-form-item>
                    <el-form-item class="title" label="能见度">{{cond.vis}}<span>km</span></el-form-item>
                    <el-form-item class="title" label="降水量">{{cond.pcpn}}<span>cm</span></el-form-item>
                </el-form>
                </el-col>
            </el-row>
            </div>
        </el-card>
        </el-col>
        <el-col :span="12">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
            <span>当前空气质量</span>
            <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div class="box-body">
            <div class="air-imp">
                <p class="air-imp-titel">主要污染物</p>
                <div class="air-imp-txt" v-html="air_main"></div>
            </div>
            <div class="aqi">
                <p class="aqi-txt">{{air.qlty}}</p>
                <div class="aqi-title">AQI<span>{{air.aqi}}</span></div>
            </div>
            <el-row :gutter="20">
                <el-col :span="12">
                <el-form label-position="left" label-width="120px">
                    <el-form-item class="title" label="PM10">{{air.pm10}}</el-form-item>
                    <el-form-item class="title" label="PM25">{{air.pm25}}</el-form-item>
                    <el-form-item class="title" label="二氧化氮">{{air.no2}}</el-form-item>
                </el-form>
                </el-col>
                <el-col :span="12">
                <el-form label-position="left" label-width="120px">
                    <el-form-item class="title" label="二氧化硫">{{air.so2}}</el-form-item>
                    <el-form-item class="title" label="一氧化碳">{{air.co}}</el-form-item>
                    <el-form-item class="title" label="臭氧">{{air.o3}}</el-form-item>
                </el-form>
                </el-col>
            </el-row>
            </div>
        </el-card>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
.box-card{
  margin: 0 auto;
  width: 540px;
}
.box-body{
  color: #3c5e81;
  .cond-img,.air-imp{
    float: right;
    width: 100px;
    height: 100px;
  }
  .air-imp-titel{
    margin-top: 30px;
    font-size: 12px;
  }
  .air-imp-txt{
    font-size: 30px;
  }
  .title{
    margin-bottom: 0;
    color: #3c5e81;
    font-weight: bold;
    font-size: 16px;
    span{
      margin-left:4px;
      font-size: 14px;
    }
  }
  .cond,.aqi{
    height: 100px;
    margin-right: 100px;
    position: relative;
    .tmp,.aqi-txt{
      position: absolute;
      top: 10px;
      font-size: 50px;
      font-weight: bold;
    }
    .cond-txt,.aqi-title{
      position: absolute;
      bottom: 0;
      font-size: 16px;
      font-weight: bold;
    }
  }
  .aqi .aqi-title span{
    margin-left: 10px;
  }
}
</style>

<script>
import axios from 'axios'
var nightImgList = ['100','103', '104', '300', '301', '406', '407'];
export default {
    data() {
      return {
        cond:{
          code: '100', txt: '晴',
          tmp: '0', wind_dir: '-',
          wind_sc: '-', wind_spd: '-',
          hum: '-', pres: '-',
          vis: '-', pcpn: '-'
        },
        air:{
          main: '-', qlty: '-',
          aqi: '-', pm10: '-',
          pm25: '-', no2: '-',
          so2: '-', o3: '-'
        }
      }
    },
    watch:{
      city: {
        immediate: true,
        handler (val) {
          this.getWeather(val)
          this.getAir(val)
        }
      }
    },
    computed:{
      cond_img(){
        if(nightImgList.indexOf(this.cond.code)===-1){
          return '/weather/'+this.cond.code+'.png'
        } else {
          let hour = new Date().getHours();
          let inNight = (hour>=18||hour<=4)?true:false;
          return '/weather/'+this.cond.code+((inNight)?'n':'')+'.png'
        }
      },
      air_main(){
        var map = {
          pm25:'PM25',
          pm10:'PM10',
          no2:'NO<span style="font-size:20px;">2</span>',
          so2:'SO<span style="font-size:20px;">2</span>',
          co:'CO',
          o3: 'O<span style="font-size:20px;">3</span>',
          '-':'--',
        }
        return map[this.air.main]||this.air.main
      }
    },
    methods:{
      getWeather(city){
        axios.get('/api/weatherNow', {params: {city,}}).then(res => {
          if(res.data.code!=='000'){
            this.$message.error(res.data.info);
          } else {
            this.cond.code = res.data.data.cond_code;
            this.cond.txt = res.data.data.cond_txt;
            this.cond.tmp = res.data.data.tmp;
            this.cond.wind_dir = res.data.data.wind_dir;
            this.cond.wind_sc = res.data.data.wind_sc;
            this.cond.wind_spd = res.data.data.wind_spd;
            this.cond.hum = res.data.data.hum;
            this.cond.pres = res.data.data.pres;
            this.cond.vis = res.data.data.vis;
            this.cond.pcpn = res.data.data.pcpn;
          }
        })
      },
      getAir(city){
        axios.get('/api/airNow', {params: {city,}}).then(res => {
          if(res.data.code!=='000'){
            this.$message.error(res.data.info);
          } else {
            this.air.main = res.data.data.main;
            this.air.qlty = res.data.data.qlty;
            this.air.aqi = res.data.data.aqi;
            this.air.pm10 = res.data.data.pm10;
            this.air.pm25 = res.data.data.pm25;
            this.air.no2 = res.data.data.no2;
            this.air.so2 = res.data.data.so2;
            this.air.co = res.data.data.co;
            this.air.o3 = res.data.data.o3;
          }
        })
      }
    },
    mounted: function() {
    },
    created: function(){
      this.getWeather(this.city)
      this.getAir(this.city)
    },
    props:{
        city: { type: String, required: true }
    }
  }
</script>