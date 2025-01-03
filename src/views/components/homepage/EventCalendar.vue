<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { ElCalendar, ElTooltip, ElIcon } from 'element-plus';
import { Calendar, Location } from '@element-plus/icons-vue';

interface Event {
  name: string;
  type: string;
  date: string;
  location?: string;
}

const props = defineProps<{ events: Event[] }>();

// 按月份组织事件数据
const monthlyEvents = computed(() => {
  const events: Record<string, Event[]> = {};
  props.events.forEach(event => {
    const date = new Date(event.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    if (!events[monthKey]) {
      events[monthKey] = [];
    }
    events[monthKey].push(event);
  });
  return events;
});

// 获取事件类型对应的样式
const getEventStyle = (type: string) => {
  const styles: Record<string, { color: string; icon: string }> = {
    '待参加': { color: '#E6A23C', icon: 'calendar' },
    '收礼': { color: '#67C23A', icon: 'gift' },
    '送礼': { color: '#909399', icon: 'present' },
    '婚宴': { color: '#409EFF', icon: 'celebration' },
    '满月酒': { color: '#67C23A', icon: 'baby' },
    '乔迁': { color: '#E6A23C', icon: 'home' }
  };
  return styles[type] || { color: '#909399', icon: 'event' };
};

// 检查日期是否有事件
const checkDateEvents = (date: Date) => {
  const events = monthlyEvents.value[`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`] || [];
  return events.filter(event => new Date(event.date).getDate() === date.getDate());
};

// 格式化日期显示
const formatDate = (date: Date) => {
  return date.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' });
};
</script>

<template>
  <div class="calendar-wrapper">
    <el-calendar>
      <template #dateCell="{ data }">
        <div class="date-cell" :class="{ 'has-events': checkDateEvents(data.date).length > 0 }">
          <span class="date-number">{{ data.date.getDate() }}</span>
          <div class="events-container">
            <el-tooltip 
              v-if="checkDateEvents(data.date).length"
              :content="formatDate(data.date)"
              placement="top"
              effect="light"
            >
              <div class="event-indicators">
                <template v-for="event in checkDateEvents(data.date)" :key="event.name">
                  <div 
                    class="event-dot"
                    :style="{ backgroundColor: getEventStyle(event.type).color }"
                  >
                    <el-icon><Location /></el-icon>
                  </div>
                </template>
              </div>
            </el-tooltip>
          </div>
        </div>
      </template>
    </el-calendar>
  </div>
</template>
