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
              <model-box
                :components="MaterialComponents"
                :item="element"
                @left-right-copy-model="leftCopyModel"
                @left-right-delete-model="leftDeleteModel"
              ></model-box>
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
              <model-box
                :components="MaterialComponents"
                :item="element"
                @left-right-copy-model="rightCopyModel"
                @left-right-delete-model="rightDeleteModel"
              ></model-box>
            </div>
          </template>
        </draggable>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import type { IMATERIALITEM } from '@/interface/material'

import draggable from 'vuedraggable'
import appStore from '@/store'
import modelBox from './modelBox.vue'
import MaterialComponents from '@/utils/registerMaterialCom' // 所有物料组件
import getModelIndex from '@/hooks/material/useGetModelIndex'
import { cloneDeep } from 'lodash'

defineOptions({ name: 'custom' })
const { resumeJsonNewStore } = storeToRefs(appStore.useResumeJsonNewStore)

//左右两列布局
const leftList = ref<IMATERIALITEM[]>([])
const rightList = ref<IMATERIALITEM[]>([])
if (resumeJsonNewStore.value.LAYOUT === 'leftRight') {
  leftList.value = resumeJsonNewStore.value.COMPONENTS.filter((item) => item.layout === 'left') //左侧列表
  rightList.value = resumeJsonNewStore.value.COMPONENTS.filter((item) => item.layout === 'right') //右侧列表
}

watch(
  leftList,
  () => {
    leftList.value.forEach((item: IMATERIALITEM) => {
      item.layout = 'left'
    })
    resumeJsonNewStore.value.COMPONENTS = leftList.value.concat(rightList.value)
  },
  { deep: true }
)

watch(
  rightList,
  () => {
    rightList.value.forEach((item: IMATERIALITEM) => {
      item.layout = 'right'
    })
    resumeJsonNewStore.value.COMPONENTS = leftList.value.concat(rightList.value)
  },
  { deep: true }
)

// 复制左侧模块
const leftCopyModel = (modeItem: IMATERIALITEM) => {
  const index = getModelIndex(leftList.value, modeItem.keyId)
  const copyModel = cloneDeep(modeItem)
  leftList.value.splice(index, 0, copyModel)
}
// 删除左侧模块
const leftDeleteModel = (modelId: string) => {
  const index = getModelIndex(leftList.value, modelId)
  leftList.value.splice(index, 1)
}
//复制右侧模块
const rightCopyModel = (modeItem: IMATERIALITEM) => {
  const index = getModelIndex(leftList.value, modeItem.keyId)
  const copyModel = cloneDeep(modeItem)
  rightList.value.splice(index, 0, copyModel)
}

// 删除右侧模块
const rightDeleteModel = (modelId: string) => {
  const index = getModelIndex(leftList.value, modelId)
  rightList.value.splice(index, 1)
}
</script>

<style lang="scss" scoped>
.content-box {
  .dragArea {
    min-width: 820px;
    min-height: 300px;
    width: 820px;
    height: 1160px;
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
