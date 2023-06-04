<template>
  <div class="index-box">
    <!-- 导航栏 -->
    <NavBar :bg-color="navColor" :font-color="fontColor" :icon-color="iconColor"></NavBar>
    <!-- 项目介绍 -->
    <ProjectIntroduce
      @online-make="scrollToMake"
      @custom-template="scrollToCustom"
    ></ProjectIntroduce>
    <!-- 模板选择 -->
    <Template-select ref="onlineMakeRef"></Template-select>
    <!-- 自定义模板 -->
    <CustomTemplate ref="customTemplateRef"></CustomTemplate>
    <!-- footer -->
    <FooterCom></FooterCom>
    <!-- 回到顶部 -->
    <el-backtop :bottom="100">
      <div
        style="
          height: 100%;
          width: 100%;
          background-color: var(--el-bg-color-overlay);
          box-shadow: var(--el-box-shadow-lighter);
          text-align: center;
          line-height: 40px;
          color: #1989fa;
          user-select: none;
          border-radius: 50%;
          font-size: 14px;
        "
      >
        UP
      </div>
    </el-backtop>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import NavBar from '@/components/NavBar/NavBar.vue'
import ProjectIntroduce from './components/ProjectIntroduce.vue'
import TemplateSelect from './components/TemplateSelect.vue'
import CustomTemplate from './components/CustomTemplate.vue'
import FooterCom from '@/components/FooterCom/FooterCom.vue'
import { throttle } from 'lodash'

// 监听元素滚动
onMounted(() => {
  window.addEventListener('scroll', throttleHandle)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', throttleHandle)
})
// 页面滚动改变导航栏样式
const throttleHandle = throttle(() => {
  handleScroll()
}, 300)
const navColor = ref<string>('')
const fontColor = ref<string>('#fff')
const iconColor = ref<string>('#fff')
const handleScroll = () => {
  if (document.documentElement.scrollTop > 0) {
    navColor.value = '#fff'
    fontColor.value = 'green'
    iconColor.value = 'green'
  } else {
    navColor.value = ''
    iconColor.value = '#fff'
    fontColor.value = '#fff'
  }
}

//点击在线制作
const onlineMakeRef = ref<any>(null)
const scrollToMake = () => {
  onlineMakeRef.value.$el.scrollIntoView({ behavior: 'smooth' })
}

//点击自定义模板
const customTemplateRef = ref<any>(null)
const scrollToCustom = () => {
  customTemplateRef.value.$el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style lang="scss" scoped>
.index-box {
  position: relative;
  z-index: 0;
}
</style>
