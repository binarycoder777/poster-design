<script setup lang="ts">
import { ref, defineAsyncComponent, shallowRef } from 'vue'
import { ElButton, ElInput, ElRadioGroup, ElRadioButton, ElDialog, ElForm, ElFormItem, ElSelect, ElOption } from 'element-plus'
import { Search, Upload, Menu, Timer, Notebook, Money, CaretTop, CaretBottom } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

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
const sortType = ref('') // 排序类型：latest, records, amount

const router = useRouter()

// 新增账本相关
const dialogVisible = ref(false)
const newBookForm = ref({
  name: '',
  category: '',
  date: '',
  remark: ''
})

// 修改排序状态的类型
type SortOrder = 'desc' | 'asc' | null

// 修改排序状态对象的类型
const sortOrders = ref<Record<string, SortOrder>>({
  latest: null,
  records: null,
  amount: null
})

const activeFilters = ref<string[]>([]) // 当前激活的筛选条件
const selectedCategory = ref('all') // 选中的分类

const handleSearch = () => {
  // 实现搜索逻辑
  console.log('搜索:', searchText.value)
}

const handleCategoryBrowse = () => {
  // 打开新增账本对话框
  dialogVisible.value = true
}

const handleUpload = () => {
  // 实现上传逻辑
  console.log('打开上传对话框')
}

const openAccountBook = (id: number) => {
  console.log('打开账本:', id)
  isActive.value = false
}

const handleBack = () => {
  // Simply toggle back to the account book list view
  isActive.value = true
}

const handleSort = (type: string) => {
  // 如果当前类型已在筛选条件中
  if (activeFilters.value.includes(type)) {
    // 当前是降序，切换为升序
    if (sortOrders.value[type] === 'desc') {
      sortOrders.value[type] = 'asc'
    }
    // 当前是升序，移除筛选条件
    else if (sortOrders.value[type] === 'asc') {
      sortOrders.value[type] = null
      activeFilters.value = activeFilters.value.filter(t => t !== type)
      return // 直接返回，不需要排序
    }
  } else {
    // 新添加的排序条件，默认为降序
    activeFilters.value.push(type)
    sortOrders.value[type] = 'desc'
  }
  
  const sortedCategories = [...categories.value]
  
  // 应用所有激活的筛选条件
  activeFilters.value.forEach(filter => {
    const order = sortOrders.value[filter]
    if (!order) return // 跳过没有排序方向的条件
    
    const isDesc = order === 'desc'
    switch(filter) {
      case 'latest':
        sortedCategories.sort((a, b) => isDesc ? b.id - a.id : a.id - b.id)
        break
      case 'records':
        sortedCategories.sort((a, b) => isDesc ? b.count - a.count : a.count - b.count)
        break
      case 'amount':
        sortedCategories.sort((a, b) => isDesc ? b.count * 100 - a.count * 100 : a.count * 100 - b.count * 100)
        break
    }
  })
  
  categories.value = sortedCategories
}

// 移除筛选条件
const removeFilter = (type: string) => {
  activeFilters.value = activeFilters.value.filter(t => t !== type)
  if (activeFilters.value.length > 0) {
    handleSort(activeFilters.value[activeFilters.value.length - 1])
  }
}

