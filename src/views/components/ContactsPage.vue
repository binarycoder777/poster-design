<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { ElInput, ElButton, ElTable, ElTableColumn, ElDatePicker, ElTag, ElDialog, ElForm, ElFormItem, ElSelect, ElOption } from 'element-plus'
import { Search, Plus, Download, Refresh, Delete, Edit, Filter, Calendar, Share, View, Star } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import * as echarts from 'echarts'

interface Contact {
  id: number
  name: string
  relation: string
  amount: number
  date: string
  event: string
  remark: string
  type: 'given' | 'received'
  tags?: string[]
  avatar?: string
  isFavorite?: boolean
}

interface FilterForm {
  type: string
  relation: string
  minAmount: string
  maxAmount: string
  dateRange: [Date, Date] | undefined
  tags: string[]
}

interface ChartDataPoint {
  date: string
  amount: number
  event: string
  type: 'given' | 'received'
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
    remark: '新婚快乐',
    type: 'given'
  },
  {
    id: 2, 
    name: '李四',
    relation: '同事',
    amount: 200,
    date: '2024-02-15',
    event: '乔迁',
    remark: '乔迁之喜',
    type: 'given'
  }
])

const statistics = computed(() => {
  const givenTransactions = contacts.value.filter(c => c.type === 'given')
  const receivedTransactions = contacts.value.filter(c => c.type === 'received')
  
  return {
    totalGiven: givenTransactions.reduce((sum, c) => sum + c.amount, 0),
    totalReceived: receivedTransactions.reduce((sum, c) => sum + c.amount, 0),
    givenCount: givenTransactions.length,
    receivedCount: receivedTransactions.length
  }
})

const dateRange = ref<[Date, Date] | undefined>()

const handleSearch = () => {
  const filtered = contacts.value.filter(contact => {
    const matchesText = !searchText.value || 
      contact.name.includes(searchText.value) || 
      contact.event.includes(searchText.value)
    
    if (!dateRange.value) return matchesText
    
    const [start, end] = dateRange.value
    const date = new Date(contact.date)
    return matchesText && date >= start && date <= end
  })
  
  console.log('Filtered contacts:', filtered)
}

const handleAdd = () => {
  console.log('添加新记录')
}

const handleExport = () => {
  console.log('导出数据')
}

const tagOptions = ref([
  { label: '家人', color: '#67C23A' },
  { label: '朋友', color: '#409EFF' },
  { label: '同事', color: '#E6A23C' },
  { label: '其他', color: '#909399' }
])

const filterForm = ref<FilterForm>({
  type: '',
  relation: '',
  minAmount: '',
  maxAmount: '',
  dateRange: undefined,
  tags: []
})

const tableLoading = ref(false)

const handleRefresh = () => {
  tableLoading.value = true
  setTimeout(() => {
    tableLoading.value = false
  }, 800)
}

const showAddDialog = ref(false)
const selectedContacts = ref<Contact[]>([])
const activeTab = ref('all')

const chartData = ref({
  months: ['1月', '2月', '3月', '4月', '5月', '6月'],
  given: [1200, 1900, 800, 1500, 2200, 1800],
  received: [800, 1600, 900, 1300, 1800, 1500]
})

const handleBatchDelete = () => {
  if (!selectedContacts.value.length) {
    ElMessage.warning('请选择要删除的记录')
    return
  }
  // 实现删除逻辑
}

const handleBatchExport = () => {
  if (!selectedContacts.value.length) {
    ElMessage.warning('请选择要导出的记录')
    return
  }
  // 实现导出逻辑
}

const handleSelectionChange = (selection: Contact[]) => {
  selectedContacts.value = selection
}

const selectedPerson = ref('')
const selectedEventType = ref('')
const chartInstance = ref<echarts.ECharts | null>(null)

const initChart = () => {
  if (chartInstance.value) {
    chartInstance.value.dispose()
  }
  
  const chartDom = document.getElementById('historyChart')
  if (!chartDom) return
  
  chartInstance.value = echarts.init(chartDom)
  updateChart()
}

