import { initResetFun } from '@/utils/storeTools';
import { useResumeJsonNewStore, useSelectMaterialStore } from './resume';



export interface IAppStore {
    useSelectMaterialStore: ReturnType<typeof useSelectMaterialStore>;
    useResumeJsonNewStore: ReturnType<typeof useResumeJsonNewStore>;
}


const appStore: IAppStore = {} as IAppStore;

/**
 * 注册app状态库
 */
export const registerStore = () => {
    appStore.useSelectMaterialStore = useSelectMaterialStore();
    appStore.useResumeJsonNewStore = useResumeJsonNewStore();
    // 重写reset方法
    initResetFun(appStore);
};
export default appStore;