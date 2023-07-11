<template>
  <div class="design-nav-box">
    <div class="nav-left">
      <img src="@/assets/logo.png" alt="logo" srcset="" />
      <span>化简</span>
    </div>
    <div class="nav-center">
      <p v-show="!showInput">
        <span class="draft-tips">{{ draftTips }}</span>
        {{ resumeJsonNewStore.TITLE }}
        <el-icon :size="20" color="#409eff" @click="changeTitle">
          <Edit />
        </el-icon>
      </p>
      <el-input
        ref="titleIptRef"
        v-show="showInput"
        autofocus
        v-model="resumeJsonNewStore.TITLE"
        placeholder="请输入标题"
        @blur="blurTitle"
        @keyup.enter="onEnter"
        style="--el-color-primary: #00c091"
      ></el-input>
    </div>
    <div class="nav-right">
      <el-tooltip class="box-item" effect="dark" content="返回首页" placement="bottom">
        <div class="icon-box" @click="toHome">
          <el-icon :size="20" color="#fff">
            <Back />
          </el-icon>
        </div>
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="保存草稿" placement="bottom">
        <div class="icon-box" @click="saveDraft">
          <svg-icon icon-name="icon-caogaoxiang1" color="#fff" size="17px"></svg-icon>
        </div>
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="导出为PDF" placement="bottom">
        <div class="icon-box" @click="generateReport">
          <svg-icon icon-name="icon-pdf" color="#fff" size="17px"></svg-icon>
        </div>
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="导出为JSON数据" placement="bottom">
        <div class="icon-box" @click="exportJSON">
          <svg-icon icon-name="icon-xiazai" color="#fff" size="17px"></svg-icon>
        </div>
      </el-tooltip>
      <el-tooltip
        v-if="name === 'custom'"
        class="box-item"
        effect="dark"
        content="导入JSON数据"
        placement="bottom"
      >
        <div class="icon-box" @click="importJSON">
          <svg-icon icon-name="icon-yunduanshangchuan" color="#fff" size="19px"></svg-icon>
        </div>
      </el-tooltip>
      <el-tooltip class="box-item" effect="dark" content="重置所有设置" placement="bottom">
        <div class="icon-box" @click="reset">
          <svg-icon icon-name="icon-zhongzhi" color="#fff" size="17px"></svg-icon>
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import appStore from '@/store'
import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import moment from 'moment'
import { debounce } from 'lodash'
import { ElMessage } from 'element-plus/lib/components/message/index'
import { ElMessageBox } from 'element-plus/lib/components/message-box/index'
import 'element-plus/theme-chalk/src/message-box.scss'

// 简历数据
const { resumeJsonNewStore } = storeToRefs(appStore.useResumeJsonNewStore)

const emits = defineEmits(['exportJSON', 'generateReport', 'importJSON', 'reset'])

//路由是否自定义模板
const route = useRoute()
const { name } = route.query // 模板id和模板名称

// 修改简历标题
const showInput = ref<boolean>(false)
const titleIptRef = ref<any>(null)
const changeTitle = () => {
  showInput.value = true
  titleIptRef.value.focus()
}
const blurTitle = () => {
  showInput.value = false
}
const onEnter = () => {
  showInput.value = false
}

// 返回首页
const router = useRouter()
const toHome = () => {
  router.push({
    path: '/'
  })
}

// 保存草稿数据到本地
const draftTips = ref<string>('')
const saveDraft = () => {
  draftToLocal()
  ElMessage({
    message: '保存草稿成功!',
    type: 'success',
    center: true
  })
}

const draftToLocal = () => {
  // 获取简历模板的id
  const key: string = resumeJsonNewStore.value.ID
  // 要保存的数据
  let saveData: { [key: string]: any } = {}
  const localDataJson: any = localStorage.getItem('resumeDraft')
  if (localDataJson) {
    saveData = JSON.parse(localDataJson)
    saveData[key] = resumeJsonNewStore.value
  } else {
    saveData[key] = resumeJsonNewStore.value
  }
  localStorage.setItem('resumeDraft', JSON.stringify(saveData))
  const date: string = moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  draftTips.value = `已自动保存草稿${date}`
}

//监听简历数据，自动保存简历数据草稿
const debounceHandle: any = debounce(draftToLocal, 1000)
watch(
  resumeJsonNewStore,
  () => {
    debounceHandle()
  },
  { deep: true }
)

// 导出为PDF
const generateReport = () => {
  emits('generateReport')
}

//导出为json数据
const exportJSON = () => {
  emits('exportJSON')
}

//导入json数据
const importJSON = () => {
  emits('importJSON')
}

//重置所有设置
const reset = () => {
  ElMessageBox.confirm('此操作将重置所有设置, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      emits('reset')
      draftTips.value = ''
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消重置'
      })
    })
}
</script>

<style lang="scss" scoped>
.design-nav-box {
  height: 50px;
  width: 100%;
  background-color: #fff;
  position: sticky;
  top: 0;
  display: flex;
  box-shadow: 0 5px 21px 0 rgb(78 78 78 / 5%);
  z-index: 20;

  .nav-left {
    width: 300px;
    display: flex;
    align-items: center;
    user-select: none;

    img {
      width: 60px;
      height: 60px;
      margin-left: 30px;
    }

    span {
      letter-spacing: 4px;
      font-size: 22px;
      font-weight: 600;
      font-family: cursive;
      color: green;
    }
  }

  .nav-center {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .draft-tips {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translate(0, -50%);
      font-size: 10px;
      color: #999999;
    }

    p {
      display: flex;
      align-items: center;
      font-size: 16px;

      .el-icon {
        margin-left: 10px;
        cursor: pointer;
      }
    }

    .el-input {
      width: 200px;
    }

    ::v-deep .el-input__inner {
      text-align: center;
    }
  }
}

.nav-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 10px;

  .el-button {
    margin-right: 20px;
    margin-left: 0;
  }

  .icon-box {
    width: 35px;
    height: 35px;
    background-color: #74a274;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    margin-right: 15px;
    transition: all 0.3s;

    &:hover {
      background-color: rgba(0, 192, 145, 0.8);
    }
  }
}
</style>
