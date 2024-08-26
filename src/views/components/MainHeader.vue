<script setup lang="ts">
import { ElPageHeader, ElIcon,ElMenu,ElMenuItem,ElSubMenu } from 'element-plus'

import { Setting,Bell,Iphone } from '@element-plus/icons-vue'
</script>

<template>
  <el-page-header :icon=null>
    <!-- <template #icon>
      <el-avatar :size="32" class="mr-3" src="/public/gift.jpg" />
    </template> -->

    <template #title>
      <div class="header-title">
        <el-avatar :size="32" class="mr-3" src="/public/gift.jpg" />
        <span class="text-large font-600 mr-3" style="font-size: 32px"> 礼尚往来 </span>
      </div>
    </template>

    <template #content>
      <el-menu ellipsis class="el-menu-popper-demo" mode="horizontal" :popper-offset="16" style="max-width: 1000px">
        <el-menu-item index="1">酒楼市集</el-menu-item>
        <el-menu-item index="2">宴会用品</el-menu-item>
        <el-menu-item index="3">请帖制作</el-menu-item>
        <el-menu-item index="3">我要宴请</el-menu-item>
        <el-menu-item index="3">我要宴请</el-menu-item>
      </el-menu>
    </template>

    <template #extra>
      <div class="flex-items-center">
        <ElIcon>
          <Setting></Setting>
        </ElIcon>
        <ElIcon>
          <Bell></Bell>
        </ElIcon>
        <ElIcon>
          <Iphone></Iphone>
        </ElIcon>
        <el-button type="primary">我要记账</el-button>
        <ElAvatar :size="50" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
      </div>
    </template>
  </el-page-header>
</template>

<style scoped>

.header-title {
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: center;
  gap: 20px;
}


.el-icon {
  font-size:32px;
}

.flex-items-center {
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: center;
  gap: 20px;
}

.el-menu {
  border-bottom: 0 !important;
}
</style>