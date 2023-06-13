<template>
  <div class="content-box" ref="customContentRef">
    <!-- 无布局方式 -->
    <template v-if="resumeJsonNewStore.LAYOUT === 'custom'"></template>

    <!-- 传统布局 -->

    <template v-else-if="resumeJsonNewStore.LAYOUT === 'classical'">
      <draggable
        class="dragArea list-group"
        :list="resumeJsonNewStore.COMPONENTS"
        item-key="id"
        animation="500"
        group="custom"
        :sort="true"
      >
        <template #item="{ element }">
          <div class="list-group-item">
            <model-box :components="MaterialComponents" :item="element"></model-box>
          </div>
        </template>
      </draggable>
    </template>

    <!-- 左右布局 -->
    <template v-else-if="resumeJsonNewStore.LAYOUT === 'leftRight'"> </template>
  </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable'

import appStore from '@/store'

const { resumeJsonNewStore } = appStore.useResumeJsonNewStore
</script>

<style lang="scss" scoped></style>
