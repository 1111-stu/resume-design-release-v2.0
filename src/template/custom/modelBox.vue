<template>
  <div
    class="material-model-box"
    v-if="item.show"
    @mouseover="hendleOver"
    @mouseleave="hendleLeave"
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
import { ref } from 'vue'
import type { IMATERIALITEM } from '@/interface/material'
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
