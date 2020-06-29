<template>
  <div class="access-page">
    <div class="center">
      <el-tag
    class="city-tag"
    :type="(formInline.selectCity.name)?'success':'info'"
    effect="dark">
    {{formInline.selectCity.name||'未选择'}}
  </el-tag>
    </div>
    <el-form :inline="true" :model="formInline" class="form-inline">
      <el-form-item>
        <el-link @click="searchByIp" class="link" icon="el-icon-location">定位</el-link>
      </el-form-item>
      <el-form-item label="省级">
        <el-select v-model="formInline.Province_name" clearable placeholder="--请选择--"  @change="handleChange1">
          <el-option
            v-for="item in pList"
            :key="item.name"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="市级">
        <el-select v-model="formInline.city_ID" clearable placeholder="--请选择--" @change="handleChange2">
          <el-option
            v-for="item in cList"
            :key="item.ID"
            :label="item.name"
            :value="item.ID">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
    <chart :constructor-type="'mapChart'" :options="Options" style="height: 450px; width: 1000px;margin:0 auto;"></chart>
  </div>
</template>

<style lang="scss" scoped>
.center{
  margin: 10px;
  text-align: center;
}
.form-inline{
  display: flex;
  justify-content: center;
}
.el-link.is-underline.link:hover:after {
  border-bottom: none;
}
</style>

<script>
import axios from 'axios'
import {Chart} from 'highcharts-vue'
import Highcharts from 'highcharts'
import Highmaps from 'highcharts/modules/map'
  //注意，这里的import world from './world'是核心代码，是个啥我将在下面继续介绍
import citys from './citys'
import china from './china'
  //注意：这是API调用方法，千万不要忘记写哦
Highmaps(Highcharts);
var [pList,pMap,cMap] = (function(){
  var obj = {};
  var cMap = {};
  citys.forEach(function(city,i){
    if(!obj[city.province]){
      obj[city.province] = [];
    }
    city.ID = i+''
    obj[city.province].push(city);
    cMap[city.name]=city;
  })
  var arr = [];
  for(let name in obj){
    arr.push({
      name: name,
      level: obj[name].length
    })
  }
  arr.sort(function(a,b){
    if(b.level<a.level){
      return 1;
    }
    return -1;
  })
  return [arr,obj,cMap]
})()
export default {
    data() {
      return {
        Options:{},
        formInline:{
          city_ID:'',
          selectCity:{},
          Province_name:'',
        },
        pList:pList,
        cList:[]
      }
    },
    methods:{
      searchByIp(){
        axios.get('/api/ipSearch').then(res => {
          if(res.data.code!=='000'){
            this.$message.error('定位失败');
          } else {
            let res = {data: {
              data: {
                city: "大连市",
                region: "辽宁省"
              }
            }}
            let city = cMap[res.data.data.city]
            if(!city){
              this.$message.error('定位失败');
            } else {
              this.$message({
                message: '定位成功：'+city.name,
                type: 'success'
              });
              this.cList.splice(0,this.cList.length,...pMap[city.province])
              this.formInline.Province_name = city.province;
              this.$nextTick(() => {
                this.formInline.city_ID = city.ID;
              })
              this.formInline.selectCity = city;
            }
          }
        })
      },
      save(){
        if(this.formInline.selectCity.name){
          if(this.$route.name!=='default-city'){
            this.$message({
              message: '保存成功：'+this.formInline.selectCity.name,
              type: 'success'
            });
            this.$router.push({path:this.$route.path.split('city')[0]+this.formInline.selectCity.name})
          } else {
            axios.post('/api/confCity',{token:this.$store.getters.Userinfo.token,city:this.formInline.selectCity.name}).then(res => {
                if(!res.data){
                    this.$message.error('请求出错！');
                    return;
                }
                if(res.data.code!=='000'){
                    this.$message.error(res.data.info);
                    return;
                }
                this.$message({
                    message: '修改成功！',
                    type: 'success'})
                this.$store.commit('assignUserinfo',{city:res.data.data})
            })
          }
        } else {
          this.$message.error('未选择不可以保存！');
        }
      },
      handleChange1(v){
        this.formInline.city_ID = '';
        if(!v){
          this.cList.splice(0,this.cList.length);
          return;
        }
        this.cList.splice(0,this.cList.length,...pMap[v])
      },
      handleChange2(v){
        if(!v){
          this.formInline.selectCity = {}
        } else {
          this.formInline.selectCity = citys[v-0]
        }
      },
      chartOptions(){
        var series = [{
          type: 'map',
          mapData: china,
          joinBy: 'hc-key',
          name: '随机数据',
          states: {
            hover: {
              color: '#a4edba'
            }
          },
          showInLegend: false,
        }],
        lastLevel = null;
        for(var d of citys) {
          if(d.level.level !== lastLevel) {
            series.push({
              name: d.level.name,
              visible: true,
              events: {
              click: (e)=>{
                this.cList.splice(0,this.cList.length,...pMap[e.point.properties.province])
                this.formInline.Province_name = e.point.properties.province;
                this.$nextTick(() => {
                  this.formInline.city_ID = e.point.properties.ID;
                })
                this.formInline.selectCity = e.point.properties;
              }
              },
              data: []
            });
            lastLevel = d.level.level;
          }
          series[series.length -1].data.push({
            name: d.name,
            properties: d,
            x: d.x,
            y: -d.y
          });
        }
        return {
          chart: {
            type: 'mappoint'
          },
          title: {
            text: '中国大陆城市分布'
          },
          subtitle: {
            text: '点击地图上的位点以选择城市！'
          },
          mapNavigation: {
            enabled: true,
            buttonOptions: {
              verticalAlign: 'bottom'
            }
          },
          legend: {
            enabled: false,
            layout: 'vertical',
            align: 'left',
            floating: true,
            x: 30
          },
          tooltip: {
            useHTML: true,
            headerFormat: '<small>{point.key}</small><table>',
            pointFormat: '<tr><td>所属省份</td><td>{point.properties.province}</td></tr>' + 
            '<tr><td>经纬度</td><td>({point.properties.lon:.2f}, {point.properties.lat:.2f})</td></tr>' + 
            '<tr><td>城市编号</td><td>{point.properties.cityNo}</td></tr>',
            footerFormat: '</table>',
          },
          plotOptions: {
            series: {
              dataLabels: {
                enabled: false
              },
              marker: {
                radius: 3
              }
            }
          },
          series: series
        }
      }
    },
    mounted: function(){
      if(this.$route.name === 'default-city'){
        const loading = this.$loading({
          target: '.access-page',
          lock: true,
          text: '加载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(255, 255, 255, 0.7)'
        });
        if(this.$store.getters.Userinfo.token){
          loading.close();
        } else {
          this.$message.error('抱歉，该功能需要先登录哦！');
        }
      }
    },
    created: function (){
      this.pList = pList;
      this.Options = this.chartOptions();
      if(this.city_name||(this.$route.name === 'default-city')){
        let city_name = this.city_name
        if(this.$route.name === 'default-city'){
          city_name = this.$store.getters.Userinfo.city;
        }
        this.cList.splice(0,this.cList.length,...pMap[cMap[city_name].province])
        this.formInline.Province_name = cMap[city_name].province;
        this.$nextTick(() => {
          this.formInline.city_ID = cMap[city_name].ID;
        })
        this.formInline.selectCity = cMap[city_name];
      }
    },
    components: {
      Chart
    },
    props:{
      city_name: String
    }
  }
</script>