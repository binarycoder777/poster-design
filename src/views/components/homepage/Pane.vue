<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ElCalendar, ElCard, ElStatistic, ElProgress, ElTag, ElRadioGroup, ElRadioButton, ElSelect, ElOption, ElDatePicker } from 'element-plus'
import { Calendar, Search, TrendCharts, Present, Money, Wallet, Location, Check } from '@element-plus/icons-vue'
import InvitationList from './InvitationList.vue'
import EventCalendar from './EventCalendar.vue'
import VChart from 'vue-echarts'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { PieChart, LineChart, BarChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { TitleComponent, TooltipComponent, LegendComponent, GridComponent } from 'echarts/components'
import RecentSection from './RecentSection.vue'
import StatisticsCards from './StatisticsCards.vue'

// 注册必需的组件
use([
  CanvasRenderer,
  PieChart,
  LineChart, 
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  LabelLayout
])

const loading = ref(false)
const chartType = ref('balance')
const chartStyle = ref('pie')
const dateRange = ref([])
const selectedYear = ref(new Date().getFullYear())
const selectedMonth = ref(new Date().getMonth() + 1)
const selectedTimeRange = ref('week')

const years = computed(() => {
  const currentYear = new Date().getFullYear()
  return Array.from({length: 5}, (_, i) => currentYear - i)
})

const months = computed(() => {
  return Array.from({length: 12}, (_, i) => i + 1)
})

// 模拟按时间生成数据
const generateTimeData = (year: number, month: number) => {
  const data = []
  const daysInMonth = new Date(year, month, 0).getDate()
  
  for(let day = 1; day <= daysInMonth; day++) {
    data.push({
      date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      收礼: Math.floor(Math.random() * 2000) + 500,
      送礼: Math.floor(Math.random() * 1500) + 300,
      婚礼: Math.floor(Math.random() * 1000) + 200,
      满月酒: Math.floor(Math.random() * 800) + 100,
      乔迁: Math.floor(Math.random() * 600) + 100,
      生日: Math.floor(Math.random() * 400) + 100,
      其他: Math.floor(Math.random() * 300) + 50
    })
  }
  return data
}

// 获取图表配置
const getChartOption = (type: string, style: string) => {
  const monthData = generateTimeData(selectedYear.value, selectedMonth.value)
  
  const baseOption = {
    tooltip: {
      trigger: style === 'pie' ? 'item' : 'axis',
      formatter: style === 'pie' ? '{b}: {c} ({d}%)' : '{b}: {c}'
    },
    legend: {
      orient: 'horizontal',
      top: 'bottom'
    }
  }

  if (type === 'balance') {
    if (style === 'pie') {
      const totalReceived = monthData.reduce((sum, item) => sum + item.收礼, 0)
      const totalGiven = monthData.reduce((sum, item) => sum + item.送礼, 0)
      
      return {
        ...baseOption,
        series: [{
          name: '收支占比',
          type: 'pie',
          radius: ['50%', '70%'],
          data: [
            { value: totalReceived, name: '收礼' },
            { value: totalGiven, name: '送礼' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            show: true,
            formatter: '{b}: {c}'
          }
        }]
      }
    } else {
      return {
        ...baseOption,
        xAxis: {
          type: 'category',
          data: monthData.map(item => item.date)
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '收礼',
            type: style,
            data: monthData.map(item => item.收礼)
          },
          {
            name: '送礼',
            type: style,
            data: monthData.map(item => item.送礼)
          }
        ]
      }
    }
  } else {
    if (style === 'pie') {
      const totals = {
        婚礼: monthData.reduce((sum, item) => sum + item.婚礼, 0),
        满月酒: monthData.reduce((sum, item) => sum + item.满月酒, 0),
        乔迁: monthData.reduce((sum, item) => sum + item.乔迁, 0),
        生日: monthData.reduce((sum, item) => sum + item.生日, 0),
        其他: monthData.reduce((sum, item) => sum + item.其他, 0)
      }
      
      return {
        ...baseOption,
        series: [{
          name: '类型占比',
          type: 'pie',
          radius: ['50%', '70%'],
          data: Object.entries(totals).map(([name, value]) => ({ name, value })),
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          label: {
            show: true,
            formatter: '{b}: {c}'
          }
        }]
      }
    } else {
      return {
        ...baseOption,
        xAxis: {
          type: 'category',
          data: monthData.map(item => item.date)
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '婚礼',
            type: style,
            data: monthData.map(item => item.婚礼)
          },
          {
            name: '满月酒',
            type: style,
            data: monthData.map(item => item.满月酒)
          },
          {
            name: '乔迁',
            type: style,
            data: monthData.map(item => item.乔迁)
          },
          {
            name: '生日',
            type: style,
            data: monthData.map(item => item.生日)
          },
          {
            name: '其他',
            type: style,
            data: monthData.map(item => item.其他)
          }
        ]
      }
    }
  }
}

