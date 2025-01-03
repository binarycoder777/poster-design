<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const downloadFormat = ref('pdf')
const isLoading = ref(false)

const handleDownload = async () => {
  isLoading.value = true
  try {
    // 模拟下载延迟
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    ElMessage({
      message: '下载成功!',
      type: 'success'
    })
  } catch (error) {
    ElMessage.error('下载失败，请重试')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="download-container">
    <h3>下载账本</h3>
    
    <div class="format-select">
      <el-radio-group v-model="downloadFormat">
        <el-radio label="pdf">PDF格式</el-radio>
        <el-radio label="excel">Excel格式</el-radio>
      </el-radio-group>
    </div>

    <div class="download-button">
      <el-button 
        type="primary"
        :loading="isLoading"
        @click="handleDownload"
      >
        {{ isLoading ? '下载中...' : '开始下载' }}
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.download-container {
  padding: 20px;
}

.format-select {
  margin: 20px 0;
}

.download-button {
  margin-top: 30px;
  text-align: center;
}
</style>
