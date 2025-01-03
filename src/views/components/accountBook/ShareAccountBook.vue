<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

const shareMethod = ref('wechat') // 默认分享方式为微信
const isSharing = ref(false)

const handleShare = async () => {
  isSharing.value = true
  try {
    // 模拟分享操作延迟
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    ElMessage({
      message: '分享成功!',
      type: 'success'
    })
  } catch (error) {
    ElMessage.error('分享失败，请重试')
  } finally {
    isSharing.value = false
  }
}
</script>

<template>
  <div class="share-container">
    <h3>分享账本</h3>

    <div class="share-preview">
      <div class="preview-card">
        <img src="https://tools-api.webcrumbs.org/image-placeholder/300/400/book/1" alt="账本预览" class="preview-image">
        <div class="preview-info">
          <h4>张三的账本</h4>
          <p>2024-01-20</p>
        </div>
      </div>
    </div>

    <div class="share-methods">
      <el-radio-group v-model="shareMethod" class="share-grid">
        <label class="share-radio-item">
          <el-radio label="wechat">
            <div class="share-icon-wrapper">
              <el-icon class="share-icon"><svg viewBox="0 0 1024 1024" width="20" height="20"><path d="M690.1 377.4c5.9 0 11.8.2 17.6.5-24.4-128.7-158.3-227.1-319.9-227.1C209 150.8 64 271.4 64 420.2c0 81.1 43.6 154.2 111.9 203.6a21.5 21.5 0 0 1 9.1 17.6c0 2.4-.5 4.6-1.1 6.9-5.5 20.3-14.2 52.8-14.6 54.3-.7 2.6-1.7 5.2-1.7 7.9 0 5.9 4.8 10.8 10.8 10.8 2.3 0 4.2-.9 6.2-2l70.9-40.9c5.3-3.1 11-5 17.2-5 3.2 0 6.4.5 9.5 1.4 33.1 9.5 68.8 14.8 105.7 14.8 6 0 11.9-.1 17.8-.4-7.1-21-10.9-43.1-10.9-66 0-135.8 132.2-245.8 295.3-245.8z" fill="#41b883"/><path d="M866.7 792.7c56.9-41.2 93.2-102 93.2-169.7 0-124-120.8-224.5-269.9-224.5-149 0-269.9 100.5-269.9 224.5S540.9 847.5 690 847.5c30.8 0 60.6-4.4 88.1-12.3 2.6-.8 5.2-1.2 7.9-1.2 5.2 0 9.9 1.6 14.3 4.1l59.1 34c1.7 1 3.3 1.7 5.2 1.7 5 0 9.3-4.1 9.3-9.1 0-2.2-.8-4.3-1.4-6.6-.3-1.2-7.6-28.3-12.2-45.3-.5-1.9-.9-3.8-.9-5.7.1-5.9 3.1-11.2 7.6-14.5z" fill="#41b883"/></svg></el-icon>
              <span>微信分享</span>
            </div>
          </el-radio>
        </label>
        <label class="share-radio-item">
          <el-radio label="qrcode">
            <div class="share-icon-wrapper">
              <el-icon class="share-icon"><svg viewBox="0 0 1024 1024" width="20" height="20"><path d="M149.333333 149.333333h298.666667v298.666667H149.333333V149.333333z m384 0h298.666667v298.666667h-298.666667V149.333333z m-384 384h298.666667v298.666667H149.333333v-298.666667z m469.333334 0h42.666666v42.666667h-42.666666v-42.666667z m85.333333 0h42.666667v42.666667h-42.666667v-42.666667z m85.333333 0h42.666667v42.666667h-42.666667v-42.666667z m-170.666666 85.333334h42.666666v42.666666h-42.666666v-42.666666z m85.333333 0h42.666667v42.666666h-42.666667v-42.666666z m85.333333 0h42.666667v42.666666h-42.666667v-42.666666z m-170.666666 85.333333h42.666666v42.666667h-42.666666v-42.666667z m85.333333 0h42.666667v42.666667h-42.666667v-42.666667z m85.333333 0h42.666667v42.666667h-42.666667v-42.666667z m-170.666666 85.333333h42.666666v42.666667h-42.666666v-42.666667z m85.333333 0h42.666667v42.666667h-42.666667v-42.666667z m85.333333 0h42.666667v42.666667h-42.666667v-42.666667z" fill="#41b883"/></svg></el-icon>
              <span>二维码分享</span>
            </div>
          </el-radio>
        </label>
      </el-radio-group>
    </div>
  </div>
</template>

<style scoped>
.share-container {
  padding: 20px;
}

.share-methods {
  margin: 60px 0 0 0;
}

.share-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  padding: 20px;
}

.share-radio-item {
  height: 100px;
  border: 1px solid #dcdfe6;
  border-radius: 8px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.share-radio-item:hover {
  border-color: #409eff;
  background: #f5f7fa;
  transform: translateY(-2px);
}

.share-icon-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.share-icon-wrapper i {
  font-size: 24px;
  color: #606266;
}

.share-icon-wrapper span {
  font-size: 14px;
  color: #606266;
}

.share-preview {
  margin: 30px 0;
  display: flex;
  justify-content: center;
}

.preview-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
  width: 80%;
  height: 200px;
}

.preview-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
}

.preview-info h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
}

.preview-info p {
  margin: 5px 0 0;
  color: #666;
  font-size: 14px;
}

.share-button {
  margin-top: 30px;
  text-align: center;
}
</style>