const balanceChartOption = computed(() => getChartOption('balance', chartStyle.value))
const categoryChartOption = computed(() => getChartOption('category', chartStyle.value))

// 统计数据
const statistics = ref({
  totalReceived: 25800,
  totalGiven: 19600,
  balance: 6200,
  recentEvents: 5
})

// 近期活动数据
const recentActivities = ref([
  {
    type: '待参加',
    name: '刘家婚宴',
    date: '2025-01-01',
    location: '金陵大酒店',
    eventType: '婚宴'
  },
  {
    type: '收礼',
    name: '李明的婚礼',
    amount: 1000,
    date: '2024-03-15', 
    status: '已确认',
    location: '金陵大酒店',
    eventType: '婚宴'
  },
  {
    type: '送礼', 
    name: '张华的满月酒',
    amount: 800,
    date: '2024-03-12',
    status: '待确认',
    location: '喜来登酒店',
    eventType: '满月酒'
  },
  {
    type: '收礼',
    name: '王家乔迁宴',
    amount: 500,
    date: '2024-03-10',
    status: '已确认',
    location: '幸福大酒店',
    eventType: '乔迁'
  },
  {
    type: '待参加',
    name: '张氏满月酒', 
    date: '2024-04-15',
    location: '喜来登酒店',
    eventType: '满月酒'
  }
])

const recentEvents = ref([
  { type: '待参加', name: '刘家婚宴', date: '2025-01-01', location: '金陵大酒店' }
])

// Before markedDates computed property
interface ActivityRecord {
  type: string
  name: string
  date: string
  location: string
  eventType?: string
  amount?: number
  status?: string
}

// Update the markedDates computed property
const markedDates = computed(() => {
  const dates: { [key: string]: ActivityRecord[] } = {}
  recentActivities.value.forEach(activity => {
    if (!dates[activity.date]) {
      dates[activity.date] = []
    }
    dates[activity.date].push(activity)
  })
  return dates
})

// 处理图表样式变更
const handleChartStyleChange = (value: string) => {
  loading.value = true
  chartStyle.value = value
  setTimeout(() => {
    loading.value = false
  }, 500)
}

// 检查日期是否有事件
const checkDateHasEvent = (date: string) => {
  return !!markedDates.value[date]
}

// 获取日期的事件
const getDateEvents = (date: string) => {
  return markedDates.value[date] || []
}

// 根据时间范围筛选活动的计算属性
const filteredActivities = computed(() => {
  const now = new Date()
  const activities = recentActivities.value
  
  return activities.filter(activity => {
    const activityDate = new Date(activity.date)
    const diffTime = now.getTime() - activityDate.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    
    switch (selectedTimeRange.value) {
      case 'week':
        return diffDays <= 7
      case 'month':
        return diffDays <= 30
      case 'year':
        return diffDays <= 365
      default:
        return true
    }
  })
})

const handleTimeRangeChange = (range: string) => {
  selectedTimeRange.value = range
}

onMounted(() => {
  // 初始化加载
  loading.value = true
  setTimeout(() => {
    loading.value = false
  }, 1000)
})
</script>

