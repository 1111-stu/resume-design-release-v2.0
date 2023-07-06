//获取选中物料组件的index
export const useGetModelIndex = (modelList: any[], modelId: string) => {
  return modelList.findIndex((item) => item.keyId === modelId)
}
