<script setup lang="ts">
import { Present, Money, Wallet, Calendar } from '@element-plus/icons-vue'
import { computed } from 'vue'

interface Statistics {
  totalReceived: number
  totalGiven: number
  balance: number
  recentEvents: number
}

const props = defineProps<{
  statistics: Statistics
}>()

// 计算同比增长率（这里可以从props传入，暂时写死模拟数据）
const growthRates = computed(() => ({
  totalReceived: 15.6,
  totalGiven: 8.2,
  balance: 22.4,
  recentEvents: 5.8
}))
</script>

<template>
  <div class="statistics-cards">
    <el-card class="stat-card">
      <div class="stat-content">
        <div class="stat-header">
          <span class="stat-title">今年收礼总额</span>
          <el-icon class="stat-icon received"><Present /></el-icon>
        </div>
        
        <div class="stat-body">
          <div class="stat-main">
            <span class="prefix">¥</span>
            <span class="number">{{ statistics.totalReceived.toLocaleString() }}</span>
          </div>
          <div class="stat-trend positive">
            <el-icon><CaretTop /></el-icon>
            {{ growthRates.totalReceived }}%
            <span class="trend-label">同比增长</span>
          </div>
        </div>
      </div>
    </el-card>

    <el-card class="stat-card">
      <div class="stat-content">
        <div class="stat-header">
          <span class="stat-title">今年送礼总额</span>
          <el-icon class="stat-icon given"><Money /></el-icon>
        </div>
        
        <div class="stat-body">
          <div class="stat-main">
            <span class="prefix">¥</span>
            <span class="number">{{ statistics.totalGiven.toLocaleString() }}</span>
          </div>
          <div class="stat-trend positive">
            <el-icon><CaretTop /></el-icon>
            {{ growthRates.totalGiven }}%
            <span class="trend-label">同比增长</span>
          </div>
        </div>
      </div>
    </el-card>

    <el-card class="stat-card">
      <div class="stat-content">
        <div class="stat-header">
          <span class="stat-title">今年收支差额</span>
          <el-icon class="stat-icon balance"><Wallet /></el-icon>
        </div>
        
        <div class="stat-body">
          <div class="stat-main">
            <span class="prefix">¥</span>
            <span class="number">{{ statistics.balance.toLocaleString() }}</span>
          </div>
          <div class="stat-trend positive">
            <el-icon><CaretTop /></el-icon>
            {{ growthRates.balance }}%
            <span class="trend-label">同比增长</span>
          </div>
        </div>
      </div>
    </el-card>

    <el-card class="stat-card">
      <div class="stat-content">
        <div class="stat-header">
          <span class="stat-title">近一月事项</span>
          <el-icon class="stat-icon events"><Calendar /></el-icon>
        </div>
        
        <div class="stat-body">
          <div class="stat-main">
            <span class="number">{{ statistics.recentEvents }}</span>
            <span class="suffix">个</span>
          </div>
          <div class="stat-trend positive">
            <el-icon><CaretTop /></el-icon>
            {{ growthRates.recentEvents }}%
            <span class="trend-label">同比增长</span>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.statistics-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  max-width: 1300px;
  margin: 0 auto 48px;
  padding: 0 24px;
}

.stat-card {
  border-radius: 12px;
  transition: all 0.3s;
  border: none;
  background: white;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.08);
}

.stat-content {
  padding: 20px;
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.stat-title {
  font-size: 16px;
  color: #606266;
  font-weight: 500;
}

.stat-icon {
  font-size: 24px;
  padding: 8px;
  border-radius: 8px;
}

.stat-icon.received {
  background-color: rgba(103, 194, 58, 0.1);
  color: #67c23a;
}

.stat-icon.given {
  background-color: rgba(64, 158, 255, 0.1);
  color: #409EFF;
}

.stat-icon.balance {
  background-color: rgba(230, 162, 60, 0.1);
  color: #e6a23c;
}

.stat-icon.events {
  background-color: rgba(144, 147, 153, 0.1);
  color: #909399;
}

.stat-body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stat-main {
  display: flex;
  align-items: baseline;
  gap: 4px;
}

.prefix, .suffix {
  font-size: 18px;
  color: #606266;
  font-weight: 500;
}

.number {
  font-size: 28px;
  font-weight: 600;
  color: #303133;
  font-family: 'Roboto Mono', monospace;
  line-height: 1.2;
}

.stat-trend {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  font-weight: 500;
}

.stat-trend.positive {
  color: #67c23a;
}

.stat-trend.negative {
  color: #f56c6c;
}

.trend-label {
  color: #909399;
  margin-left: 4px;
  font-weight: normal;
}

:deep(.el-card__body) {
  padding: 0;
}

/* 响应式布局 */
@media screen and (max-width: 1200px) {
  .statistics-cards {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}

@media screen and (max-width: 640px) {
  .statistics-cards {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  
  .stat-content {
    padding: 16px;
  }
  
  .number {
    font-size: 24px;
  }
  
  .prefix, .suffix {
    font-size: 16px;
  }
}
</style> 