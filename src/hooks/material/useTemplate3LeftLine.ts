import type { IMODELSTYLE } from '@/interface/modelStyle'
import { pxTonumber } from '@/utils/common'
import { computed } from 'vue'

const useGetLineLeft = (modelStyle: IMODELSTYLE, num: number = 15) => {
  const left = computed(() => {
    return pxTonumber(modelStyle.pLeftRight) - num + 'px'
  })
  return {
    left
  }
}
export default useGetLineLeft
