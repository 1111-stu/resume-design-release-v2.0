declare module 'c-scrollbar' {
  import { App } from 'vue'

  export const install: (app: App) => void

  export interface CScrollbarOptions {
    trigger?: string
    hThumbStyle?: {
      'background-color': string
    }
    // 其他可能的选项...
  }

  export const CScrollbar: {
    new (options?: CScrollbarOptions): any
  }

  export default CScrollbar
}
