<template>
  <div class="footer-box">
    <ul>
      <li>
        <svg-icon icon-name="icon-bilibili-copy" class-name="bilibili"></svg-icon>
        <a href="" target="_blank" rel="noopener noreferrer">大雄课堂</a>
      </li>
      <div class="lines"></div>
      <li>
        <svg-icon icon-name="icon-juejin-logo" class-name="juejin"></svg-icon>
        <a href="" target="_blank" rel="noopener noreferrer">CSDN</a>
      </li>
      <div class="lines"></div>
      <li>
        <svg-icon icon-name="icon-shejiaotubiao-10" class-name="zhihu"></svg-icon>
        <a href="" target="_blank" rel="noopener noreferrer">-最爱吃兽奶-</a>
      </li>
    </ul>
    <!-- 访问量 -->
    <!-- <div class="visit">
    </div> -->
  </div>
</template>
<style lang="scss" scoped>
.footer-box {
  width: 100%;
  height: 100px;
  background-color: #242529;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  ul {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 400px;

    li {
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      color: rgb(236, 235, 235);
      padding: 0 10px;
      height: 20px;

      .bilibili {
        font-size: 18px;
      }

      .juejin {
        font-size: 24px;
      }

      .zhihu {
        font-size: 20px;
      }

      a {
        color: inherit;
        text-decoration: none;
        letter-spacing: 2px;
        transition: all 0.3s;
        margin-left: 10px;

        &:hover {
          color: green;
        }
      }
    }

    .lines {
      height: 15px;
      width: 1px;
      background-color: #838799;
    }
  }

  .visit {
    color: rgb(201, 181, 181);
    font-size: 14px;
    letter-spacing: 3px;
  }
}
</style>
