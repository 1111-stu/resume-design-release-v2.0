<!--
 * @Author: 大雄吖 2981451773@qq.com
 * @Date: 2024-02-11 11:32:03
 * @LastEditors: 大雄吖 2981451773@qq.com
 * @LastEditTime: 2024-03-27 15:39:02
 * @FilePath: \resume-design-release-v2.0\src\view\article\components\EditArticle.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="editor">
    <mavon-editor
      ref="md"
      style="height: 100%"
      v-model="markdownContent"
      @save="saveValue"
      @imgAdd="imgAdd"
    ></mavon-editor>
    <!-- 使用v-html展示html内容 -->
    <!-- <div v-html="htmlContent"></div> -- -->
    <div class="pop-screen">
      <el-dialog
        v-model="dialogVisible"
        title="补充文章信息"
        width="800"
        :before-close="handleClose"
        center
      >
        <el-row class="mb-4">
          <el-col :span="2" class="flex items-center">
            <span class="font-bold text-l">标题：</span></el-col
          >
          <el-col :span="22">
            <el-input v-model="title" placeholder="输入文章标题" clearable />
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2" class="flex items-center"
            ><span class="font-bold text-l">描述：</span></el-col
          >
          <el-col :span="22" class="flex items-center">
            <el-input v-model="description" placeholder="输入文章描述"></el-input
          ></el-col>
        </el-row>
        <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
        <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="dialogVisible = false"> Confirm </el-button>
          </div>
        </template>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

// 导入axios
import axios from 'axios'

const markdownContent = ref<string>('')
const htmlContent = ref<string>('')

const dialogVisible = ref(true)
const saveValue = async (value: string, render: string) => {
  htmlContent.value = render
  // 发送请求保存markdown内容
  // const res = await axios.post('http://localhost:3000/api/addArticle', {
  //     title: 'Vue3 and Node.js Express Blog',
  //     content: htmlContent.value,
  // });
  // console.log(res);
  dialogVisible.value = true
}

// 获取mavon-editor实例
const md = ref<InstanceType<typeof mavonEditor>>()

// 绑定@imgAdd event
const imgAdd = (pos, $file) => {
  // 第一步.将图片上传到服务器.
  var formdata = new FormData()
  formdata.append('image', $file)
  axios({
    url: 'http://localhost:3000/api/uploadImg',
    method: 'post',
    data: formdata,
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then((res) => {
    // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
    if (res.status === 200) {
      const url = res.data.data
      console.log('url', url)
      // $vm.$img2Url 详情见本页末尾
      md.value.$img2Url(pos, url)
    }
  })
}

// 文章图片地址
// const imgUrl = ref<string>('')
</script>
<style>
#editor {
  margin: 0 auto;
  width: 90vw;
  height: 90vh;
  margin-top: 10px;
}
</style>
