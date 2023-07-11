<template>
  <div
    class="material-model-box"
    v-if="item.show"
    @mouseover="hendleOver"
    @mouseleave="hendleLeave"
    :ref="(el) => setRefItem(el, item.keyId)"
    @click="selectModel"
  >
    <div class="edit-box" v-if="hoverId === item.keyId">
      <el-tooltip content="复制当前模块" placement="bottom" effect="dark">
        <div class="copy" @click.stop="addModel(item)">
          <svg-icon icon-name="icon-jia" class-name="icon" color="#fff" size="16px"></svg-icon>
        </div>
      </el-tooltip>
      <el-tooltip content="删除当前模块" placement="bottom" effect="dark">
        <div class="delete" @click.stop="deleteModel(item)">
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
import cloneDeep from 'lodash'
import { useGetModelIndex } from '@/hooks/useGetModelIndex'

const props = defineProps<{
  item: IMATERIALITEM
  components: any
}>()

const emits = defineEmits(['left-right-copy-model', 'left-right-delete-model'])

//导入简历数据
const { resumeJsonNewStore } = storeToRefs(appStore.useResumeJsonNewStore)

// 鼠标移入
const hoverId = ref<string>('')
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

// 点击选择模块
const { updateSelectModel, resetSelectModel } = appStore.useSelectMaterialStore
const selectModel = () => {
  // 更新store
  updateSelectModel(
    props.item.model,
    props.item.cptOptionsName,
    props.item.cptTitle,
    props.item.keyId
  )
}

// 复制模块
const addModel = (item: IMATERIALITEM) => {
  if (resumeJsonNewStore.value.LAYOUT === 'classical') {
    classicalCopyModel(item, item.keyId)
  } else {
    //left-right布局是分成两个list去渲染，分发出去custom组件处理
    emits('left-right-copy-model', item)
  }
}

// 删除模块
const deleteModel = (item: IMATERIALITEM) => {
  if (resumeJsonNewStore.value.LAYOUT === 'classical') {
    classicalDeleteModel(item.keyId)
  } else {
    //left-right布局是分成两个list去渲染，分发出去custom组件处理
    emits('left-right-delete-model', item)
  }
  //重置当前选中模块的数据
  resetSelectModel()
}

// 传统布局-模块复制
const classicalCopyModel = (modelinfo: IMATERIALITEM, modelId: string) => {
  //拷贝选中模块的数据
  let copyModel = cloneDeep(modelinfo)
  //获取插入位置
  const index = useGetModelIndex(resumeJsonNewStore.value.COMPONENTS, modelId)
  // 拼接更新
  resumeJsonNewStore.value.COMPONENTS.splice(index, 0, copyModel)
}

//传统布局-模块删除
const classicalDeleteModel = (modelId: string) => {
  //获取位置
  const index = useGetModelIndex(resumeJsonNewStore.value.COMPONENTS, modelId)
  // 删除模块
  resumeJsonNewStore.value.COMPONENTS.splice(index, 1)
}
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
