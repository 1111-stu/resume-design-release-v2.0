<template>
  <div class="design-nav-box">
    <div class="nav-left">
      <img src="@/assets/logo.png" alt="logo" srcset="" />
      <span>化简</span>
    </div>
    <div class="nav-center">
      <p>
        {{ title }}
        <el-icon :size="20" color="#409eff" @click="changeTitle">
          <Edit />
        </el-icon>
      </p>
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'
let title: string = ref('我的简历标题')

// 修改简历标题
const changeTitle = () => {}

// 返回首页
let router = useRouter()
const toHome = () => {
  router.push({
    path: '/'
  })
}

// 保存草稿
const saveDraft = () => {}

// 导出为PDF
const generateReport = () => {}

//导出为json数据
const exportJSON = () => {}

//导入json数据
const importJSON = () => {}

//重置所有设置
const reset = () => {}
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
}
</style>
