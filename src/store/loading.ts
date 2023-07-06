import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLoadingStore = defineStore('loadingStore', () => {
  const loading = ref<boolean>(false) // 全局loading
  // 修改loading状态
  function changeLoadingStatus(status: boolean) {
    loading.value = status
  }
  return {
    loading,
    changeLoadingStatus
  }
})