const updateChart = () => {
  if (!chartInstance.value) {
    initChart()
    return
  }
  
  const filteredData = contacts.value
    .filter(c => !selectedPerson.value || c.name === selectedPerson.value)
    .filter(c => !selectedEventType.value || c.type === selectedEventType.value)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const option = {
    tooltip: {
      trigger: 'item',
      formatter: function(params: any) {
        const data = filteredData[params.dataIndex]
        return `日期：${data.date}<br/>
                金额：¥${data.amount}<br/>
                事件：${data.event}`
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: filteredData.map(d => d.date),
      name: '日期',
      axisLabel: {
        rotate: 45
      }
    },
    yAxis: {
      type: 'value',
      name: '金额 (¥)'
    },
    series: [{
      data: filteredData.map(d => d.amount),
      type: 'line',
      smooth: true,
      itemStyle: {
        color: '#409EFF'
      },
      lineStyle: {
        width: 2
      },
      symbolSize: 8
    }]
  }

  chartInstance.value.setOption(option)
}

const handleResize = () => {
  if (chartInstance.value) {
    chartInstance.value.resize()
  }
}

onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  if (chartInstance.value) {
    chartInstance.value.dispose()
  }
})

watch([selectedPerson, selectedEventType, contacts], () => {
  updateChart()
}, { deep: true })

const getRelationTagType = (relation: string): 'success' | 'warning' | 'info' | 'primary' => {
  const types: Record<string, 'success' | 'warning' | 'info' | 'primary'> = {
    '家人': 'primary',
    '朋友': 'success',
    '同事': 'warning',
    '其他': 'info'
  }
  return types[relation] || 'info'
}

const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(100)

const handleSizeChange = (val: number) => {
  pageSize.value = val
}

const handleCurrentChange = (val: number) => {
  currentPage.value = val
}

const editingContact = ref<Contact | null>(null)

const handleEdit = (row: Contact) => {
  showAddDialog.value = true
  editingContact.value = row
}

const handleDelete = (row: Contact) => {
  // Implement delete logic
  console.log('Delete:', row)
}

// Add computed property for paginated data
const paginatedContacts = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return contacts.value.slice(start, end)
})

// Update total when contacts change
watch(contacts, () => {
  total.value = contacts.value.length
})
</script>

