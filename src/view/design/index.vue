<template>
  <div class="design-box">
    <!-- 导航栏 -->
    <design-nav></design-nav>
    <!-- 内容区域 -->
    <div class="content">
      <!-- 模块操作区域 -->
      <div class="left" ref="leftRef">
        <CScrollbar trigger="hover">
          <Title show-collapse @unflod-or-collapse="unflodOrCollapse"></Title>
          <model-list :left-show="leftStaus"></model-list>
        </CScrollbar>
      </div>

      <!-- 预览区域 -->
      <div class="center">
        <div class="resume-view" ref="htmlPdf">
          <!-- 简历模块 -->
          <div ref="htmlContentPdf">
            <component is="custom" @changeHeight="contentChangeHeight"></component>
          </div>
          <!-- 分页分割线 -->
          <template v-if="linesNumber > 0">
            <div></div>
          </template>
        </div>
      </div>

      <!-- 模块数据数据配置区域 -->
      <div class="right">
        <!-- 模块标题 -->
        <Title :title="cptTitle"></Title>
        <c-scrollbar
          trigger="hover"
          :h-thumb-style="{
            'background-color': 'rgba(0,0,0,0.4)'
          }"
        >
          <component
            :is="optionsComponents[cptOptionsName]"
            v-if="cptName"
            :key="cptKeyId"
          ></component>
          <!-- 全局主题样式设置 -->
          <GlobalStyleOptions v-else></GlobalStyleOptions>
        </c-scrollbar>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Title from './components/Title.vue'
import ModelList from './components/ModelList.vue'
import DesignNav from './components/DesignNav.vue'

import { ref } from 'vue'
import appStore from '@/store'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { CScrollbar } from 'c-scrollbar' // 滚动条

import { getTemplateJson } from '@/http/api/getTemplateJson'
import type { IDESIGNJSON } from '@/interface/design'
import MODEL_DATA_JSON from '@/schema/modelData'
import optionsComponents from '@/utils/registerMaterialOptionsCom'
import GlobalStyleOptions from '@/options/GlobalStyleOptions.vue'

const { cptTitle, cptName } = storeToRefs(appStore.useSelectMaterialStore)
const { changeResumeJsonData } = appStore.useResumeJsonNewStore
const { cptOptionsName, cptKeyId } = storeToRefs(appStore.useSelectMaterialStore) //选中模块数据配置项
// const { resumeJsonNewStore } = storeToRefs(appStore.useResumeJsonNewStore); // store里的模板数据

// 获取组件模板的id、name
const route = useRoute()
const { id, name } = route.query

//重置简历数据
const resetStoreLocal = async () => {
  //根据url获取对应模板的本地数据
  const url = `${location.origin}/json/${name}/template.json`
  const data: IDESIGNJSON = await getTemplateJson(url)
  let TEMPLATE_JSON
  TEMPLATE_JSON = data
  TEMPLATE_JSON.ID = id as string
  TEMPLATE_JSON.NAME = name as string
  TEMPLATE_JSON.COMPONENTS.forEach((item) => {
    item.data = MODEL_DATA_JSON[item.model]
  })
  //修改Store数据
  changeResumeJsonData(TEMPLATE_JSON)
}

//进入简历设计页面，数据初始化
const localDataJson: any = localStorage.getItem('resumeDraft')
if (localDataJson) {
  let localDataObj = JSON.parse(localDataJson)
  if (localDataObj) {
    //更新模板数据
    changeResumeJsonData(localDataJson)
  } else {
    //使用默认的模板数据
    resetStoreLocal()
  }
} else {
  resetStoreLocal()
}

// 展开或关闭左侧模块选择栏
const leftRef = ref<any>(null)
const leftStaus = ref<Boolean>(true)
const unflodOrCollapse = (status: boolean) => {
  if (status) {
    leftRef.value.style.width = '300px'
    setTimeout(() => {
      leftStaus.value = status
    }, 100)
  } else {
    leftRef.value.style.width = '70px'
    setTimeout(() => {
      leftStaus.value = status
    }, 100)
  }
}

// 简历模板高度发生改变
const linesNumber = ref<number>(0)
const contentChangeHeight = (height: number) => {
  linesNumber.value = Math.ceil(height / 1160)
  // htmlPdf.value.style.height = 1160 * linesNumber.value + 'px'; // 整个简历的高度
  // htmlContentPdf.value.style.height = htmlPdf.value.style.height;
}
</script>
<style lang="scss">
@import '../../style/options.scss';
</style>
<style lang="scss" scoped>
.design-box {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  overflow: hidden;

  .content {
    display: flex;
    width: 100%;

    .left {
      width: 300px;
      background-color: #fff;
      height: calc(100vh - 50px);
      overflow: auto;
      transition: all 0.3s;
    }

    .center {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex: 1;
      height: calc(100vh - 50px);
      overflow: auto;

      .resume-view {
        background: white;
        width: 820px;
        min-height: 1160px;
        margin: 30px 0;
        display: table;
        position: relative;
      }
    }

    .right {
      width: 355px;
      background-color: #fff;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      height: calc(100vh - 50px);
    }
  }
}
</style>
