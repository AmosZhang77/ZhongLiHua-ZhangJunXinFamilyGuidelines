<template>
  <div id="app">
    <!--<img src="./assets/logo.png">-->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

/**
 *自定义字体
 */
/*@font-face {
  font-family: myFont;
  src: url('../static/font/MONACO.ttf'),
  url('../static/font/MONACO.ttf'); !* IE9 *!
}

body {
  font-family: myFont, '微软雅黑';
}*/
</style>
