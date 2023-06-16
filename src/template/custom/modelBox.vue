<template>
  <div
    class="material-model-box"
    v-if="item.show"
    @mouseover="hendleOver"
    @mouseleave="hendleLeave"
    :ref="(el) => setRefItem(el, item.keyId)"
  >
    <div class="edit-box" v-if="hoverId === item.keyId">
      <el-tooltip content="复制当前模块" placement="bottom" effect="dark">
        <div class="copy" @click.stop="addModel">
          <svg-icon icon-name="icon-jia" class-name="icon" color="#fff" size="16px"></svg-icon>
        </div>
      </el-tooltip>
      <el-tooltip content="删除当前模块" placement="bottom" effect="dark">
        <div class="delete" @click.stop="useDeleteModel">
          <svg-icon
            icon-name="icon-shanchu"
            class-name="icon icon-shanchu"
            color="#fff"
            size="18px"
          ></svg-icon>
        </div>
      </el-tooltip>
    </div>
    <!-- 物料组件 -->
    <component
      :is="components[item.cptName]"
      :model-data="item.data"
      :model-style="item.style"
      :class="['mode-item', { isHover: hoverId === item.keyId }]"
    ></component>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch, type ComponentPublicInstance } from 'vue'
import type { IMATERIALITEM } from '@/interface/material'
import appStore from '@/store'
import { storeToRefs } from 'pinia'
// import { constant } from 'lodash';
const props = defineProps<{
  item: IMATERIALITEM
  components: any
}>()

const hoverId = ref<string>('')
// 鼠标移入
const hendleOver = () => {
  hoverId.value = props.item.keyId
}

// 鼠标移出
const hendleLeave = () => {
  hoverId.value = ''
}

// 模块ref
const modelObj = reactive<any>({})
const setRefItem = (el: ComponentPublicInstance | null | Element, keyId: string) => {
  if (el) {
    modelObj[keyId] = {
      el: el,
      id: keyId
    }
  }
}
// 锚点定位
const { cptKeyId } = storeToRefs(appStore.useSelectMaterialStore)
watch(
  cptKeyId,
  (newVal, oldVal) => {
    // 判断是否选中复选框
    if (oldVal && modelObj[oldVal]) {
      modelObj[oldVal].el.style.borderColor = 'transparent'
    }
    //如果选中模块就滚动模块到当前视图
    if (newVal && modelObj[newVal]) {
      modelObj[newVal].el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      modelObj[newVal].el.style.borderColor = '#7ec97e'
    }
  },
  { deep: true }
)

// 复制模块

const addModel = () => {}

// 删除模块
const useDeleteModel = () => {}
</script>

<style lang="scss" scoped>
.material-model-box {
  border: 1px dashed transparent;
  transition: all 0.3s;
  position: relative;

  .mode-item {
    border: 1px dashed transparent;
    position: relative;
    // border-radius: 8px;
    // overflow: hidden;
    user-select: none;
    box-sizing: border-box;

    &:hover {
      border: 1px dashed #7ec97e;
      cursor: move;
    }
  }

  .isHover {
    position: relative;

    &::after {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba($color: #000000, $alpha: 0.1);
    }
  }

  .edit-box {
    position: absolute;
    right: 0px;
    top: -35px;
    display: flex;

    .copy,
    .delete {
      width: 35px;
      height: 35px;
      background-color: #00c091;
      border-radius: 3px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: rgba(#00c091, 0.8);
      }
    }

    .delete {
      margin-left: 6px;
    }
  }
}
</style>
