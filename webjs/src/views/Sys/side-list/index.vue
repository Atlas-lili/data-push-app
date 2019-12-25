<template>
    <el-menu default-active="1-1"
        class="el-menu-vertical-demo nav"
        :collapse="isCollapse"
        :unique-opened="true"
        :router="true"
        background-color="#fff"
        text-color="#66CC66"
        active-text-color="#000">
        <el-submenu v-for="{key, icon, title, list} of listMap" :key="key" :index="key">
          <template slot="title">
            <i :class="icon"></i>
            <span slot="title">{{title}}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item v-for="{index, txt} in list" :key="index" :index="index">{{txt}}</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
        <el-menu-item :index="undefined" @click="changeShowStyle">
            <i :class="isCollapse?'el-icon-arrow-right':'el-icon-arrow-left'"></i>
        </el-menu-item>
    </el-menu>
</template>

<style scoped>
.nav{
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    -ms-overflow-style: none;
}
.nav::-webkit-scrollbar { width: 0 !important }
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 218px;
  min-height: 400px;
}
</style>

<script>
  import {listMap} from './config'
  export default {
    data() {
      return {
        isCollapse: false,
      };
    },
    methods: {
      changeShowStyle() {
        this.isCollapse = !this.isCollapse
      }
    },
    created: function (){
      this.listMap = listMap;
    }
  }
</script>