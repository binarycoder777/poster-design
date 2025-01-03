<script setup lang="ts">
import { ref } from 'vue'
import { ElInput, ElButton, ElTable, ElTableColumn, ElDatePicker } from 'element-plus'
import { Search, Plus, Download } from '@element-plus/icons-vue'

interface Contact {
  id: number
  name: string
  relation: string
  amount: number
  date: string
  event: string
  remark: string
}

const searchText = ref('')
const contacts = ref<Contact[]>([
  {
    id: 1,
    name: '张三',
    relation: '朋友',
    amount: 500,
    date: '2024-01-20',
    event: '结婚',
    remark: '新婚快乐'
  },
  {
    id: 2, 
    name: '李四',
    relation: '同事',
    amount: 200,
    date: '2024-02-15',
    event: '乔迁',
    remark: '乔迁之喜'
  }
])

const handleSearch = () => {
  console.log('搜索:', searchText.value)
}

const handleAdd = () => {
  console.log('添加新记录')
}

const handleExport = () => {
  console.log('导出数据')
}
</script>

<template>
  <div class="contacts-page">
    <div class="header">
      <h1>人情来往记录</h1>
      <div class="actions">
        <el-input
          v-model="searchText"
          placeholder="搜索联系人或事件"
          :prefix-icon="Search"
          style="width: 300px"
          @keyup.enter="handleSearch"
        />
        <el-button type="primary" :icon="Plus" @click="handleAdd">
          新增记录
        </el-button>
        <el-button type="success" :icon="Download" @click="handleExport">
          导出数据
        </el-button>
      </div>
    </div>

    <div class="content">
      <el-table :data="contacts" style="width: 100%" border>
        <el-table-column prop="name" label="姓名" width="120" />
        <el-table-column prop="relation" label="关系" width="120" />
        <el-table-column prop="amount" label="金额" width="120">
          <template #default="scope">
            ¥{{ scope.row.amount }}
          </template>
        </el-table-column>
        <el-table-column prop="date" label="日期" width="180" />
        <el-table-column prop="event" label="事件" width="120" />
        <el-table-column prop="remark" label="备注" />
        <el-table-column label="操作" width="180">
          <template #default>
            <el-button link type="primary">编辑</el-button>
            <el-button link type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped>
.contacts-page {
  padding: 24px;
}

.header {
  margin-bottom: 24px;
}

.header h1 {
  margin-bottom: 16px;
  font-size: 24px;
  font-weight: 500;
}

.actions {
  display: flex;
  gap: 16px;
  align-items: center;
}

.content {
  background: #fff;
  border-radius: 4px;
  padding: 24px;
}
</style>
