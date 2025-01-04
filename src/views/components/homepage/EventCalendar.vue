<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PropType } from 'vue'

interface Event {
  type: string
  name: string
  date: string
  location: string
  eventType?: string
  amount?: number
  status?: string
}

const props = defineProps({
  events: {
    type: Array as PropType<Event[]>,
    required: true
  },
  markedDates: {
    type: Object as PropType<Record<string, Event[]>>,
    required: true
  }
})

const currentDate = ref(new Date())

// 计算当前月份的天数
const daysInMonth = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  return new Date(year, month + 1, 0).getDate()
})

// 计算当月第一天是星期几
const firstDayOfMonth = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  return new Date(year, month, 1).getDay()
})

// 生成日历网格数据
const calendarDays = computed(() => {
  const days = []
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  
  // 添加上个月的剩余天数
  const prevMonthDays = firstDayOfMonth.value
  const prevMonth = month === 0 ? 11 : month - 1
  const prevMonthYear = month === 0 ? year - 1 : year
  const daysInPrevMonth = new Date(prevMonthYear, prevMonth + 1, 0).getDate()
  
  for (let i = prevMonthDays - 1; i >= 0; i--) {
    days.push({
      date: new Date(prevMonthYear, prevMonth, daysInPrevMonth - i),
      type: 'prev'
    })
  }
  
  // 添加当前月的天数
  for (let i = 1; i <= daysInMonth.value; i++) {
    days.push({
      date: new Date(year, month, i),
      type: 'current'
    })
  }
  
  // 添加下个月的天数以填充剩余空格
  const remainingDays = 42 - days.length // 6行7列
  const nextMonth = month === 11 ? 0 : month + 1
  const nextMonthYear = month === 11 ? year + 1 : year
  
  for (let i = 1; i <= remainingDays; i++) {
    days.push({
      date: new Date(nextMonthYear, nextMonth, i),
      type: 'next'
    })
  }
  
  return days
})

const getDateString = (date: Date) => {
  return date.toISOString().split('T')[0]
}

const hasEvents = (date: Date) => {
  const dateString = getDateString(date)
  return props.markedDates[dateString]?.length > 0
}

const previousMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() - 1,
    1
  )
}

const nextMonth = () => {
  currentDate.value = new Date(
    currentDate.value.getFullYear(),
    currentDate.value.getMonth() + 1,
    1
  )
}

// 添加新的计算函数
const getSummary = (events: Event[]) => {
  const 送礼Count = events.filter(e => e.type === '送礼').length
  const 收礼Count = events.filter(e => e.type === '收礼').length
  const 待参加Count = events.filter(e => e.type === '待参加').length
  
  const parts = []
  if (送礼Count) parts.push(`送${送礼Count}`)
  if (收礼Count) parts.push(`收${收礼Count}`)
  if (待参加Count) parts.push(`待${待参加Count}`)
  
  return parts.join(' ')
}
</script>

<template>
  <div class="calendar">
    <div class="calendar-header">
      <button @click="previousMonth">&lt;</button>
      <span>{{ currentDate.getFullYear() }}年 {{ currentDate.getMonth() + 1 }}月</span>
      <button @click="nextMonth">&gt;</button>
    </div>
    
    <div class="calendar-grid">
      <div class="weekday" v-for="day in ['日', '一', '二', '三', '四', '五', '六']" :key="day">
        {{ day }}
      </div>
      
      <div
        v-for="{ date, type } in calendarDays"
        :key="date.toISOString()"
        :class="[
          'calendar-cell',
          type,
          { 'has-events': type === 'current' && hasEvents(date) }
        ]"
      >
        <span class="date-number">{{ date.getDate() }}</span>
        <div v-if="type === 'current' && hasEvents(date)" class="event-container">
          <div class="event-summary">
            <template v-if="props.markedDates[getDateString(date)]">
              {{ getSummary(props.markedDates[getDateString(date)]) }}
            </template>
          </div>
        </div>
        
        <!-- 悬浮提示框 -->
        <div v-if="type === 'current' && hasEvents(date)" class="event-tooltip">
          <div v-for="(event, index) in props.markedDates[getDateString(date)]" 
               :key="index" 
               class="tooltip-item"
          >
            <div class="tooltip-header">
              <span :class="['event-indicator', event.type]"></span>
              <span class="event-name">{{ event.name }}</span>
              <span :class="['event-badge', event.type]">
                {{ event.type === '送礼' ? '送' : '收' }}
              </span>
            </div>
            <div class="event-info">
              <span class="event-type">{{ event.eventType }}</span>
              <span v-if="event.location" class="event-location">@ {{ event.location }}</span>
              <span v-if="event.amount" class="event-amount">
                {{ event.type === '送礼' ? '-' : '+' }}¥{{ event.amount }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
}

.calendar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-bottom: 1px solid #dcdfe6;
}

.calendar-header button {
  border: none;
  background: none;
  padding: 4px 8px;
  cursor: pointer;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: #f5f7fa;
}

.weekday {
  padding: 12px;
  text-align: center;
  background-color: #fff;
  font-weight: bold;
}

.calendar-cell {
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  min-height: 80px;
  padding: 8px;
  transition: all 0.3s;
}

.date-number {
  margin-bottom: 4px;
}

.event-container {
  margin-top: 4px;
}

.event-summary {
  font-size: 12px;
  color: #606266;
  text-align: center;
  padding: 2px 4px;
  background-color: #f5f7fa;
  border-radius: 3px;
  line-height: 1.4;
}

.event-badge {
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 10px;
  color: #fff;
  font-weight: bold;
}

.event-badge.送礼 {
  background-color: #f56c6c;
}

.event-badge.收礼 {
  background-color: #67c23a;
}

.event-badge.待参加 {
  background-color: #e6a23c;
}

.event-tooltip {
  display: none;
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 8px;
  width: 240px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
  z-index: 1000;
}

.calendar-cell:hover .event-tooltip {
  display: block;
}

.tooltip-item {
  padding: 10px;
}

.tooltip-item:hover {
  background-color: #f5f7fa;
}

.tooltip-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.event-indicator {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.event-indicator.送礼 {
  background-color: #f56c6c;
}

.event-indicator.收礼 {
  background-color: #67c23a;
}

.event-indicator.待参加 {
  background-color: #e6a23c;
}

.event-name {
  font-weight: 500;
  color: #303133;
  flex-grow: 1;
}

.event-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #909399;
  margin-left: 14px;
}

.event-amount {
  font-weight: bold;
}

.event-amount:not(:empty) {
  color: #f56c6c;
}

.收礼 .event-amount {
  color: #67c23a;
}

.event-tooltip {
  min-width: 260px;
  max-width: 320px;
}

.has-events {
  background-color: #f5f7fa;
}

.has-events:hover {
  background-color: #ebeef5;
}
</style>
