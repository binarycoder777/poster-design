<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElInput, ElButton, ElCard, ElDialog, ElForm, ElFormItem, ElSelect, ElOption, ElMessage, ElMessageBox, ElDatePicker, ElPagination } from 'element-plus'
import { Plus, Edit, Delete, Download, Search } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'

interface Invitation {
  id: number
  title: string
  type: string
  date: string
  location: string
  status: string
  guestCount?: number
  theme?: string
  coverImage?: string
  createTime: string
}

const invitations = ref<Invitation[]>([
  {
    id: 1,
    title: '张三的婚礼请帖',
    type: '婚礼',
    date: '2024-05-01',
    location: '幸福大酒店',
    status: '已发布',
    guestCount: 100,
    theme: '简约现代',
    coverImage: '/covers/wedding.jpg',
    createTime: '2024-03-15'
  },
  {
    id: 2,
    title: '李四的满月酒请帖',
    type: '满月酒',
    date: '2024-06-15', 
    location: '喜悦餐厅',
    status: '草稿',
    createTime: '2024-03-20'
  },
  {
    id: 3,
    title: '王五的乔迁请帖',
    type: '乔迁',
    date: '2024-04-30',
    location: '阳光小区',
    status: '已收到',
    createTime: '2024-03-18'
  }
])

const dialogVisible = ref(false)

const searchQuery = ref('')
const filterType = ref('')
const filterStatus = ref('')
const sortBy = ref('createTime')

const formData = ref({
  title: '',
  type: '',
  date: '',
  location: '',
  theme: '',
  guestCount: '',
  description: '',
  coverImage: ''
})

const router = useRouter()

const handleCreate = () => {
  router.push('/home')
}

const handleEdit = (id: number) => {
  console.log('编辑请帖:', id)
}

const handleDelete = (id: number) => {
  console.log('删除请帖:', id)
}

const handleDownload = (id: number) => {
  console.log('下载请帖:', id)
}

const handlePreview = (id: number) => {
  // 实现预览逻辑
}

const dateRange = ref<[Date, Date] | null>(null)

const filteredInvitations = computed(() => {
  return invitations.value.filter(item => {
    const matchQuery = item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchType = !filterType.value || item.type === filterType.value
    const matchStatus = !filterStatus.value || item.status === filterStatus.value
    const matchDate = !dateRange.value || 
      (new Date(item.date) >= dateRange.value[0] && new Date(item.date) <= dateRange.value[1])
    return matchQuery && matchType && matchStatus && matchDate
  })
})
</script>

<template>
  <div class="invitation-page">
    <div class="fixed-header">
    <div class="header">
      <h1>个人请帖管理</h1>
      <el-button type="primary" :icon="Plus" @click="handleCreate">
        创建新请帖
      </el-button>
    </div>

    <div class="filters">
      <el-input
        v-model="searchQuery"
        placeholder="搜索请帖"
        :prefix-icon="Search"
        class="search-input"
      />
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :shortcuts="[
          {
            text: '最近一周',
            value: (() => {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              return [start, end]
            })()
          },
          {
            text: '最近一个月',
            value: (() => {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              return [start, end]
            })()
          },
          {
            text: '最近三个月',
            value: (() => {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              return [start, end]
            })()
          }
        ]"
      />
      <el-select v-model="filterType" placeholder="类型筛选" clearable>
        <el-option label="婚礼" value="婚礼" />
        <el-option label="满月酒" value="满月酒" />
        <el-option label="周岁" value="周岁" />
        <el-option label="乔迁" value="乔迁" />
      </el-select>
      <el-select v-model="filterStatus" placeholder="状态筛选" clearable>
        <el-option label="草稿" value="草稿" />
        <el-option label="已发布" value="已发布" />
        <el-option label="已收到" value="已收到" />
        <el-option label="已结束" value="已结束" />
      </el-select>
    </div>

    <div class="statistics">
      <el-card class="stat-card">
        <h4>总请帖数</h4>
        <div class="stat-number">{{ invitations.length }}</div>
      </el-card>
      <el-card class="stat-card">
        <h4>已发布</h4>
        <div class="stat-number">{{ invitations.filter(i => i.status === '已发布').length }}</div>
      </el-card>
      <el-card class="stat-card">
        <h4>已收到</h4>
        <div class="stat-number">{{ invitations.filter(i => i.status === '已收到').length }}</div>
      </el-card>
      <el-card class="stat-card">
        <h4>草稿箱</h4>
        <div class="stat-number">{{ invitations.filter(i => i.status === '草稿').length }}</div>
      </el-card>
      </div>
    </div>

    <div class="content">
      <div class="invitation-grid">
        <el-card v-for="item in filteredInvitations" :key="item.id" class="invitation-card">
          <div class="card-cover" v-if="item.coverImage">
            <img :src="item.coverImage" :alt="item.title">
          </div>
          <div class="card-header">
            <h3>{{ item.title }}</h3>
            <span :class="['status-tag', item.status === '已发布' ? 'published' : 'draft']">
              {{ item.status }}
            </span>
          </div>
          <div class="card-content">
            <p><strong>类型:</strong> {{ item.type }}</p>
            <p><strong>日期:</strong> {{ item.date }}</p>
            <p><strong>地点:</strong> {{ item.location }}</p>
          </div>
          <div class="card-actions">
            <el-button 
              :icon="Edit" 
              link 
              @click="handleEdit(item.id)"
              v-if="item.status !== '已收到'"
            >
              编辑
            </el-button>
            <el-button link @click="handlePreview(item.id)">预览</el-button>
            <el-button :icon="Download" link @click="handleDownload(item.id)">下载</el-button>
            <el-button 
              :icon="Delete" 
              link 
              type="danger" 
              @click="handleDelete(item.id)"
              v-if="item.status !== '已收到'"
            >
              删除
            </el-button>
          </div>
        </el-card>
      </div>
    </div>

    <el-dialog v-model="dialogVisible" title="创建新请帖" width="600px">
      <el-form :model="formData" label-width="100px">
        <el-form-item label="请帖标题">
          <el-input placeholder="请输入请帖标题" />
        </el-form-item>
        <el-form-item label="请帖类型">
          <el-select placeholder="请选择请帖类型">
            <el-option label="婚礼" value="wedding" />
            <el-option label="满月酒" value="fullmoon" />
            <el-option label="周岁" value="birthday" />
            <el-option label="乔迁" value="housewarming" />
          </el-select>
        </el-form-item>
        <el-form-item label="活动日期">
          <el-date-picker v-model="formData.date" type="datetime" placeholder="选择日期和时间" />
        </el-form-item>
        <el-form-item label="活动地点">
          <el-input v-model="formData.location" placeholder="请输入活动地点" />
        </el-form-item>
        <el-form-item label="主题风格">
          <el-select v-model="formData.theme" placeholder="请选择主题风格">
            <el-option label="简约现代" value="modern" />
            <el-option label="中国传统" value="traditional" />
            <el-option label="浪漫唯美" value="romantic" />
            <el-option label="童趣可爱" value="cute" />
          </el-select>
        </el-form-item>
        <el-form-item label="预计宾客数">
          <el-input-number v-model="formData.guestCount" :min="1" />
        </el-form-item>
        <el-form-item label="请帖封面">
          <el-upload
            action="/api/upload"
            :show-file-list="false"
            accept="image/*"
          >
            <el-button type="primary">上传封面图片</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.invitation-page {
  padding: 40px;
  background-color: #fafafa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.fixed-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #fafafa;
  padding-bottom: 24px;
}

