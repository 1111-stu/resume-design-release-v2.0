<template>
  <div class="project-Introduce-box">
    <div class="left">
      <h1>一款开源的、免费的简历设计神器</h1>
      <p>快速设计、简历主题切换，支持一键导出PDF、JSON数据等。</p>
      <!-- 更多功能 -->
      <div class="more-panel">
        <div @click="onlineMake" class="button">在线制作</div>
        <div @click="customTemplate" class="button">自定义模板</div>
        <div @click="AiHelper" class="button ai-helper">AI助手</div>
      </div>
    </div>
    <div class="right">
      <img src="@/assets/images/index.png" alt="" class="bg-image" />
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['onlineMake', 'customTemplate', 'AiHelper'])

const onlineMake = () => {
  emit('onlineMake')
}
const customTemplate = () => {
  emit('customTemplate')
}
const AiHelper = () => {
  emit('AiHelper')
}
</script>

<style lang="scss" scoped>
.project-Introduce-box {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  position: relative;
  background: #3494e6;
  background: linear-gradient(to right, #ec6ead, #3494e6);

  .left {
    color: #fff;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 100px;

    h1 {
      font-size: 2.5vw;
      margin-bottom: 20px;
    }

    p {
      font-size: 1vw;
      opacity: 0.8;
    }

    .more-panel {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 420px;
      margin-top: 40px;

      .button {
        width: 120px;
        height: 38px;
        line-height: 38px;
        text-align: center;
        letter-spacing: 2px;
        color: #fff;
        font-size: 14px;
        background-image: -webkit-linear-gradient(to right, #2ddd9d, #1cc7cf);
        background-image: -moz-linear-gradient(to right, #2ddd9d, #1cc7cf);
        background-image: -ms-linear-gradient(to right, #2ddd9d, #1cc7cf);
        background-image: linear-gradient(to right, #2ddd9d, #1cc7cf);
        -webkit-border-radius: 50px;
        -moz-border-radius: 50px;
        border-radius: 50px;
        background-color: #2ddd9d;
        -webkit-transition: all 0.3s;
        -moz-transition: all 0.3s;
        -ms-transition: all 0.3s;
        -o-transition: all 0.3s;
        transition: all 0.3s;
        cursor: pointer;
        user-select: none;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }

  .right {
    margin-right: 5vw;

    img {
      width: 40vw;
      height: 50vh;
    }
  }
}
</style>
