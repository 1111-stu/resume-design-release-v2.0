declare module 'colorpicker-v3' {
  import { App } from 'vue'

  const ColorPicker: {
    install: (app: App) => void
  }

  export default ColorPicker
}
