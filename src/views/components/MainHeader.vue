<script setup lang="ts">
import { ElPageHeader, ElIcon, ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'
import { Setting, Bell, Iphone } from '@element-plus/icons-vue'
</script>

<template>
  <el-page-header :icon="null" class="main-header">
    <!-- <template #icon>
      <el-avatar :size="32" class="mr-3" src="/public/gift.jpg" />
    </template> -->

    <template #title>
      <div class="header-title" @click="$router.push('/home')">
        <el-avatar :size="40" class="logo" src="/public/gift.jpg" />
        <span class="brand-name"> 礼尚往来 </span>
      </div>
    </template>

    <!-- <template #content>
      <el-menu ellipsis class="el-menu-popper-demo" mode="horizontal" :popper-offset="16" style="max-width: 1000px">
        <el-menu-item index="1">酒楼市集</el-menu-item>
        <el-menu-item index="2">宴会用品</el-menu-item>
        <el-menu-item index="3">请帖制作</el-menu-item>
        <el-menu-item index="3">我要宴请</el-menu-item>
        <el-menu-item index="3">我要宴请</el-menu-item>
      </el-menu>
    </template> -->

    <template #extra>
      <div class="header-actions">
        <div class="icon-group">
          <ElIcon class="action-icon">
            <Setting />
          </ElIcon>
          <ElIcon class="action-icon">
            <Bell />
          </ElIcon>
          <ElIcon class="action-icon">
            <Iphone />
          </ElIcon>
        </div>
        <el-button type="primary" class="record-btn">我要记账</el-button>
        <ElAvatar :size="40" class="user-avatar" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
      </div>
    </template>
  </el-page-header>
</template>

<style scoped>
.main-header {
  padding: 12px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header-title {
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.header-title:hover {
  opacity: 0.8;
}

.logo {
  border: 2px solid #e6e6e6;
}

.brand-name {
  font-size: 28px;
  font-weight: 600;
  color: #303133;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 24px;
}

.icon-group {
  display: flex;
  align-items: center;
  gap: 16px;
}

.action-icon {
  font-size: 24px;
  color: #606266;
  cursor: pointer;
  transition: color 0.2s;
}

.action-icon:hover {
  color: #409EFF;
}

.record-btn {
  padding: 8px 20px;
  font-weight: 500;
}

.user-avatar {
  border: 2px solid #e6e6e6;
  cursor: pointer;
  transition: transform 0.2s;
}

.user-avatar:hover {
  transform: scale(1.05);
}

.el-menu {
  border-bottom: none;
}
</style>