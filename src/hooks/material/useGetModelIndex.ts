//获取选中物料组件的index
const getModelIndex = (modelList: any[], modelId: string) => {
    return modelList.findIndex(item => item.keyId === modelId)
}
export default getModelIndex