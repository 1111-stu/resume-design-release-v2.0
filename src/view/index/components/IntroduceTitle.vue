<template>
  <div class="title">
    <h1>{{ title }}</h1>
    <p>{{ content }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  content: string
  titleColor?: string
  contentColor?: string
}>()
</script>

<style lang="scss" scoped>
.title {
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    position: relative;
    margin-bottom: 20px;
    letter-spacing: 3px;
    color: v-bind('titleColor');

    &::before {
      content: '';
      position: absolute;
      width: 200px;
      height: 2px;
      background-color: #bdc7d0;
      position: absolute;
      left: -250px;
      top: 50%;
    }

    &::after {
      content: '';
      width: 200px;
      height: 1px;
      background-color: #bdc7d0;
      position: absolute;
      right: -250px;
      top: 50%;
    }

    p {
      font-size: 14px;
      color: v-bind('contentColor');
    }
  }
}
</style>
