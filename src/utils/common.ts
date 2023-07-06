import { uuid } from 'vue-uuid'
import moment from 'moment' // 日期处理
import appStore from '@/store'

// 获取assets静态资源
export const getAssetsFile = (url: string) => {
  return new URL(`../assets/images/${url}`, import.meta.url).href
}
// 工具方法--px转数字
export const pxTonumber = (value: string | undefined): number => {
  if (value) {
    return Number(value.split('px')[0])
  } else {
    return 0
  }
}
// 工具方法--熟练度文字转数值
export const textToNumber = (value: string): number => {
  let number = 0
  switch (value) {
    case '了解':
      number = 25
      break
    case '一般':
      number = 50
      break
    case '熟悉':
      number = 75
      break
    case '精通':
      number = 100
      break
  }
  return number
}

// 工具方法--数值转熟练度文字方法
// 熟练度
export const numberToText = (value: number) => {
  if (value <= 25) {
    return '一般'
  } else if (value <= 50) {
    return '掌握'
  } else if (value <= 75) {
    return '熟练'
  } else {
    return '精通'
  }
}

// 生成uuid
export const getUuid = (): string => {
  return uuid.v4()
}

// 时间格式转化：['2015-5', '2019-6'] -> 2015.05 - 2019.06
export const formatDate = (dataArray: Array<string> | string): string => {
  if (Array.isArray(dataArray)) {
    const startDate = moment(new Date(dataArray[0])).format('YYYY.MM').split('-').join('.')
    const endDate = moment(new Date(dataArray[1])).format('YYYY.MM').split('-').join('.')
    return `${startDate}-${endDate}`
  } else {
    return moment(new Date(dataArray)).format('YYYY.MM').split('-').join('.')
  }
}
// 开启全局loading
export const openGlobalLoading = () => {
  const { changeLoadingStatus } = appStore.useLoadingStore
  changeLoadingStatus(true)
}

// 关闭全局loading
export const closeGlobalLoading = () => {
  const { changeLoadingStatus } = appStore.useLoadingStore
  changeLoadingStatus(false)
}

// 先开启等待层，然后指定时间关闭等待层
export const openAndCloseLoadingByTime = (time: number) => {
  openGlobalLoading()
  setTimeout(() => {
    closeGlobalLoading()
  }, time)
}
