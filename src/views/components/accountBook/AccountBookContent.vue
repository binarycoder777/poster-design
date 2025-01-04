<script lang="ts" setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import { ElInput, ElTable, ElTableColumn, ElDialog, ElForm, ElFormItem, ElButton, ElAvatar, ElTag, ElPagination, ElDivider } from 'element-plus'
import SaveAccountBookItem from './SaveAccountBookItem.vue'


interface User {
  date: string
  name: string
  relation: string
  amount: number
  remark: string
}

const tableData: User[] = [
  {
    date: '2016-05-04',
    name: 'Aleyna Kutzner',
    relation: '朋友',
    amount: 150.0,
    remark: 'Lohrbergstr. 86c, Süd Lilli, Saarland',
  },
  {
    date: '2016-05-03',
    name: 'Helen Jacobi',
    relation: '同事',
    amount: 200.0,
    remark: '760 A Street, South Frankfield, Illinois',
  },
  {
    date: '2016-05-02',
    name: 'Brandon Deckert',
    relation: '亲戚',
    amount: 300.0,
    remark: 'Arnold-Ohletz-Str. 41a, Alt Malinascheid, Thüringen',
  },
  {
    date: '2016-05-01',
    name: 'Margie Smith',
    relation: '朋友',
    amount: 100.0,
    remark: '23618 Windsor Drive, West Ricardoview, Idaho',
  },
  {
    date: '2016-05-03',
    name: 'Helen Jacobi',
    relation: '同事',
    amount: 200.0,
    remark: '760 A Street, South Frankfield, Illinois',
  },
  {
    date: '2016-05-02',
    name: 'Brandon Deckert',
    relation: '亲戚',
    amount: 300.0,
    remark: 'Arnold-Ohletz-Str. 41a, Alt Malinascheid, Thüringen',
  },
  {
    date: '2016-05-01',
    name: 'Margie Smith',
    relation: '朋友',
    amount: 100.0,
    remark: '23618 Windsor Drive, West Ricardoview, Idaho',
  },
  {
    date: '2016-05-03',
    name: 'Helen Jacobi',
    relation: '同事',
    amount: 200.0,
    remark: '760 A Street, South Frankfield, Illinois',
  },
  {
    date: '2016-05-02',
    name: 'Brandon Deckert',
    relation: '亲戚',
    amount: 300.0,
    remark: 'Arnold-Ohletz-Str. 41a, Alt Malinascheid, Thüringen',
  },
  {
    date: '2016-05-01',
    name: 'Margie Smith',
    relation: '朋友',
    amount: 100.0,
    remark: '23618 Windsor Drive, West Ricardoview, Idaho',
  },
]

const filtersRelation = [
  {
    text: '同事',
    value: '同事',
  },
  {
    text: '朋友',
    value: '朋友',
  },
  {
    text: '亲戚',
    value: '亲戚',
  },
]

// 排序
const search = ref('')

const pageQuery = () => {}

// 将这些变量移到顶层作用域
const dialogVisible = ref(false)
const editForm = reactive({
  name: '',
  relation: '',
  date: '',
  amount: 0,
  remark: ''
})

// 简化 handleEdit 函数
const handleEdit = (row: User) => {
  dialogVisible.value = true
  editForm.name = row.name
  editForm.relation = row.relation 
  editForm.date = row.date
  editForm.amount = row.amount
  editForm.remark = row.remark
}

const onSubmit = () => {
  console.log('submit:', editForm)
  dialogVisible.value = false
}

// 删除
const handleDelete = (row: User) => {
  console.log(row)
}

// 添加重置表单的函数
const resetForm = () => {
  editForm.name = ''
  editForm.relation = ''
  editForm.date = ''
  editForm.amount = 0
  editForm.remark = ''
}

// 添加新增函数
const handleAdd = () => {
  resetForm()
  dialogVisible.value = true
}

// Add these utility functions
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}

const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString()
}

const formatAmount = (amount: number) => {
  return `¥ ${amount.toFixed(2)}`
}

