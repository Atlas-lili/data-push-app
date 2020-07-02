<template>
  <div class="page">
    <el-row :gutter="20">
        <el-col :span="12">
            <chart1></chart1>
        </el-col>
        <el-col :span="12">
            <chart2></chart2>
        </el-col>
    </el-row>
    <el-row :gutter="20">
        <el-col :span="12">
            <chart3></chart3>
        </el-col>
        <el-col :span="12">
            
        </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.page{
  margin: 24px;
}
</style>

<script>
import Chart1 from './Chart1.vue'
import Chart2 from './Chart2.vue'
import Chart3 from './Chart3.vue'
export default {
    data(){
        return {
        }
    },
    components:{
        Chart1,
        Chart2,
        Chart3
    }
  }
</script>