// 提交新增账本表单
const handleSubmit = () => {
  console.log('提交新增账本:', newBookForm.value)
  dialogVisible.value = false
  // 重置表单
  newBookForm.value = {
    name: '',
    category: '',
    date: '',
    remark: ''
  }
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
              新增账本
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
          <div class="filter-bar">
            <!-- 分类筛选 -->
            <el-select v-model="selectedCategory" placeholder="选择分类" class="category-select">
              <el-option label="全部分类" value="all" />
              <el-option label="婚宴" value="wedding" />
              <el-option label="满月" value="fullMonth" />
              <el-option label="周岁" value="firstBirthday" />
              <!-- 其他分类选项 -->
            </el-select>

            <div class="divider"></div>

            <!-- 排序筛选 -->
            <div class="sort-buttons">
              <el-button
                v-for="(label, type) in {
                  latest: '最新',
                  records: '记录数',
                  amount: '金额'
                }"
                :key="type"
                :class="[
                  'sort-btn',
                  { active: activeFilters.includes(type) }
                ]"
                @click="handleSort(type)"
              >
                {{ label }}
                <span v-if="sortOrders[type]" class="sort-indicator">
                  <el-icon>
                    <component :is="sortOrders[type] === 'desc' ? CaretBottom : CaretTop" />
                  </el-icon>
                </span>
              </el-button>
            </div>

            <div class="stats">
              <span class="total">共 {{ totalBooks }} 本</span>
            </div>
          </div>

          <!-- 激活的筛选条件展示 -->
          <div v-if="activeFilters.length" class="active-filters">
            <el-tag
              v-for="filter in activeFilters"
              :key="filter"
              closable
              @close="removeFilter(filter)"
              type="info"
              effect="plain"
            >
              {{ {latest: '最新', records: '记录数', amount: '金额'}[filter] }}
              {{ sortOrders[filter] === 'desc' ? '降序' : '升序' }}
            </el-tag>
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

    <!-- 新增账本对话框 -->
    <el-dialog
      v-model="dialogVisible"
      title="新增账本"
      width="500px"
    >
      <el-form :model="newBookForm" label-width="80px">
        <el-form-item label="账本名称">
          <el-input v-model="newBookForm.name" placeholder="请输入账本名称" />
        </el-form-item>
        <el-form-item label="账本分类">
          <el-select v-model="newBookForm.category" placeholder="请选择分类">
            <el-option label="婚宴" value="wedding" />
            <el-option label="满月" value="fullMonth" />
            <el-option label="周岁" value="firstBirthday" />
            <el-option label="乔迁" value="housewarming" />
            <el-option label="寿宴" value="birthday" />
            <el-option label="升学" value="graduation" />
            <el-option label="其他" value="other" />
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-input v-model="newBookForm.date" type="date" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="newBookForm.remark" type="textarea" rows="3" placeholder="请输入备注信息" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
  <AccountBook @back="handleBack" v-else />
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
  background-color: #fff;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.filter-bar {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.category-select {
  width: 120px;
}

.divider {
  width: 1px;
  height: 16px;
  background-color: #dcdfe6;
  margin: 0 16px;
}

.sort-buttons {
  display: flex;
  gap: 8px;
}

.sort-btn {
  height: 32px;
  padding: 0 16px;
  font-size: 13px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  background: #fff;
  color: #606266;
  transition: all 0.2s;
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.sort-btn:hover {
  color: var(--el-color-primary);
  border-color: var(--el-color-primary-light-7);
  background-color: var(--el-color-primary-light-9);
}

.sort-btn.active {
  color: var(--el-color-primary);
  border-color: var(--el-color-primary);
  background-color: var(--el-color-primary-light-9);
  font-weight: 500;
}

.sort-indicator {
  display: inline-flex;
  align-items: center;
  margin-left: 2px;
}

.sort-indicator .el-icon {
  font-size: 12px;
  transition: transform 0.3s ease;
}

/* 未激活状态的悬停效果 */
.sort-btn:not(.active):hover::after {
  content: '⇅';
  font-size: 12px;
  margin-left: 4px;
  opacity: 0.3;
}

.active-filters {
  margin-top: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

:deep(.el-tag) {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 8px;
  font-size: 12px;
  border-radius: 2px;
}

:deep(.el-tag .el-tag__close) {
  margin-left: 4px;
}

.filter-bar {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.category-select {
  width: 120px;
}

.divider {
  width: 1px;
  height: 16px;
  background-color: #dcdfe6;
  margin: 0 16px;
}

.stats {
  margin-left: auto;
  color: #909399;
  font-size: 13px;
}

/* 添加响应式布局支持 */
@media (max-width: 768px) {
  .filter-bar {
    flex-wrap: wrap;
    gap: 12px;
  }
  
  .divider {
    display: none;
  }
  
  .sort-buttons {
    width: 100%;
    justify-content: space-between;
  }
  
  .stats {
    width: 100%;
    margin-left: 0;
    text-align: right;
  }
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
