<template>
  <div class="model-list-box">
    <div class="model-ul" v-if="resumeJsonNewStore.COMPONENTS.length">
      <draggable
        :list="resumeJsonNewStore.COMPONENTS"
        item-key="id"
        ghost-class="ghost"
        chosen-class="chosenClass"
        animation="300"
      >
        <template #item="{ element }">
          <div
            :class="[
              'model-list-item',
              { 'collapse-center': !leftShow },
              { active: appStore.useSelectMaterialStore.cptKeyId === element.keyId }
            ]"
            @click="selectModel(element)"
          >
            <div class="left">
              <div :class="['icon-box', { 'collapse-center': !leftShow }]">
                <el-tooltip
                  class="box-item"
                  placement="right"
                  effect="dark"
                  :content="element.data.title"
                  :disabled="leftShow"
                >
                  <svg-icon
                    :icon-name="element.data.iconfont ? element.data.iconfont : 'icon-xingquaihao'"
                    class-name="icon"
                    :color="leftShow ? '#c4c4c4' : '#00c091'"
                    size="16px"
                  ></svg-icon>
                </el-tooltip>
              </div>
              <p v-show="leftShow">{{ element.data.title }}</p>
            </div>
            <div class="right" v-show="leftShow">
              <div class="add-model-box">
                <el-switch v-model="element.show" size="small" active-color="#00C091" />
              </div>
            </div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script setup lang="ts">
import appStore from '@/store'
import draggable from 'vuedraggable'
import { storeToRefs } from 'pinia'
defineProps<{
  leftShow: Boolean
}>()

//简历数据
const { resumeJsonNewStore } = storeToRefs(appStore.useResumeJsonNewStore)

//更新选中的模块数据
const { updateSelectModel } = appStore.useSelectMaterialStore
const selectModel = (item: any) => {
  let optionsName: string = item.cptOptionsName
  let updateData = {
    model: item.model,
    optionsName: optionsName,
    title: item.data.title,
    keyId: item.keyId
  }
  updateSelectModel(updateData.keyId, updateData.optionsName, updateData.title, updateData.keyId)
}

//选中模块
</script>

<style lang="scss" scoped>
.model-list-box {
  padding: 0 1px;

  .icon-box {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #c4c4c4;
    border-radius: 50%;
  }

  .model-ul {
    display: flex;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 0;
    margin: 0;

    .model-list-item {
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: all-scroll;
      border: 1px solid transparent;
      position: relative;

      &:hover {
        border: 1px dashed #00c091;
      }

      &::after {
        content: '';
        width: 80%;
        height: 1px;
        background-color: #f4f4f4;
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translate(-50%, 0);
      }

      .left {
        display: flex;
        align-items: center;
        margin-left: 10px;

        p {
          margin: 0 0 0 10px;
          padding: 0;
          display: inline-block;
          height: 64px;
          max-width: 64px;
          line-height: 64px;
          font-size: 12px;
          color: #666666;
          cursor: pointer;
          overflow: hidden;
          text-overflow: ellipsis;
          word-break: break-word;
          white-space: nowrap;
        }
      }

      .right {
        display: flex;
        align-items: center;

        .add-model-box {
          cursor: pointer;
          display: flex;
          align-items: center;
          margin-right: 10px;
        }
      }

      .collapse-center {
        justify-content: center;
        margin-left: 10px;
      }
    }

    .active {
      background-color: rgba(227, 231, 234, 0.6);
    }
  }
}
</style>
