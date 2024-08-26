<script lang="ts" setup>
import { ElPopover, ElPagination, ElIcon, ElSkeleton, ElSkeletonItem, ElSubMenu, ElMenu, ElMenuItem, ElMenuItemGroup } from 'element-plus'

import { onMounted, ref } from 'vue'

import { Memo, Search, Edit, Download, Share, EditPen, Sunny, Notebook, Expand } from '@element-plus/icons-vue'

import type { ComponentSize } from 'element-plus'

// 自定义组件 

import AccountBookCatalog from './AccountBookCatalog.vue'

// 弹窗

const dialogVisible = ref(false);

// 右侧菜单 & 底部分页

const currentPage4 = ref(4)
const activeIndex = ref('1')
const pageSize4 = ref(100)
const size = ref<ComponentSize>('default')
const background = ref(false)
const disabled = ref(false)

const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
  dialogVisible.value = true
}

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
}

</script>

<template>
  <div class="container">
    <div class="book-acount-container">
      <!-- 账本内容 -->
      <div class="content">
        <el-skeleton :rows="12" />
      </div>
      <!-- 书签侧边栏 -->
      <div class="book-asiderbar">
        <div class="popContent">
          <el-dialog v-model="dialogVisible"  width="800">
            <AccountBookCatalog></AccountBookCatalog>
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
