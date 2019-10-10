<template>
  <div id="app">
    <s-header></s-header>
    <div class="body">
      <s-side-list></s-side-list>
      <div class="view">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
*{margin:0;padding:0}
li{list-style:none}
img{vertical-align:top;border:none}
#app{
  box-sizing: border-box;
  padding-top: 70px;
  height: 100vh;
  .body{
    height: 100%;
    display: flex;
    .view{
      flex:1;
      overflow: auto;
    }
  }
}
</style>

<script>
import sHeader from './components/header'
import sSideList from './components/side-list'
export default {
  name: 'sys',
  components: {
    sHeader,
    sSideList
  }
}
</script>
