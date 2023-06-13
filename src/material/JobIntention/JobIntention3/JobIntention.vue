<template>
  <job-intention-com-vue :model-data="modelData" :model-style="modelStyle">
    <!-- 标题 -->
    <template #model-title>
      <model-title-vue :title="modelData.title" :iconfont="modelData.iconfont"></model-title-vue>
    </template>
  </job-intention-com-vue>
</template>
<script lang="ts" setup>
import JobIntentionComVue from '@/components/ModelComs/JobIntentionCom.vue'
import ModelTitleVue from '@/material/ModelTitle/ModelTitle3/ModelTitle.vue'
import type { IJOBINTENTION } from '@/interface/model'
import type { IMODELSTYLE } from '@/interface/modelStyle'
defineProps<{
  modelData: IJOBINTENTION
  modelStyle: IMODELSTYLE // 模块样式
}>()
</script>
