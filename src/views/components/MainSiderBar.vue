<script lang="ts" setup>

import { ElIcon,ElMenu,ElMenuItem,ElSubMenu } from 'element-plus'

import {
  Document,
  Menu as IconMenu,
  Location,
  User,
  Edit,
} from '@element-plus/icons-vue'
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
  <el-row class="tac">
    <el-col :span="12">
      <!-- <h5 class="mb-2">Default colors</h5> -->
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="1">
          <el-icon><icon-menu /></el-icon>
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><Edit /></el-icon>
          <span>我的账本</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><User /></el-icon>
          <span>人情往来</span>
        </el-menu-item>
        <el-menu-item index="4">
          <el-icon><document /></el-icon>
          <span>个人请帖</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<style scoped>
.el-menu {
	border-right:0!important;
}
</style>