.content {
  flex: 1;
  overflow-y: auto;
  padding: 24px 0;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 24px;
  font-weight: 500;
  color: #111827;
  letter-spacing: -0.025em;
}

/* 现代化的统计卡片 */
.statistics {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 40px;
}

.stat-card {
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.05);
}

.stat-card h4 {
  color: #6b7280;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 8px;
}

.stat-number {
  font-size: 28px;
  font-weight: 600;
  color: #111827;
  line-height: 1.2;
}

/* 现代化的筛选区 */
.filters {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
  align-items: center;
  background: transparent;
  padding: 0;
  box-shadow: none;
}

.search-input {
  width: 360px;
}

/* 日期选择器宽度 */
:deep(.el-date-editor.el-input__wrapper) {
  width: 360px !important;
}

/* 类型和状态选择器宽度 */
:deep(.el-select) {
  width: 120px !important;
}

:deep(.el-input__wrapper) {
  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

:deep(.el-select .el-input__wrapper) {
  background-color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important;
  border-radius: 8px;
}

/* 现代化的卡片网格 */
.invitation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
  min-height: 100%;
}

.invitation-card {
  background: white;
  border-radius: 16px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.2s ease;
}

.invitation-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px -10px rgba(0, 0, 0, 0.1);
}

.card-cover {
  height: 200px;
  overflow: hidden;
}

.card-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.invitation-card:hover .card-cover img {
  transform: scale(1.05);
}

.card-header {
  padding: 20px 20px 0;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.card-header h3 {
  font-size: 16px;
  font-weight: 500;
  color: #111827;
  margin: 0;
}

.status-tag {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.published {
  background: #ecfdf5;
  color: #059669;
  border: none;
}

.draft {
  background: #f3f4f6;
  color: #6b7280;
  border: none;
}

.received {
  background: #fff7ed;
  color: #c2410c;
  border: none;
}

.card-content {
  padding: 16px 20px;
}

.card-content p {
  margin: 8px 0;
  color: #6b7280;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.card-actions {
  padding: 16px 20px;
  border-top: 1px solid #f3f4f6;
  display: flex;
  gap: 16px;
}

:deep(.el-button--primary) {
  background: #3b82f6;
  border-color: #3b82f6;
  border-radius: 8px;
  font-weight: 500;
}

:deep(.el-dialog) {
  border-radius: 16px;
  overflow: hidden;
}

:deep(.el-dialog__header) {
  margin: 0;
  padding: 20px 24px;
  border-bottom: 1px solid #f3f4f6;
}

:deep(.el-dialog__body) {
  padding: 24px;
}

:deep(.el-dialog__footer) {
  padding: 20px 24px;
  border-top: 1px solid #f3f4f6;
}

/* 确保筛选器在移动端响应式排列 */
@media (max-width: 768px) {
  .filters {
    flex-direction: column;
  }
  
  .filters > * {
    width: 100% !important;
  }
  
  .search-input {
    width: 100%;
  }
}
</style>
