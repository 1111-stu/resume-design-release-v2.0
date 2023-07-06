import { initResetFun } from '@/utils/storeTools'
import { useResumeJsonNewStore, useSelectMaterialStore } from './resume'
import { useLoadingStore } from './loading'
import { useUuidStore } from './uuid'

export interface IAppStore {
  useUuidStore: ReturnType<typeof useUuidStore>
  useLoadingStore: ReturnType<typeof useLoadingStore>
  useSelectMaterialStore: ReturnType<typeof useSelectMaterialStore>
  useResumeJsonNewStore: ReturnType<typeof useResumeJsonNewStore>
}

const appStore: IAppStore = {} as IAppStore

/**
 * 注册app状态库
 */
export const registerStore = () => {
  appStore.useUuidStore = useUuidStore()
  appStore.useLoadingStore = useLoadingStore()
  appStore.useSelectMaterialStore = useSelectMaterialStore()
  appStore.useResumeJsonNewStore = useResumeJsonNewStore()
  // 重写reset方法
  initResetFun(appStore)
}
export default appStore
