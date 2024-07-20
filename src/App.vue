<!-- 项目根组件 -->
 <!-- 入口文件main.js会在初始化的时候，把根组件App.vue渲染到页面上 -->
<template>
  <div id="app">
    <!-- router-view是一级路由容器。由根组件直接引用的是一级路由 -->
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
