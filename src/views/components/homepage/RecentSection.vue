<script setup lang="ts">
import { ref } from 'vue'

interface Activity {
  type: string
  name: string
  date: string
  location: string
  eventType?: string
  amount?: number
  status?: string
}

const props = defineProps<{
  activities: Activity[]
}>()

const timeRange = ref('week') // 默认显示近一周

const timeRangeOptions = [
  { label: '近一周', value: 'week' },
  { label: '近一月', value: 'month' },
  { label: '近一年', value: 'year' }
]

// 可以添加 emit 来通知父组件时间范围变化
const emit = defineEmits<{
  (e: 'update:timeRange', value: string): void
}>()

const handleTimeRangeChange = (value: string) => {
  timeRange.value = value
  emit('update:timeRange', value)
}
</script>

<template>
  <div class="recent-section">
    <div class="section-header">
      <h2 class="section-title">近期随礼</h2>
      <div class="time-range-selector">
        <el-radio-group 
          v-model="timeRange" 
          size="small"
          @change="handleTimeRangeChange"
        >
          <el-radio-button 
            v-for="option in timeRangeOptions"
            :key="option.value"
            :label="option.value"
          >
            {{ option.label }}
          </el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="activities-grid">
      <el-card v-for="activity in activities" 
        :key="activity.name" 
        class="activity-card"
        :class="[
          activity.type === '待参加' ? 'upcoming-card' : '',
          activity.type === '收礼' ? 'receive-card' : '',
          activity.type === '送礼' ? 'send-card' : ''
        ]"
        shadow="hover"
      >
        <div class="activity-grid-item">
          <div class="activity-header">
            <div class="activity-icon-wrapper" :class="activity.type === '待参加' ? 'upcoming' : (activity.type === '收礼' ? 'receive' : 'send')">
              <el-icon class="activity-icon" :size="20">
                <Calendar v-if="activity.type === '待参加'" />
                <Present v-else-if="activity.type === '收礼'" />
                <Wallet v-else />
              </el-icon>
            </div>
            <div class="activity-info">
              <div class="activity-title">
                <span class="name">{{ activity.name }}</span>
                <el-tag 
                  :type="activity.type === '待参加' ? 'warning' : (activity.type === '收礼' ? 'success' : 'info')" 
                  size="small"
                  effect="light"
                  class="type-tag"
                >{{ activity.type === '待参加' ? activity.eventType : activity.type }}</el-tag>
              </div>
              <div class="activity-meta">
                <span class="date">{{ activity.date }}</span>
                <span class="location-dot">·</span>
                <span class="location">{{ activity.location }}</span>
              </div>
            </div>
          </div>
          
          <div class="activity-footer">
            <el-tag 
              v-if="activity.status"
              :type="activity.status === '已确认' ? 'success' : 'warning'" 
              size="small"
              effect="light"
              class="status-tag"
            >{{ activity.status }}</el-tag>
            
            <div 
              v-if="activity.amount"
              class="activity-amount"
              :class="[activity.type === '收礼' ? 'income' : 'expense']"
            >
              <span class="amount-prefix">{{ activity.type === '收礼' ? '+' : '-' }}</span>
              <span class="amount-value">¥{{ activity.amount }}</span>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.recent-section {
  max-width: 1300px;
  margin: 48px auto;
  padding: 0 24px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1300px;
  margin: 0 auto 24px;
  padding: 0 24px;
}

.section-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0;
  color: #1a1a1a;
}

.time-range-selector :deep(.el-radio-button__inner) {
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 14px;
}

.time-range-selector :deep(.el-radio-button:first-child .el-radio-button__inner) {
  border-radius: 8px 0 0 8px;
}

.time-range-selector :deep(.el-radio-button:last-child .el-radio-button__inner) {
  border-radius: 0 8px 8px 0;
}

.activities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 24px;
}

.activity-card {
  border-radius: 12px;
  transition: all 0.3s ease;
  border: 1px solid #ebeef5;
  background: white;
}

.activity-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.06);
}

.activity-grid-item {
  padding: 4px;
}

.activity-header {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f2f5;
}

.activity-icon-wrapper {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.activity-icon-wrapper.upcoming {
  background: #fdf6ec;
  color: #e6a23c;
}

.activity-icon-wrapper.receive {
  background: #f0f9eb;
  color: #67c23a;
}

.activity-icon-wrapper.send {
  background: #f4f4f5;
  color: #909399;
}

.activity-info {
  flex: 1;
}

.activity-title {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.name {
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
}

.activity-meta {
  display: flex;
  align-items: center;
  color: #909399;
  font-size: 14px;
}

.location-dot {
  margin: 0 8px;
}

.type-tag,
.status-tag {
  border-radius: 4px;
  padding: 0 8px;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
}

.activity-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
}

.activity-amount {
  font-size: 16px;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 6px;
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
  font-family: system-ui;
}

.amount-value {
  font-family: 'Roboto Mono', monospace;
}
</style>