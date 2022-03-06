<template>
  <div class="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "~@/assets/styles/reset.scss";
@import "~@/assets/styles/helper.scss";

body {
  font-family: $font-hei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  line-height: 1.5;
  font-size: 16px;
  color: #333;
  background: #f5f5f5;
}
.app {
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 10px rgba(0,0,0,0.25);
}
</style>
