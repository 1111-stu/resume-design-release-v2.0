<template>
  <div class="chatArea">
    <h2>您好！！这里是简历智能助手，我可以回答您任何有关求职的问题！</h2>
    <div class="chat_container" ref="chatContainer">
      <div v-for="(item, index) in randerList" :key="index">
        <chatRaw :is-ai="item.isAi" :value="item.value" :id="item.id ? item.id : 'users'"></chatRaw>
      </div>
    </div>
    <form ref="form" @submit="handleSubmit">
      <textarea name="prompt" rows="1" cols="1" placeholder="Ask AiHelper..."></textarea>
      <button class="clear" type="button" @click="clearRenderList">Clear</button>
      <button type="submit"><img src="@/assets/images/send.svg" alt="send" /></button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import chatRaw from '@/view/chat/components/chatRaw.vue'

//获取form
const form = ref<any>(null)
const chatContainer = ref<any>(null)

//流式响应AI应答文本
const typeText = (randerDataList: any, text: any) => {
  let index = 0

  let interval = setInterval(() => {
    if (index < text.length) {
      const length = randerDataList.length
      randerDataList[length - 1].value += text.charAt(index)
      index++
    } else {
      clearInterval(interval)
    }
  }, 20)
}

// 生成唯一id
const generateUniqueId = () => {
  const timestamp = Date.now()
  const randomNumber = Math.random()
  const hexadecimalString = randomNumber.toString(16)

  return `id-${timestamp}-${hexadecimalString}`
}

// 渲染结点的数据集合
interface RanderNode {
  isAi: boolean
  value: FormDataEntryValue
  id?: string
}
let randerList = reactive<RanderNode[]>([])

// 提交表单
const handleSubmit = async (e: any) => {
  // 阻止默认事件
  e.preventDefault()

  // 获取表单输入数据
  const data = new FormData(form.value)
  let useAskValue: FormDataEntryValue = data.get('prompt') as FormDataEntryValue
  randerList.push({ isAi: false, value: useAskValue })

  // 清空输入框
  form.value.reset()

  // 生成唯一id
  const uniqueId = generateUniqueId()

  // 滚动到底部
  scrollToBottom()
  loader(randerList, uniqueId)

  const response = await fetch('http://localhost:5000', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      prompt: data.get('prompt')
    })
  })
  if (response.ok) {
    clearInterval(loadInterval)
    randerList[randerList.length - 1].value = ''
    const data = await response.json()
    const parsedData = data.bot.trim() //修减尾部多余的空格 /'\n'
    typeText(randerList, parsedData)
  } else {
    const err = await response.text()
    randerList.push({ isAi: true, value: 'Something went wrong"', id: uniqueId })
    alert(err)
  }
}
// 加载动画
let loadInterval: any
const loader = (randerDataList: any, uniqueId: string) => {
  randerDataList.push({ isAi: true, value: '', id: uniqueId })
  loadInterval = setInterval(() => {
    randerDataList[randerDataList.length - 1].value += '.'
    if (randerDataList[randerDataList.length - 1].value === '....') {
      randerDataList[randerDataList.length - 1].value = ''
    }
  }, 300)
}

//自动滚动到底部
const scrollToBottom = () => {
  chatContainer.value.scrollTop = chatContainer.value.scrollHeight
}

//清除记录
const clearRenderList = () => {
  randerList.splice(0, randerList.length)
}
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Alegreya+Sans:wght@100;300;400;500;700;800;900&display=swap');

.chatArea {
  width: 100vw;
  height: 100vh;
  background: #343541;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  h2 {
    color: white;
    opacity: 0.5;
    font-size: 14px;
  }
}

.chat_container {
  flex: 1;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  gap: 10px;
  -ms-overflow-style: none;
  scrollbar-width: none;
  padding-bottom: 20px;
  scroll-behavior: smooth;
}

.chat_container::-webkit-scrollbar {
  display: none;
}

form {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 10px;
  background: #40414f;
  display: flex;
  flex-direction: row;
  gap: 10px;
}

textarea {
  width: 100%;
  color: #fff;
  font-size: 18px;
  padding: 10px;
  background: transparent;
  border-radius: 5px;
  border: none;
  outline: none;
}

button {
  outline: 0;
  border: 0;
  cursor: pointer;
  background: transparent;
}

.clear {
  color: #fff;
  font-size: 18px;
  padding: 10px;
  border-radius: 5px;
  border: none;
  outline: none;
}

form img {
  width: 30px;
  height: 30px;
}
</style>