<template>
  <div class="contacts-page">
    <div class="page-header">
      <div class="header-left">
        <h1>人情来往记录</h1>
      </div>
    </div>

    <div class="content-section">
      <el-card class="content-card">
        <template #header>
          <div class="filter-header">
            <div class="title">
              <el-icon><Filter /></el-icon>
              <span>筛选条件</span>
            </div>
            <div class="filter-actions">
              <el-button link @click="handleReset">重置</el-button>
              <el-button link @click="handleRefresh">
                <el-icon><Refresh /></el-icon>
                <span>刷新</span>
              </el-button>
            </div>
          </div>
        </template>
        
        <div class="filter-content">
          <el-form :model="filterForm" inline class="filter-form">
            <el-form-item label="搜索">
              <el-input
                v-model="searchText"
                placeholder="搜索联系人或事件"
                :prefix-icon="Search"
                class="search-input"
                @keyup.enter="handleSearch"
              />
            </el-form-item>
            <el-form-item label="类型">
              <el-select v-model="filterForm.type" placeholder="选择类型" clearable>
                <el-option label="收礼" value="received" />
                <el-option label="随礼" value="given" />
              </el-select>
            </el-form-item>
            <el-form-item label="关系">
              <el-select v-model="filterForm.relation" placeholder="选择关系" clearable>
                <el-option 
                  v-for="tag in tagOptions" 
                  :key="tag.label" 
                  :label="tag.label" 
                  :value="tag.label" 
                />
              </el-select>
            </el-form-item>
            <el-form-item label="金额范围">
              <div class="amount-range">
                <el-input v-model="filterForm.minAmount" placeholder="最小金额" />
                <span class="separator">-</span>
                <el-input v-model="filterForm.maxAmount" placeholder="最大金额" />
              </div>
            </el-form-item>
            <el-form-item label="日期范围">
              <el-date-picker
                v-model="filterForm.dateRange"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="YYYY-MM-DD"
              />
            </el-form-item>
          </el-form>

          <div class="statistics-summary">
            <div class="stats-row">
              <div class="stat-group">
                <span class="label">总收支：</span>
                <div class="stat-item total">
                  <span class="value">¥{{ statistics.totalReceived - statistics.totalGiven }}</span>
                  <div class="detail">
                    <span>收入：¥{{ statistics.totalReceived }}</span>
                    <span class="separator">|</span>
                    <span>支出：¥{{ statistics.totalGiven }}</span>
                  </div>
                </div>
              </div>

              <div class="stat-group">
                <span class="label">收礼：</span>
                <div class="stat-item income">
                  <span class="value">¥{{ statistics.totalReceived }}</span>
                  <span class="count">({{ statistics.receivedCount || 0 }}笔)</span>
                </div>
              </div>

              <div class="stat-group">
                <span class="label">随礼：</span>
                <div class="stat-item expense">
                  <span class="value">¥{{ statistics.totalGiven }}</span>
                  <span class="count">({{ statistics.givenCount || 0 }}笔)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="divider"></div>

        <div class="table-content">
          <div class="table-toolbar">
            <div class="left">
              <el-button type="primary" :icon="Plus" @click="showAddDialog = true">
                新增记录
              </el-button>
              <el-button 
                type="danger" 
                :icon="Delete" 
                :disabled="!selectedContacts.length"
                @click="handleBatchDelete"
              >
                批量删除
              </el-button>
              <el-button
                type="primary"
                :icon="Download"
                :disabled="!selectedContacts.length"
                @click="handleBatchExport"
              >
                批量导出
              </el-button>
              <span class="selected-count" v-if="selectedContacts.length">
                已选择 {{ selectedContacts.length }} 项
              </span>
            </div>
          </div>

          <el-table 
            v-loading="tableLoading"
            :data="paginatedContacts" 
            style="width: 100%" 
            border
            stripe
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column type="index" width="50" label="序号" />
            <el-table-column prop="name" label="姓名" width="120">
              <template #default="scope">
                <div class="contact-name">
                  <el-avatar :size="32" :src="scope.row.avatar">
                    {{ scope.row.name.charAt(0) }}
                  </el-avatar>
                  <span>{{ scope.row.name }}</span>
                  <el-icon 
                    v-if="scope.row.isFavorite"
                    class="favorite-icon"
                    :class="{ active: scope.row.isFavorite }"
                  >
                    <Star />
                  </el-icon>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="relation" label="关系" width="120">
              <template #default="scope">
                <el-tag 
                  :type="getRelationTagType(scope.row.relation)"
                  size="small"
                >
                  {{ scope.row.relation }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="amount" label="金额" width="120">
              <template #default="scope">
                <span :class="{ 
                  'amount-text': true,
                  'income': scope.row.type === 'received',
                  'expense': scope.row.type === 'given'
                }">
                  {{ scope.row.type === 'received' ? '+' : '-' }}
                  ¥{{ scope.row.amount }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="日期" width="120" />
            <el-table-column prop="event" label="事件" width="120" />
            <el-table-column prop="remark" label="备注" show-overflow-tooltip />
            <el-table-column label="操作" width="150" fixed="right">
              <template #default="scope">
                <el-button link type="primary" :icon="Edit" @click="handleEdit(scope.row)">
                  编辑
                </el-button>
                <el-button link type="danger" :icon="Delete" @click="handleDelete(scope.row)">
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          
          <div class="table-footer">
            <div class="pagination-info">
              共 {{ total }} 条记录，当前显示第 {{ (currentPage - 1) * pageSize + 1 }}-{{ Math.min(currentPage * pageSize, total) }} 条
            </div>
            <el-pagination
              v-model:current-page="currentPage"
              v-model:page-size="pageSize"
              :page-sizes="[10, 20, 50, 100]"
              :total="total"
              background
              layout="sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </el-card>

      <!-- 历史图表卡片 -->
      <el-card class="chart-card">
        <template #header>
          <div class="chart-header">
            <div class="title">
              <el-icon><Calendar /></el-icon>
              <span>历史往来记录</span>
            </div>
            <div class="chart-controls">
              <el-form inline>
                <el-form-item label="选择联系人">
                  <el-select v-model="selectedPerson" placeholder="请选择联系人" clearable>
                    <el-option
                      v-for="contact in [...new Set(contacts.map(c => c.name))]"
                      :key="contact"
                      :label="contact"
                      :value="contact"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item label="类型">
                  <el-select v-model="selectedEventType" placeholder="请选择类型" clearable>
                    <el-option label="收礼" value="received" />
                    <el-option label="随礼" value="given" />
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </template>
        <div id="historyChart" class="history-chart"></div>
      </el-card>
    </div>

    <!-- 新增/编辑对话框 -->
    <el-dialog
      v-model="showAddDialog"
      :title="editingContact ? '编辑记录' : '新增记录'"
      width="500px"
    >
      <!-- 对话框内容 -->
    </el-dialog>
  </div>
</template>

<style scoped>
.contacts-page {
  padding: 24px;
  background-color: var(--el-bg-color-page);
  min-height: 100vh;
}

.page-header {
  margin-bottom: 24px;
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.header-left h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 500;
  color: var(--el-text-color-primary);
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.search-input {
  width: 300px;
}

.content-section {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.content-card {
  background: var(--el-bg-color);
  border-radius: 8px;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.filter-header .title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 500;
}

.filter-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-content {
  margin-bottom: 16px;
}

:deep(.el-select) {
  width: 160px;
}

.amount-range {
  display: flex;
  align-items: center;
  gap: 8px;
}

.amount-range .el-input {
  width: 120px;
}

.statistics-summary {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--el-border-color-lighter);
}

.stats-row {
  display: flex;
  gap: 48px;
  align-items: center;
}

.stat-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-group .label {
  color: var(--el-text-color-secondary);
  font-size: 14px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-item .value {
  font-size: 16px;
  font-weight: 500;
}

.stat-item.total .value {
  color: var(--el-color-primary);
  font-size: 18px;
}

.stat-item.expense .value {
  color: var(--el-color-danger);
}

.stat-item.income .value {
  color: var(--el-color-success);
}

.divider {
  height: 1px;
  background-color: var(--el-border-color-lighter);
  margin: 16px 0;
}

.table-toolbar {
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-toolbar .left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.selected-count {
  color: var(--el-text-color-secondary);
  font-size: 14px;
}

.contact-name {
  display: flex;
  align-items: center;
  gap: 8px;
}

.favorite-icon {
  color: var(--el-color-warning);
  font-size: 16px;
}

.amount-text {
  font-weight: 500;
}

.amount-text.income {
  color: var(--el-color-success);
}

.amount-text.expense {
  color: var(--el-color-danger);
}

.table-footer {
  margin-top: 16px;
  padding: 16px 24px;
  border-top: 1px solid var(--el-border-color-lighter);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.table-footer .pagination-info {
  color: var(--el-text-color-secondary);
  font-size: 14px;
}

:deep(.el-pagination) {
  display: flex;
  align-items: center;
}

:deep(.el-pagination .el-select .el-input) {
  width: 120px;
}

:deep(.el-pagination .el-input__wrapper) {
  padding: 0 8px;
  height: 32px;
  line-height: 32px;
}

:deep(.el-pagination .el-pagination__jump) {
  margin-left: 16px;
}

:deep(.el-pagination .el-pager li) {
  background: transparent;
  min-width: 32px;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  margin: 0 4px;
}

:deep(.el-pagination .el-pager li.active) {
  background-color: var(--el-color-primary);
  color: white;
}

:deep(.el-pagination button) {
  min-width: 32px;
  height: 32px;
  border-radius: 4px;
}

.chart-card {
  margin-top: 24px;
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-header .title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 500;
}

.history-chart {
  width: 100%;
  height: 400px;
  margin-top: 16px;
}
</style>
