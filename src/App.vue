<template>
  <div>
    <router-view v-show="!loading"></router-view>
    <loading-com-vue v-show="loading"></loading-com-vue>
  </div>
</template>

<script setup lang="ts">
import LoadingComVue from '@/components/Loading/LoadingCom.vue' // 全局等待层
import { openAndCloseLoadingByTime } from './utils/common'
import appStore from './store'
import { storeToRefs } from 'pinia'

const { loading } = storeToRefs(appStore.useLoadingStore)
openAndCloseLoadingByTime(1500) //等待动画层
</script>
<style lang="scss" scoped>
#app {
  min-width: 1500px;
}
</style>
