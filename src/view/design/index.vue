<template>
  <div class="design-box">
    <!-- 导航栏 -->
    <design-nav @generate-report="generateReport" @reset="reset"></design-nav>
    <!-- 内容区域 -->
    <div class="content">
      <!-- 模块操作区域 -->
      <div class="left" ref="leftRef">
        <CScrollbar trigger="hover">
          <Title show-collapse @unflod-or-collapse="unflodOrCollapse"></Title>
          <model-list :left-show="leftStaus" :key="refreshUuid"></model-list>
        </CScrollbar>
      </div>

      <!-- 预览区域 -->
      <div class="center" :key="refreshUuid">
        <div class="resume-view" ref="htmlPdf">
          <!-- 简历模块 -->
          <div ref="htmlContentPdf">
            <component is="custom" @changeHeight="contentChangeHeight"></component>
          </div>
          <!-- 分页分割线 -->
          <template v-if="linesNumber > 0">
            <!-- 根据index，动态设置分割线距离顶部高度 -->
            <div
              v-for="(item, index) in linesNumber"
              :ref="(el) => setLinesRef(el, index)"
              :style="{ top: `${1128 + 1132 * index}px` }"
              :key="index"
              class="lines"
            >
              <p class="tips">如果分割线遮挡内容，请通过调整模块上下边距以显示内容！</p>
              <p class="page">{{ index + 1 }}/{{ linesNumber }}</p>
            </div>
          </template>
        </div>
      </div>

      <!-- 模块数据数据配置区域 -->
      <div class="right" :key="refreshUuid">
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

import { ref, nextTick, onMounted } from 'vue'
import appStore from '@/store'
// import { ElMessage } from 'element-plus';
import { ElMessage } from 'element-plus/lib/components/message/index'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { CScrollbar } from 'c-scrollbar' // 滚动条
import { cloneDeep } from 'lodash'

import { getTemplateJson } from '@/http/api/getTemplateJson'
import type { IDESIGNJSON } from '@/interface/design'
import MODEL_DATA_JSON from '@/schema/modelData'
import optionsComponents from '@/utils/registerMaterialOptionsCom'
import downLoadPDF from '@/utils/downLoadPDF'
import { closeGlobalLoading, openGlobalLoading } from '@/utils/common'

import GlobalStyleOptions from '@/options/GlobalStyleOptions.vue'

const { cptTitle, cptName } = storeToRefs(appStore.useSelectMaterialStore)
const { changeResumeJsonData } = appStore.useResumeJsonNewStore
const { refreshUuid } = storeToRefs(appStore.useUuidStore)
const { setUuid } = appStore.useUuidStore
const { cptOptionsName, cptKeyId } = storeToRefs(appStore.useSelectMaterialStore) //选中模块数据配置项
const { resumeJsonNewStore } = storeToRefs(appStore.useResumeJsonNewStore) // store里的模板数据

openGlobalLoading()
//节点渲染完成，关闭全局等待层
onMounted(async () => {
  await nextTick()
  closeGlobalLoading()
})

// 获取组件模板的id、name
const route = useRoute()
const { id, name } = route.query

//获取本地数据,初始化store里面的简历数据
const resetStoreLocal = async () => {
  //根据url获取对应模板的本地数据
  const url = `${location.origin}/json/${name}/template.json`
  const data: IDESIGNJSON = await getTemplateJson(url)
  let TEMPLATE_JSON
  TEMPLATE_JSON = cloneDeep(data)
  TEMPLATE_JSON.ID = id as string
  TEMPLATE_JSON.NAME = name as string
  TEMPLATE_JSON.COMPONENTS.forEach((item) => {
    item.data = MODEL_DATA_JSON[item.model]
  })
  setUuid() //设置uuid
  //修改Store数据
  changeResumeJsonData(TEMPLATE_JSON)
}

//进入简历设计页面，数据初始化
const localDataJson: any = localStorage.getItem('resumeDraft')
if (localDataJson) {
  let tempLocalData = JSON.parse(localDataJson)[id as string] //根据id获取对应模板的本地数据
  if (tempLocalData) {
    //更新模板数据
    changeResumeJsonData(tempLocalData)
  } else {
    //使用默认的模板数据
    resetStoreLocal()
  }
} else {
  resetStoreLocal()
}

// 全局样式设置
const globalStyleSetting = () => {
  // 重置store选中模块
  resetSelectModel()
}

// 重置简历数据
const reset = () => {
  resetStoreLocal()
  // changeResumeJsonData(downloadResumeJson)
  globalStyleSetting() // 重置选中模块
  // 删除本地该条数据
  let localData = localStorage.getItem('resumeDraft') // 本地缓存数据
  if (localData) {
    let allData = JSON.parse(localData)
    if (Object.keys(allData).length > 1) {
      if (allData[id as string]) {
        delete allData[id as string] // 删除该条数据
        localStorage.setItem('resumeDraft', JSON.stringify(allData))
      }
    } else {
      localStorage.removeItem('resumeDraft')
    }
  }
  ElMessage({
    message: '重置成功!',
    type: 'success',
    center: true
  })

  setUuid()
}

//生成PDF
const { resetSelectModel } = appStore.useSelectMaterialStore
const generateReport = async () => {
  let temp = linesNumber.value
  linesNumber.value = 0
  resetSelectModel() // 重置选中模块
  await nextTick()
  downLoadPDF(htmlPdf.value, resumeJsonNewStore.value.TITLE, false, () => {
    linesNumber.value = temp
  })
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

// 最后一条分割线出现在底部
const linesRef = ref<HTMLElement[]>([])
const setLinesRef = (el: any, index: number) => {
  if (el) {
    if (linesNumber.value === index + 1) {
      el.style.top = linesNumber.value * 1160 + 'px'
    }
    linesRef.value[index] = el
  }
}

// 简历模板高度发生改变
const htmlPdf = ref<any>(null)
const htmlContentPdf = ref<any>(null)
const linesNumber = ref<number>(0)
const contentChangeHeight = (height: number) => {
  linesNumber.value = Math.ceil(height / 1160)
  htmlPdf.value.style.height = 1160 * linesNumber.value + 'px' // 整个简历的高度
  htmlContentPdf.value.style.height = htmlPdf.value.style.height
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

      .lines {
        z-index: 10;
        width: 820px;
        height: 24px;
        background: #f3f3f3 url(@/assets/images/paging_bg.png) center top no-repeat;
        user-select: none;
        pointer-events: none;
        position: absolute;
        display: flex;
        align-items: center;

        .tips {
          font-size: 9px;
          color: #c7c7c7;
        }

        .page {
          font-size: 9px;
          color: #999999;
        }

        .page {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
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
