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
    <template v-else-if="resumeJsonNewStore.LAYOUT === 'leftRight'">
      <div class="left-box">
        <draggable
          class="left-drag-area"
          :list="leftList"
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
      </div>
      <div class="right-box">
        <draggable
          class="right-drag-area"
          :list="rightList"
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
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import draggable from 'vuedraggable'
import appStore from '@/store'
import modelBox from './modelBox.vue'
import MaterialComponents from '@/utils/registerMaterialCom' // 所有物料组件

defineOptions({ name: 'custom' })
const { resumeJsonNewStore } = appStore.useResumeJsonNewStore

//左右两列布局
const leftList = ref<any>([])
const rightList = ref<any>([])
if (resumeJsonNewStore.LAYOUT === 'leftRight') {
  leftList.value = resumeJsonNewStore.COMPONENTS.filter((item) => item.layout === 'left') //左侧列表
  rightList.value = resumeJsonNewStore.COMPONENTS.filter((item) => item.layout === 'right') //右侧列表
}
</script>

<style lang="scss" scoped>
.content-box {
  .dragArea {
    min-width: 820px;
    min-height: 300px;
    width: 820px;
    min-height: 1160px;
    background-color: #fff;
    box-sizing: border-box;
    position: relative;
    z-index: 0;
  }

  .left-box {
    width: v-bind('resumeJsonNewStore.GLOBAL_STYLE.leftWidth');
    box-sizing: border-box;
    background-color: v-bind('resumeJsonNewStore.GLOBAL_STYLE.leftThemeColor');
    min-height: 1160px;
    position: absolute;
    height: 100%;

    .left-drag-area {
      min-height: 1160px;
      width: 100%;
    }
  }

  .right-box {
    min-height: 1160px;
    width: v-bind('resumeJsonNewStore.GLOBAL_STYLE.rightWidth');
    margin-left: v-bind('resumeJsonNewStore.GLOBAL_STYLE.leftWidth');
    background-color: v-bind('resumeJsonNewStore.GLOBAL_STYLE.rightThemeColor');

    .right-drag-area {
      min-height: 1160px;
      width: 100%;
    }
  }
}
</style>
