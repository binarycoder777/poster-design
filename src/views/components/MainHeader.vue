<script setup lang="ts">
import { ElPageHeader, ElIcon, ElMenu, ElMenuItem, ElSubMenu, ElPopover, ElAvatar } from 'element-plus'
import { Setting, Bell, Iphone, User, SwitchButton } from '@element-plus/icons-vue'
</script>

<template>
  <el-page-header :icon="null" class="main-header">
    <!-- <template #icon>
      <el-avatar :size="32" class="mr-3" src="/public/gift.jpg" />
    </template> -->

    <template #title>
      <div class="header-title">
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
          <el-popover
            placement="bottom"
            :width="240"
            trigger="hover"
          >
            <template #reference>
              <ElIcon class="action-icon">
                <Iphone />
              </ElIcon>
            </template>
            <div class="qr-container">
              <div class="qr-item">
                <img src="https://via.placeholder.com/100" alt="APP二维码" class="qr-code">
                <span>APP下载</span>
              </div>
              <div class="qr-item">
                <img src="https://via.placeholder.com/100" alt="APP二维码" class="qr-code">
                <span>微信小程序</span>
              </div>
            </div>
          </el-popover>
        </div>
        <el-popover
          placement="bottom-end"
          :width="200"
          trigger="hover"
          popper-class="avatar-popover"
        >
          <template #reference>
            <ElAvatar :size="40" class="user-avatar" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
          </template>
          <div class="user-popover">
            <div class="user-info">
              <ElAvatar :size="60" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
              <div class="user-details">
                <h3>用户名称</h3>
                <p>个人账户</p>
              </div>
            </div>
            <div class="divider"></div>
            <div class="menu-items">
              <div class="menu-item">
                <el-icon><User /></el-icon>
                <span>个人中心</span>
              </div>
              <div class="menu-item">
                <el-icon><Setting /></el-icon>
                <span>账户设置</span>
              </div>
              <div class="menu-item">
                <el-icon><Bell /></el-icon>
                <span>消息通知</span>
              </div>
              <div class="divider"></div>
              <div class="menu-item logout">
                <el-icon><SwitchButton /></el-icon>
                <span>退出登录</span>
              </div>
            </div>
          </div>
        </el-popover>
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

.qr-container {
  display: flex;
  justify-content: space-around;
  padding: 12px;
}

.qr-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.qr-code {
  width: 100px;
  height: 100px;
  object-fit: cover;
}

.user-popover {
  padding: 16px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.user-details h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}

.user-details p {
  margin: 4px 0 0;
  font-size: 14px;
  color: #909399;
}

.divider {
  height: 1px;
  background-color: #EBEEF5;
  margin: 12px 0;
}

.menu-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.menu-item:hover {
  background-color: #F5F7FA;
}

.menu-item .el-icon {
  font-size: 16px;
  color: #909399;
}

.menu-item span {
  font-size: 14px;
  color: #606266;
}

.logout {
  color: #F56C6C;
}

.logout:hover {
  background-color: #FEF0F0;
}

.logout .el-icon {
  color: #F56C6C;
}

.logout span {
  color: #F56C6C;
}
</style>