<template>
  <div class="pane">
    <div class="banner">
      <div class="banner-content">
        <div class="banner-bg">
          <div class="banner-header">
            <h1>千里送鹅毛、礼轻情意重</h1>
          </div>
        </div>
      </div>
    </div>

    <StatisticsCards :statistics="statistics" />

    <div class="main-content">
      <div class="chart-section">
        <div class="chart-controls">
          <div class="chart-control-group">
            <el-radio-group v-model="chartType" size="large">
              <el-radio-button label="balance">收支统计</el-radio-button>
              <el-radio-button label="category">类型统计</el-radio-button>
            </el-radio-group>
            
            <el-select v-model="chartStyle" size="large" class="chart-style-select" @change="handleChartStyleChange">
              <el-option label="饼状图" value="pie">
                饼状图
              </el-option>
              <el-option label="折线图" value="line">
                折线图
              </el-option>
              <el-option label="柱状图" value="bar">
                柱状图
              </el-option>
            </el-select>

              <el-select v-model="selectedYear" size="large" class="date-select">
                <el-option 
                  v-for="year in years" 
                  :key="year"
                  :label="year + '年'"
                  :value="year"
                />
              </el-select>
              <template v-if="chartStyle !== 'pie' && chartStyle !== 'bar'">

              <el-select v-model="selectedMonth" size="large" class="date-select">
                <el-option
                  v-for="month in months"
                  :key="month"
                  :label="month + '月'"
                  :value="month"
                />
              </el-select>
            </template>
          </div>
        </div>
        <div ref="chartRef" class="chart-container" v-loading="loading">
          <v-chart 
            class="chart" 
            :option="chartType === 'balance' ? balanceChartOption : categoryChartOption" 
            autoresize 
          />
        </div>
      </div>
      
      <div class="right-section">
        <div class="calendar-section">
          <div class="section-header">
            <h2 class="section-title">事件日历</h2>
          </div>
          <EventCalendar 
            :events="recentActivities"
            :marked-dates="markedDates"
            class="event-calendar"
          />
        </div>
      </div>
    </div>

    <RecentSection 
      :activities="filteredActivities"
      v-model:timeRange="selectedTimeRange"
      @update:timeRange="handleTimeRangeChange"
    />
  </div>
</template>

<style scoped>
.pane {
  min-height: 100vh;
  padding: 20px;
  background-color: #f5f7fa;
}

.banner {
  margin-bottom: 40px;
}

.recent-section {
  margin-top: 40px;
  margin-bottom: 40px;
}

.banner-content {
  max-width: 1300px;
  margin: 0 auto;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  overflow: hidden;
}

.banner-bg {
  padding: 40px;
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
}

.banner-bg::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('@/assets/backend.png');
  background-size: cover;
  background-position: center;
  opacity: 0.2;
}

.banner-header {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.banner-header h1 {
  color: white;
  font-size: 2.25rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
  margin: 0;
}

.main-content {
  display: flex;
  gap: 32px;
  max-width: 1300px;
  margin: 0 auto 48px;
}

.chart-section {
  flex: 3;
  background: white;
  padding: 24px;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}

.chart-controls {
  margin-bottom: 24px;
}

.chart-control-group {
  display: flex;
  gap: 16px;
  align-items: center;
}

.chart-style-select {
  width: 140px;
}

.date-select {
  width: 120px;
}

.chart-container {
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
}

.chart {
  height: 100%;
}

.right-section {
  flex: 2;
}

.calendar-section {
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  overflow: hidden;
  padding: 20px;
}

.event-calendar {
  height: 100%;
  min-height: 400px;
}

.calendar-cell {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.event-indicator {
  display: flex;
  gap: 4px;
  justify-content: center;
  margin-top: 4px;
}

.event-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.event-dot.待参加 {
  background-color: #e6a23c;
}

.event-dot.收礼 {
  background-color: #67c23a;
}

.event-dot.送礼 {
  background-color: #909399;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1300px;
  margin: 0 auto 24px;
}

.section-header h2 {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  color: #1a1a1a;
}

.activities-grid {
  max-width: 1300px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.activity-card {
  border-radius: 16px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  background: white;
}

.activity-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

.upcoming-card {
  border-left: 4px solid #e6a23c;
}

.receive-card {
  border-left: 4px solid #67c23a;
}

.send-card {
  border-left: 4px solid #909399;
}

.activity-grid-item {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.postcard-header {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.activity-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  background: white;
}

.activity-icon-wrapper.upcoming {
  color: #e6a23c;
}

.activity-icon-wrapper.receive {
  color: #67c23a;
}

.activity-icon-wrapper.send {
  color: #909399;
}

.postmark {
  flex: 1;
}

.date-location {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-top: 8px;
  color: #606266;
  font-size: 0.875rem;
}

.location {
  display: flex;
  align-items: center;
  gap: 4px;
}

.activity-title {
  margin-top: 8px;
}

.activity-title .name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1a1a1a;
}

.type-tag,
.status-tag {
  border-radius: 8px;
  padding: 4px 8px;
}

.activity-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
}

.activity-amount {
  font-size: 1.125rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 8px;
}

.activity-amount.income {
  color: #67c23a;
  background-color: #f0f9eb;
}

.activity-amount.expense {
  color: #f56c6c;
  background-color: #fef0f0;
}

.amount-prefix {
  margin-right: 2px;
}

.amount-value {
  font-family: 'Roboto Mono', monospace;
}
</style>