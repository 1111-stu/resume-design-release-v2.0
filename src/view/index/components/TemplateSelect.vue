<template>
  <div class="template-select-box">
    <IntroduceTitle
      title="免费模板"
      content="用心设计每一套模板，适合各行各业从业者"
      title-color="#000"
      content-color="#7f8b96"
    >
    </IntroduceTitle>
    <!-- 模板列表 -->
    <div class="card-list">
      <template v-for="(item, index) in templateList" :key="index">
        <TemplateCard :card-data="item" @to-design="toDesign(item)"></TemplateCard>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import IntroduceTitle from './IntroduceTitle.vue'
import TemplateCard from './TemplateCard.vue'
import templateList from '@/template/index'
import type { ITempList } from '@/template/type'
import { useRouter } from 'vue-router'
import appStore from '@/store'
import { openGlobalLoading } from '@/utils/common'

const { resetSelectModel } = appStore.useSelectMaterialStore

// 跳转到对应的模板设计页面
const router = useRouter()
const toDesign = (Item: ITempList) => {
  openGlobalLoading() // 等待动画层
  resetSelectModel() // 重置选中模块
  router.push({
    path: '/design',
    query: {
      id: Item.id,
      name: Item.name
    }
  })
}
</script>

<style lang="scss" scoped>
.template-select-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 700px;

  .card-list {
    width: 100vw;
    display: flex;
    margin-top: 25px;
  }
}
</style>
