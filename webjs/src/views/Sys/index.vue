<template>
  <div id="sys">
    <s-header></s-header>
    <div class="body">
      <s-side-list></s-side-list>
      <div class="view">
        <router-view></router-view>
        <footer>陕ICP备19021517号</footer>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
*{margin:0;padding:0}
li{list-style:none}
img{vertical-align:top;border:none}
#sys{
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
  footer{
    text-align: center;
    height:4%;
  }
}
</style>

<script>
import sHeader from './header'
import sSideList from './side-list/index'
export default {
  name: 'sys',
  components: {
    sHeader,
    sSideList
  }
}
</script>
