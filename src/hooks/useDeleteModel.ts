/**
 * @description 删除或关闭当前模块
 */

// 删除当前模块
export const useDeleteModel = (modelList: any[], modelItem: any, index: number) => {
  let sum: number = 0 // 是否有相同的模块
  modelList.forEach((item) => {
    if (item.model === modelItem.model) {
      sum++
    }
  })
  if (sum > 1) {
    modelList.splice(index, 1)
  } else {
    modelList[index].show = false
  }
}
