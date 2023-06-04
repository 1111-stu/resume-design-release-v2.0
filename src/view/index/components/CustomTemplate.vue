<template>
  <div class="custom-template-box" ref="customTempleRef">
    <IntroduceTitle
      title="自定义模板 + 随心所欲"
      content="自定义模板，随意搭配，自定义主题"
      title-color="#000"
      content-color="#7f8b96"
    >
    </IntroduceTitle>
    <div class="content">
      <div class="left">
        <img src="@/assets/images/index-drag.png" alt="" srcset="" />
      </div>
      <div class="right">
        <h1>丰富的物料模块组件，可随意进行搭配，还可进行主题配置等等</h1>
        <p>自定义的模板可提交至官方，将在首页展出</p>
        <div class="button" @click="toCustom">开始创建模板</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IntroduceTitle from './IntroduceTitle.vue'
const customTempleRef = ref(null)

const toCustom = () => {}
</script>

<style lang="scss" scoped>
.custom-template-box {
  min-height: 80vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;

  .content {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 0 2% 20px 5%;
    box-sizing: border-box;
    min-height: 60vh;

    .left {
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      box-shadow: 0px 0px 70px rgb(175 50 50 / 20%);
      user-select: none;

      img {
        width: 50vw;
      }
    }

    .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 100px;

      h1 {
        text-align: justify;
        word-break: normal;
        font-size: 2vw;
        letter-spacing: 2px;
        line-height: 1.5;
        background-clip: text;
        background-image: url('@/assets/images/font-bgc.png');
        -webkit-background-clip: text;
        color: transparent;
        margin-bottom: 10px;
      }

      p {
        margin-top: 10px;
        font-size: 1vw;
        opacity: 0.9;
        color: #7f8b96;
      }

      .button {
        width: 160px;
        height: 52px;
        line-height: 52px;
        margin-top: 40px;
        background-color: #00c090;
        text-align: center;
        color: #fff;
        font-size: 16px;
        border-radius: 52px;
        cursor: pointer;
        -webkit-transition: all 0.2s;
        -moz-transition: all 0.2s;
        -ms-transition: all 0.2s;
        transition: all 0.2s;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;

        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}
</style>
