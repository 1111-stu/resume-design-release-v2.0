<template>
  <div class="template-card-box" @mouseover="mouseover" @mouseleave="mouseleave">
    <!-- 图片 -->
    <img :src="getAssetsFile(cardData.preview)" alt="" />
    <!-- 遮罩层 -->
    <div v-show="isLayer" class="mask-layer">
      <div v-if="cardData.name !== 'custom'" class="preview-icon" title="预览" @click="previewImg">
        <svg-icon icon-name="icon-yulan" class-name="yulan"></svg-icon>
      </div>
      <div class="design-button" @click="toDesign">立即免费制作</div>
    </div>
    <!-- 预览图片 -->
    <PreviewImage v-show="dialogVisble" @close="close">
      <img :src="getAssetsFile(cardData.preview)" alt="" class="preview-img" />
    </PreviewImage>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PreviewImage from '@/components/PreviewImage/PreviewImage.vue'
import { getAssetsFile } from '@/utils/common'
import type { ITempList } from '@/template/type'
defineProps<{
  cardData: ITempList
}>()
const emit = defineEmits(['toDesign'])
// 鼠标移入显示遮罩层
let isLayer = ref<boolean>(false)
const mouseover = () => {
  isLayer.value = true
}
const mouseleave = () => {
  isLayer.value = false
}

// 图片预览
let dialogVisble = ref<boolean>(false)

const previewImg = () => {
  dialogVisble.value = true
  //阻止页面滚动
  window.addEventListener('wheel', preventScroll, { passive: false })
}

const close = () => {
  dialogVisble.value = false
  // 恢复页面滚动
  window.removeEventListener('wheel', preventScroll)
}

const preventScroll = (e: Event) => {
  e.preventDefault()
}

//跳转到设计页面
const toDesign = () => {
  emit('toDesign')
}
</script>

<style lang="scss" scoped>
.template-card-box {
  width: 270px;
  background-color: #fff;
  border-radius: 5px;
  position: relative;
  user-select: none;
  margin: 0 10px;
  overflow: hidden;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    transition: all 0.1s;
    box-shadow: 5px 5px 5px 0px rgba(175, 50, 50, 0.2);
  }

  img {
    width: 100%;
  }

  .mask-layer {
    position: absolute;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
    z-index: 1;
    background-color: rgb(0, 0, 0, 0.5);
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
    transition: all 0.3s;

    .preview-icon {
      position: absolute;
      right: 15px;
      top: 15px;
      z-index: 12;
      width: 30px;
      height: 30px;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;

      .yulan {
        cursor: pointer;
        font-size: 20px;
        color: #fff;
      }
    }

    .design-button {
      width: 100px;
      height: 30px;
      font-size: 13px;
      background-color: #2cbd99;
      border-radius: 6px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #ffffff;
      transition: all 0.3s;

      &:hover {
        background-color: rgba(#42aa90, 0.7);
      }
    }
  }

  .preview-img {
    height: 90vh;
    width: auto;
  }
}
</style>
