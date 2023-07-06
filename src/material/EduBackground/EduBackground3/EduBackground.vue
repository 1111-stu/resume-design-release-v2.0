<template>
  <edu-background-com-vue :model-data="modelData" :model-style="modelStyle">
    <!-- 标题 -->
    <template #model-title>
      <model-title-vue :title="modelData.title" :iconfont="modelData.iconfont"></model-title-vue>
    </template>
  </edu-background-com-vue>
</template>
<script lang="ts" setup>
import EduBackgroundComVue from '@/components/ModelComs/EduBackgroundCom.vue'
import ModelTitleVue from '@/material/ModelTitle/ModelTitle3/ModelTitle.vue'
import type { IEDUBACKGROUND } from '@/interface/model'
import type { IMODELSTYLE } from '@/interface/modelStyle'
defineProps<{
  modelData: IEDUBACKGROUND
  modelStyle: IMODELSTYLE // 模块样式
}>()
</script>
