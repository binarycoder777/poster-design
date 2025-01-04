<script setup lang="ts">
import { ref } from 'vue'
import { ElInput, ElButton, ElCard, ElDialog, ElForm, ElFormItem, ElSelect, ElOption, ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Edit, Delete, Download } from '@element-plus/icons-vue'

interface Invitation {
  id: number
  title: string
  type: string
  date: string
  location: string
  status: string
}

const invitations = ref<Invitation[]>([
  {
    id: 1,
    title: '张三的婚礼请帖',
    type: '婚礼',
    date: '2024-05-01',
    location: '幸福大酒店',
    status: '已发布'
  },
  {
    id: 2,
    title: '李四的满月酒请帖',
    type: '满月酒',
    date: '2024-06-15', 
    location: '喜悦餐厅',
    status: '草稿'
  }
])

const dialogVisible = ref(false)

const handleCreate = () => {
  dialogVisible.value = true
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
</script>

<template>
  <div class="invitation-page">
    <div class="header">
      <h1>个人请帖管理</h1>
      <el-button type="primary" :icon="Plus" @click="handleCreate">
        创建新请帖
      </el-button>
    </div>

    <div class="content">
      <div class="invitation-grid">
        <el-card v-for="item in invitations" :key="item.id" class="invitation-card">
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
            <el-button :icon="Edit" link @click="handleEdit(item.id)">编辑</el-button>
            <el-button :icon="Download" link @click="handleDownload(item.id)">下载</el-button>
            <el-button :icon="Delete" link type="danger" @click="handleDelete(item.id)">删除</el-button>
          </div>
        </el-card>
      </div>
    </div>

    <el-dialog v-model="dialogVisible" title="创建新请帖" width="500px">
      <el-form label-width="100px">
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
  padding: 24px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.header h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 500;
}

.content {
  background: #fff;
  border-radius: 4px;
  padding: 24px;
}

.invitation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.invitation-card {
  transition: all 0.3s;
}

.invitation-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.card-header h3 {
  margin: 0;
  font-size: 18px;
}

.status-tag {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.published {
  background: #e1f3d8;
  color: #67c23a;
}

.draft {
  background: #f4f4f5;
  color: #909399;
}

.received {
  background: #fdf6ec;
  color: #e6a23c;
}

.card-content {
  margin-bottom: 16px;
}

.card-content p {
  margin: 8px 0;
  color: #606266;
}

.card-actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  border-top: 1px solid #ebeef5;
  padding-top: 16px;
}
</style>
