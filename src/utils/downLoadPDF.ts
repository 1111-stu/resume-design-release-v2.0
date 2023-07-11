import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'

// 使用html2canvas+JsPDF实现导出PDF
const downloadPDF = (
  el: HTMLElement,
  pdfName: string,
  preview: boolean,
  callback: Function
): void => {
  const eleW: number = el.offsetWidth // 获得该容器的宽
  const eleH: number = el.offsetHeight // 获得该容器的高

  const eleOffsetTop: number = el.offsetTop // 获得该容器到文档顶部的距离
  const eleOffsetLeft: number = el.offsetLeft // 获得该容器到文档最左的距离

  const canvas: HTMLCanvasElement = document.createElement('canvas')
  let abs: number = 0
  const win_in: number = document.documentElement.clientWidth || document.body.clientWidth // 获得当前可视窗口的宽度（不包含滚动条）
  const win_out: number = window.innerWidth // 获得当前窗口的宽度（包含滚动条）

  if (win_out > win_in) {
    abs = (win_out - win_in) / 2 // 获得滚动条宽度的一半
  }
  canvas.width = eleW * 2 // 将画布宽&&高放大两倍
  canvas.height = eleH * 2

  const context: any = canvas.getContext('2d')
  context.scale(2, 2)
  context.translate(-eleOffsetLeft - abs, -eleOffsetTop)

  html2canvas(el, {
    scale: 2, // 设置缩放
    useCORS: true, // 允许canvas画布内 可以跨域请求外部链接图片, 允许跨域请求。,
    logging: false // 打印日志用的 可以不加默认为false
  }).then((canvas) => {
    // el.setAttribute("crossOrigin",'anonymous');
    const contentWidth = canvas.width
    const contentHeight = canvas.height
    //一页pdf显示html页面生成的canvas高度;
    const pageHeight = (contentWidth / 592.28) * 841.89
    //未生成pdf的html页面高度
    let leftHeight = contentHeight
    //页面偏移
    let position = 0
    //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
    const imgWidth = 595.28
    const imgHeight = (595.28 / contentWidth) * contentHeight
    const pageData = canvas.toDataURL('image/jpeg', 1.0)
    const pdf = new JsPDF('', 'pt', 'a4')

    if (leftHeight < pageHeight) {
      //在pdf.addImage(pageData, 'JPEG', 左，上，宽度，高度)设置在pdf中显示；
      pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
    } else {
      // 分页
      while (leftHeight > 0) {
        pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
        leftHeight -= pageHeight
        position -= 841.89
        //避免添加空白页
        if (leftHeight > 0) {
          pdf.addPage()
        }
      }
    }
    if (preview) {
      const dataUrl = pdf.output('datauristring')
      callback(dataUrl)
      return
    }
    //可动态生成
    pdf.save(pdfName)
    callback()
  })
}
export default downloadPDF
