<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <van-button @click="onClick">按钮</van-button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { Button } from 'vant'

export default {
  name: 'Home',
  components: {
    HelloWorld,
    'van-button': Button
  },
  methods: {
    onClick () {
      this.$dialog({
        title: '提示弹窗',
        message: '提示的内容'
      })
    }
  }
}
</script>