const getRelationTagType = (relation: string) => {
  const types: Record<string, 'success' | 'warning' | 'info'> = {
    '同事': 'info',
    '朋友': 'success',
    '亲戚': 'warning'
  }
  return types[relation] || 'info'
}

// Add near the top with other refs
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

const handleSizeChange = (val: number) => {
  pageSize.value = val
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
}
</script>



<template>
  <div class="table-wrapper">
    <el-table
      :data="tableData"
      style="width: 100%"
      :max-height="'100%'"
    >
      <el-table-column
        prop="date"
        label="日期"
        min-width="120"
        sortable="custom"
        :sort-change="pageQuery"
      >
        <template #default="{ row }">
          <div class="date-cell">
            <span class="date">{{ formatDate(row.date) }}</span>
            <span class="time">{{ formatTime(row.date) }}</span>
          </div>
        </template>
      </el-table-column>
      
      <el-table-column
        prop="name"
        label="姓名"
        min-width="120"
        sortable="custom"
        :sort-change="pageQuery"
      >
        <template #default="{ row }">
          <div class="name-cell">
            <el-avatar :size="28" :src="row.avatar">{{ row.name.charAt(0) }}</el-avatar>
            <span>{{ row.name }}</span>
          </div>
        </template>
      </el-table-column>
      
      <el-table-column
        prop="relation"
        label="关系"
        min-width="100"
        :filters="filtersRelation"
        :filter-method="pageQuery"
      >
        <template #default="{ row }">
          <el-tag :type="getRelationTagType(row.relation)" size="small">
            {{ row.relation }}
          </el-tag>
        </template>
      </el-table-column>
      
      <el-table-column
        prop="amount"
        label="金额"
        min-width="120"
        sortable="custom"
        :sort-change="pageQuery"
      >
        <template #default="{ row }">
          <span :class="['amount', row.amount >= 0 ? 'positive' : 'negative']">
            {{ formatAmount(row.amount) }}
          </span>
        </template>
      </el-table-column>
      
      <el-table-column
        prop="remark"
        label="备注"
        min-width="200"
        show-overflow-tooltip
      />
      
      <el-table-column
        label="操作"
        width="160"
        fixed="right"
      >
        <template #default="{ row }">
          <div class="operation-btns">
            <el-button
              type="primary"
              link
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
            <el-divider direction="vertical" />
            <el-button
              type="danger"
              link
              @click="handleDelete(row)"
            >
              删除
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-wrapper">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 50, 100]"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>

  <el-dialog v-model="dialogVisible" :title="editForm.name ? '编辑' : '新增'" width="30%">
    <SaveAccountBookItem :form="editForm" @submit="onSubmit" />
  </el-dialog>
</template>

<style scoped>
.table-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}

:deep(.el-table) {
  flex: 1;
  
  /* 表格样式优化 */
  .el-table__header-wrapper th {
    background-color: #fafafa;
    font-weight: 500;
    color: #1f2329;
    height: 48px;
  }
  
  .el-table__row {
    cursor: pointer;
    &:hover {
      background-color: #f5f7fa;
    }
  }
}

/* 单元格样式 */
.date-cell {
  display: flex;
  flex-direction: column;
  
  .date {
    color: #1f2329;
    font-weight: 500;
  }
  
  .time {
    color: #86909c;
    font-size: 12px;
  }
}

.name-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.amount {
  font-family: 'Roboto Mono', monospace;
  font-weight: 500;
  
  &.positive {
    color: #52c41a;
  }
  
  &.negative {
    color: #ff4d4f;
  }
}

.operation-btns {
  display: flex;
  align-items: center;
  opacity: 0;
  transition: opacity 0.2s;
  
  :deep(.el-button) {
    padding: 4px 0;
  }
}

:deep(.el-table__row:hover) .operation-btns {
  opacity: 1;
}

.pagination-wrapper {
  padding: 16px 24px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: flex-end;
}
</style>