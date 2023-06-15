<template>
  <div>
    <component
      :is="components[item.cptName]"
      :model-data="item.data"
      :model-style="item.style"
    ></component>
  </div>
</template>

<script setup lang="ts">
import type { IMATERIALITEM } from '@/interface/material'
defineProps<{
  item: IMATERIALITEM
  components: any
}>()
</script>

<style lang="scss" scoped></style>
