<script setup lang="ts">
import { ref, defineAsyncComponent, shallowRef } from 'vue'
import { ElButton, ElInput } from 'element-plus'
import { Search, Upload, Menu } from '@element-plus/icons-vue'

// 使用动态导入来实现组件懒加载
const AccountBook = defineAsyncComponent(() => import('./accountBook/AccountBook.vue'))

// 使用shallowRef代替ref来减少响应式开销
const categories = shallowRef([
  { id: 1, name: '婚宴', count: 45 },
  { id: 2, name: '满月', count: 23 },
  { id: 3, name: '周岁', count: 15 },
  { id: 4, name: '乔迁', count: 18 },
  { id: 5, name: '寿宴', count: 12 },
  { id: 6, name: '升学', count: 6 },
  { id: 7, name: '其他', count: 4 }
])

const isActive = shallowRef(true)
const searchText = ref('')
const totalBooks = ref(123)

const handleSearch = () => {
  // 实现搜索逻辑
  console.log('搜索:', searchText.value)
}

const handleCategoryBrowse = () => {
  // 实现分类浏览逻辑
  console.log('打开分类浏览')
}

const handleUpload = () => {
  // 实现上传逻辑
  console.log('打开上传对话框')
}

const openAccountBook = (id: number) => {
  console.log('打开账本:', id)
  isActive.value = false
}
</script>

<template>
  <div id="account-book-page" v-if="isActive">
    <div class="account-book-container">
      <div class="header">
        <div class="header-content">
          <h1>我的账本管理</h1>
          <div class="header-buttons">
            <el-button type="primary" :icon="Menu" @click="handleCategoryBrowse">
              分类浏览
            </el-button>
            <el-button type="success" :icon="Upload" @click="handleUpload">
              上传账本
            </el-button>
          </div>
        </div>
        <div class="search-container">
          <el-input
            v-model="searchText"
            placeholder="搜索账本或办酒人"
            :prefix-icon="Search"
            clearable
            @keyup.enter="handleSearch"
          />
        </div>
      </div>

      <div class="content">
        <div class="content-header">
          <div class="stats">
            <span class="total">总数: {{ totalBooks }}本</span>
            <el-button text type="primary">最近更新</el-button>
            <el-button text type="primary">收藏最多</el-button>
          </div>
        </div>

        <div class="book-grid">
          <div
            v-for="category in categories"
            :key="category.id"
            class="book-item"
            @click="openAccountBook(category.id)"
          >
            <div class="book-cover">
              <img
                :src="`https://api.example.com/covers/${category.id}`"
                :alt="category.name"
                class="book-image"
                loading="lazy"
              />
              <div class="book-overlay">
                <span class="book-count">{{ category.count }}本</span>
              </div>
            </div>
            <div class="book-info">
              <h3>{{ category.name }}</h3>
              <p class="book-desc">最近更新: 2024-01-20</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AccountBook v-else />
</template>

<style scoped>
#account-book-page {
  padding: 24px;
  background-color: #f5f7fa;
  min-height: 100vh;
}

.account-book-container {
  max-width: 1200px;
  margin: 0 auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.header {
  background: linear-gradient(135deg, #1890ff 0%, #36cfc9 100%);
  padding: 32px;
  border-radius: 12px 12px 0 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.header h1 {
  color: #fff;
  font-size: 28px;
  margin: 0;
}

.header-buttons {
  display: flex;
  gap: 12px;
}

.search-container {
  max-width: 600px;
  margin: 0 auto;
}

.content {
  padding: 24px;
}

.content-header {
  margin-bottom: 24px;
}

.stats {
  display: flex;
  align-items: center;
  gap: 24px;
}

.total {
  font-size: 16px;
  font-weight: 500;
  color: #1f2937;
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
}

.book-item {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  border: 1px solid #e5e7eb;
  cursor: pointer;
}

.book-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
}

.book-cover {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
}

.book-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.book-item:hover .book-image {
  transform: scale(1.05);
}

.book-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  color: #fff;
}

.book-info {
  padding: 16px;
}

.book-info h3 {
  margin: 0 0 8px;
  font-size: 16px;
  color: #1f2937;
}

.book-desc {
  margin: 0;
  font-size: 14px;
  color: #6b7280;
}

.book-count {
  font-size: 14px;
  font-weight: 500;
}
</style>
