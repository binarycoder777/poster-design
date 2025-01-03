<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 定义主题选项
const themes = [
  {
    name: '经典红',
    primary: '#c62828',
    secondary: '#ffcdd2', 
    background: '#fff5f5',
    border: '#ef9a9a'
  },
  {
    name: '典雅金',
    primary: '#bf8f00',
    secondary: '#fff3e0',
    background: '#fffbf2',
    border: '#ffe082'
  },
  {
    name: '中国红', 
    primary: '#d32f2f',
    secondary: '#ffebee',
    background: '#fff8f8',
    border: '#ffcdd2'
  },
  {
    name: '喜庆红',
    primary: '#c41e3a',
    secondary: '#ffe4e1',
    background: '#fff5f5',
    border: '#ffb6c1'
  }
]

const activeTheme = ref(themes[0])

// 切换主题
const changeTheme = (theme: any) => {
  activeTheme.value = theme
  // 触发主题变更,更新样式变量
  const root = document.documentElement
  root.style.setProperty('--primary-color', theme.primary)
  root.style.setProperty('--secondary-color', theme.secondary)
  root.style.setProperty('--background-color', theme.background)
  root.style.setProperty('--border-color', theme.border)
}

// 组件挂载时初始化主题
onMounted(() => {
  changeTheme(activeTheme.value)
})
</script>

<template>
  <div class="theme-container" :style="{
    '--primary-color': activeTheme.primary,
    '--secondary-color': activeTheme.secondary,
    '--background-color': activeTheme.background,
    '--border-color': activeTheme.border
  }">
    <h3>选择主题风格</h3>
    <div class="theme-list">
      <div
        v-for="theme in themes"
        :key="theme.name"
        class="theme-item"
        :class="{ active: theme.name === activeTheme.name }"
        @click="changeTheme(theme)"
      >
        <div class="theme-preview" :style="{ 
          backgroundColor: theme.background,
          borderColor: theme.border
        }">
          <div class="color-block" :style="{ backgroundColor: theme.primary }"></div>
          <div class="color-block" :style="{ backgroundColor: theme.secondary }"></div>
        </div>
        <span class="theme-name">{{ theme.name }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
:root {
  --primary-color: #c62828;
  --secondary-color: #ffcdd2;
  --background-color: #fff5f5;
  --border-color: #ef9a9a;
}

.theme-container {
  padding: 20px;
  background-color: var(--background-color);
}

.theme-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.theme-item {
  cursor: pointer;
  text-align: center;
  transition: all 0.3s;
}

.theme-item:hover {
  transform: translateY(-2px);
}

.theme-item.active .theme-preview {
  box-shadow: 0 0 0 2px var(--primary-color);
}

.theme-preview {
  height: 80px;
  border-radius: 8px;
  border: 1px solid var(--border-color);
  padding: 10px;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.color-block {
  height: 20px;
  border-radius: 4px;
}

.theme-name {
  font-size: 14px;
  color: var(--primary-color);
}
</style>
