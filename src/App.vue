<template>
  <div id="app">
    <div id="nav">
      <div class="title">飞哥吃了多少鸡</div>
      <router-link to="/" class="link">首页</router-link> |
      <router-link to="history" class="link">吃鸡历史</router-link> |
      <router-link to="notify" class="link">自由提醒</router-link>
      <router-view v-wechat-title="$route.meta.title"/>
    </div>
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}

#nav {
  padding: 30px;

  a.link {
    font-weight: bold;
    font-size: larger;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }

  .title {
    margin: 25px;
    font-size: 45px;
    color: #2c3e50;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}
</style>
