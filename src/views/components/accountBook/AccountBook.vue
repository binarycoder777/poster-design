<script lang="ts" setup>
import { ElPopover, ElPagination, ElIcon, ElSkeleton, ElSkeletonItem, ElSubMenu, ElMenu, ElMenuItem, ElMenuItemGroup } from 'element-plus'

import { onMounted, ref } from 'vue'

import { Memo, Search, Edit, Download, Share, EditPen, Sunny, Notebook, Expand ,ArrowLeft} from '@element-plus/icons-vue'

import type { ComponentSize } from 'element-plus'

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
const activeCatalogComponent = ref(AccountBookCatalog) // 默认显示的内容组件

const handleSelect = (index: string) => {
  const selectedItem = catalogConfig.items.find((item) => item.index === index)
  if (selectedItem) {
    activeCatalog.value = index
    activeCatalogComponent.value = selectedItem.component
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
const isShowAccountBook = ref(true)
const handleBack = () => {
  isShowAccountBook.value = false
}
</script>

<template>
  <AccountBookBody v-if="!isShowAccountBook" />
  <div v-else class="container">
    <!-- 返回按钮 -->
    <div class="back-button">
      <div style="display: flex; align-items: center; gap: 20px;">
        <el-button class="custom-back-btn" type="primary" plain size="medium" @click="handleBack">
          <el-icon><ArrowLeft /></el-icon>
          返回
        </el-button>
        <div class="header-info" style="display: flex; align-items: center; justify-content: center;">
          <h1 class="title" style="margin: 0 20px 0 0; font-size: 24px; font-weight: 500;">张三的账本</h1>
          <span class="date" style="font-size: 16px; color: #606266;">2024-01-20</span>
        </div>
      </div>
    </div>
    <div class="book-acount-container">
      <!-- 账本内容 -->
      <div class="content">
        <Suspense>
          <template #default>
            <AccountBookContent />
          </template>
          <template #fallback>
            <div class="loading-placeholder">
              <el-skeleton :rows="10" animated />
            </div>
          </template>
        </Suspense>
      </div>
      <!-- 书签侧边栏 -->
      <div class="book-asiderbar">
        <div class="popContent">
          <el-dialog v-model="dialogVisible" width="800">
            <component :is="activeCatalogComponent" />
          </el-dialog>
        </div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" :ellipsis="false" @select="handleSelect">
          <el-menu-item index="1">
            <el-icon><Edit /></el-icon>
            <template #title>新增</template>
          </el-menu-item>
          <el-menu-item index="2">
            <el-icon><Memo /></el-icon>
            <template #title>目录</template>
          </el-menu-item>
          <el-menu-item index="3">
            <el-icon><EditPen /></el-icon>
            <template #title>字号</template>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon><Sunny /></el-icon>
            <template #title>主题</template>
          </el-menu-item>
          <el-menu-item index="5">
            <el-icon><Download /></el-icon>
            <template #title>下载</template>
          </el-menu-item>
          <el-menu-item index="6">
            <el-icon><Share /></el-icon>
            <template #title>分享</template>
          </el-menu-item>
        </el-menu>
      </div>
    </div>
    <!-- 翻页 -->
    <div>
      <el-pagination v-model:current-page="currentPage4" v-model:page-size="pageSize4" :page-sizes="[100, 200, 300, 400]" :size="size" :disabled="disabled" :background="background" layout="total, sizes, prev, pager, next, jumper" :total="400" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  overflow: auto;
}

.popContent {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.el-pagination {
  margin-top: 2%;
  /* margin-bottom: 20px; */
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.book-acount-container {
  margin-top: 2%;
  display: flex;
  flex-direction: row;
}

.content {
  width: 90%;
  height: 90%;
  border: 2px solid #ccc;
  border-radius: 15px; /* 圆角效果 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* 阴影效果 */
  padding: 20px;
  background-color: white; /* 可选的背景颜色 */
}

.book-asiderbar {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}

.el-menu {
  border-right: 0 !important;
}
</style>
