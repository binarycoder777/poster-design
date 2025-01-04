<script lang="ts" setup>
import { ElPopover, ElPagination, ElIcon, ElSkeleton, ElSkeletonItem, ElSubMenu, ElMenu, ElMenuItem, ElMenuItemGroup } from 'element-plus'

import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { Memo, Search, Edit, Download, Share, EditPen, Sunny, Notebook, Expand ,ArrowLeft, Plus, Grid, Menu } from '@element-plus/icons-vue'

import type { ComponentSize } from 'element-plus'
import type { Component } from 'vue'

// 自定义组件

import AccountBookCatalog from './AccountBookCatalog.vue'

import AccountBookContent from './AccountBookContent.vue'

import SaveAccountBookItem from './SaveAccountBookItem.vue'

import AccountBookFont from './AccountBookFont.vue'

import AccountBookTheme from './AccountBookTheme.vue'

import DownloadAccountBook from './DownloadAccountBook.vue'

import ShareAccountBook from './ShareAccountBook.vue'

import AccountBookBody from '../AccountBookBody.vue'

// 右侧菜单 & 弹窗

const catalogConfig = {
  defaultActive: 0,
  items: [
    { index: '1', title: '新增', component: SaveAccountBookItem, icon: Edit, form: { name: '', relation: '', date: '', amount: 0, remark: '', resource: 'Sponsor' } },
    { index: '2', title: '目录', component: AccountBookCatalog, icon: Memo },
    { index: '3', title: '字号', component: AccountBookFont, icon: EditPen },
    { index: '4', title: '主题', component: AccountBookTheme, icon: Sunny },
    { index: '5', title: '下载', component: DownloadAccountBook, icon: Download },
    { index: '6', title: '分析', component: ShareAccountBook, icon: Share },
  ],
}

const dialogVisible = ref(false)

const activeCatalog = ref('1') // 默认激活的菜单项
const activeCatalogComponent = ref<Component>(AccountBookCatalog) // 默认显示的内容组件

const handleSelect = (index: string) => {
  const selectedItem = catalogConfig.items.find((item) => item.index === index)
  if (selectedItem) {
    activeCatalog.value = index
    activeCatalogComponent.value = selectedItem.component as Component
    dialogVisible.value = true
  }
}

// 右侧菜单 & 底部分页

const currentPage4 = ref(4)
const activeIndex = ref('1')
const pageSize4 = ref(100)
const size = ref<ComponentSize>('default')
const background = ref(false)
const disabled = ref(false)

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

// 返回到AccountBookBody组件
const emit = defineEmits(['back'])
const handleBack = () => {
  emit('back')
}

const searchQuery = ref('')
const viewType = ref('table')

const activeComponent = ref<Component>(AccountBookCatalog)

const dialogTitle = ref('')

const menuItems = [
  { index: '1', title: '新增', icon: Plus, component: SaveAccountBookItem },
  { index: '2', title: '目录', icon: Memo, component: AccountBookCatalog },
  { index: '3', title: '字号', icon: EditPen, component: AccountBookFont },
  { index: '4', title: '主题', icon: Sunny, component: AccountBookTheme },
  { index: '5', title: '下载', icon: Download, component: DownloadAccountBook },
  { index: '6', title: '分析', icon: Share, component: ShareAccountBook }
]

const activeMenu = ref('1')

