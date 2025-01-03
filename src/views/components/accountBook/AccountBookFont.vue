<script setup lang="ts">
import { ref } from 'vue'
import { ElSelect, ElOption } from 'element-plus'

const selectedFont = ref('默认字体')

const fonts = [
  { value: 'default', label: '默认字体' },
  { value: 'songti', label: '宋体' },
  { value: 'heiti', label: '黑体' },
  { value: 'kaiti', label: '楷体' },
  { value: 'yahei', label: '微软雅黑' },
  { value: 'fangsong', label: '仿宋' },
  { value: 'arial', label: 'Arial' },
  { value: 'times', label: 'Times New Roman' },
  { value: 'courier', label: 'Courier New' },
  { value: 'helvetica', label: 'Helvetica' },
  { value: 'verdana', label: 'Verdana' },
]

const handleFontChange = (value: string) => {
  console.log('Selected font:', value)
  // 这里可以添加字体切换的具体逻辑
  // 获取AccountBookContent组件的根元素
  const accountBookContent = document.querySelector('.content')
  if (accountBookContent) {
    switch (value) {
      case 'songti':
        accountBookContent.style.fontFamily = 'SimSun, 宋体'
        break
      case 'heiti':
        accountBookContent.style.fontFamily = 'SimHei, 黑体'
        break  
      case 'kaiti':
        accountBookContent.style.fontFamily = 'KaiTi, 楷体'
        break
      case 'yahei':
        accountBookContent.style.fontFamily = 'Microsoft YaHei, 微软雅黑'
        break
      case 'fangsong':
        accountBookContent.style.fontFamily = 'FangSong, 仿宋'
        break
      case 'arial':
        accountBookContent.style.fontFamily = 'Arial, sans-serif'
        break
      case 'times':
        accountBookContent.style.fontFamily = 'Times New Roman, serif'
        break
      case 'courier':
        accountBookContent.style.fontFamily = 'Courier New, monospace'
        break
      case 'helvetica':
        accountBookContent.style.fontFamily = 'Helvetica, sans-serif'
        break
      case 'verdana':
        accountBookContent.style.fontFamily = 'Verdana, sans-serif'
        break
      default:
        accountBookContent.style.fontFamily = 'Open Sans, sans-serif'
    }
  }
}
</script>

<template>
  <div class="font-selector">
    <h3 class="mb-4">选择字体</h3>
    <el-select
      v-model="selectedFont"
      placeholder="请选择字体"
      @change="handleFontChange"
      style="width: 200px"
    >
      <el-option
        v-for="font in fonts"
        :key="font.value"
        :label="font.label"
        :value="font.value"
      />
    </el-select>
  </div>
</template>

<style scoped>
.font-selector {
  padding: 20px;
}

.mb-4 {
  margin-bottom: 16px;
}
</style>