const handleMenuClick = (item: any) => {
  activeMenu.value = item.index
  activeComponent.value = item.component as Component
  dialogTitle.value = item.title
  dialogVisible.value = true
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const handleAdd = () => {
  dialogTitle.value = '新增记录'
  activeComponent.value = SaveAccountBookItem as Component
  dialogVisible.value = true
}
</script>

<template>
  <div class="container">
    <!-- 顶部导航区 -->
    <header class="header">
      <div class="header-left">
        <el-button class="back-btn" @click="handleBack">
          <el-icon><ArrowLeft /></el-icon>
          返回
        </el-button>
        <div class="header-title">
          <h1>账本详情</h1>
          <span class="subtitle">{{ formatDate(new Date()) }}</span>
        </div>
      </div>
      <div class="header-right">
        <el-button type="primary" @click="handleAdd">
          <el-icon><Plus /></el-icon>
          新增记录
        </el-button>
      </div>
    </header>

    <!-- 主要内容区 -->
    <main class="main-content">
      <!-- 左侧内容区 -->
      <div class="content-wrapper">
        <div class="content-header">
          <div class="search-bar">
            <el-input
              v-model="searchQuery"
              placeholder="搜索记录..."
              prefix-icon="Search"
              clearable
            />
          </div>
          <div class="view-options">
            <el-button-group>
              <el-button :type="viewType === 'table' ? 'primary' : 'default'">
                <el-icon><Grid /></el-icon>
              </el-button>
              <el-button :type="viewType === 'card' ? 'primary' : 'default'">
                <el-icon><Menu /></el-icon>
              </el-button>
            </el-button-group>
          </div>
        </div>
        
        <div class="content-body">
          <AccountBookContent />
        </div>
      </div>

      <!-- 右侧边栏 -->
      <aside class="sidebar">
        <div class="sidebar-section">
          <h3 class="sidebar-title">账本信息</h3>
          <div class="info-list">
            <div class="info-item">
              <span class="label">总金额</span>
              <span class="value">¥ 25,000.00</span>
            </div>
            <div class="info-item">
              <span class="label">记录数</span>
              <span class="value">128</span>
            </div>
          </div>
        </div>

        <div class="sidebar-section">
          <h3 class="sidebar-title">快捷操作</h3>
          <el-menu
            class="quick-actions"
            :default-active="activeMenu"
          >
            <el-menu-item v-for="item in menuItems" 
                          :key="item.index" 
                          :index="item.index"
                          @click="handleMenuClick(item)">
              <el-icon><component :is="item.icon" /></el-icon>
              <span>{{ item.title }}</span>
            </el-menu-item>
          </el-menu>
        </div>
      </aside>
    </main>

    <!-- 弹窗 -->
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="800px"
      destroy-on-close
    >
      <component :is="activeComponent" />
    </el-dialog>
  </div>
</template>

<style scoped>
.container {
  height: 100vh;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
}

.header {
  height: 64px;
  padding: 0 32px;
  background: white;
  border-bottom: 1px solid #eaecef;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 24px;
}

.back-btn {
  border: none;
  background: transparent;
  &:hover {
    background: #f5f5f5;
  }
}

.header-title {
  h1 {
    font-size: 18px;
    font-weight: 600;
    color: #1f2329;
    margin: 0;
  }
  .subtitle {
    font-size: 13px;
    color: #86909c;
  }
}

.main-content {
  flex: 1;
  display: flex;
  gap: 24px;
  padding: 24px;
  min-height: 0;
}

.content-wrapper {
  flex: 1;
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.content-header {
  padding: 16px 24px;
  border-bottom: 1px solid #eaecef;
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-bar {
  width: 320px;
}

.content-body {
  flex: 1;
  min-height: 0;
}

.sidebar {
  width: 280px;
  flex-shrink: 0;
}

.sidebar-section {
  background: white;
  border-radius: 12px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
  padding: 20px;
  margin-bottom: 16px;
}

.sidebar-title {
  font-size: 14px;
  font-weight: 600;
  color: #1f2329;
  margin: 0 0 16px 0;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  .label {
    color: #86909c;
    font-size: 14px;
  }
  
  .value {
    color: #1f2329;
    font-weight: 500;
  }
}

.quick-actions {
  border: none;
  
  :deep(.el-menu-item) {
    height: 40px;
    line-height: 40px;
    border-radius: 6px;
    margin: 4px 0;
    
    &:hover {
      background-color: #f5f7fa;
    }
    
    &.is-active {
      background-color: #f0f7ff;
      color: #1890ff;
    }
    
    .el-icon {
      margin-right: 12px;
    }
  }
}
</style>
