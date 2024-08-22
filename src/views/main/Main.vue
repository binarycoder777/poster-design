<script setup lang="ts">
import { ElContainer, ElHeader, ElAside, ElMain, ElFooter, ElIcon, ElMenu, ElMenuItem, ElSubMenu } from 'element-plus'
import { Document, Menu as IconMenu, User, Edit } from '@element-plus/icons-vue'

import MainHeader from '../components/MainHeader.vue'
import MainBody from '../components/MainBody.vue'
import AccountBookBody from '../components/AccountBookBody.vue'

import { ref } from 'vue'

// asidebar与content的映射
const menuConfig = {
  defaultActive: 1,
  items: [
    { index: '1', title: '首页', component: MainBody, icon: IconMenu },
    { index: '2', title: '我的账本', component: AccountBookBody, icon: Document },
    { index: '3', title: '人情来往', component: 'ContactsPage', icon: User },
    { index: '4', title: '个人请帖', component: 'InvitationPage', icon: Edit },
  ],
}

const activeMenu = ref('1') // 默认激活的菜单项
const activeComponent = ref(MainBody) // 默认显示的内容组件

const handleSelect = (index) => {
  const selectedItem = menuConfig.items.find((item) => item.index === index)
  if (selectedItem) {
    activeMenu.value = index
    activeComponent.value = selectedItem.component
  }
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="main-header">
          <MainHeader> </MainHeader>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-row class="tac">
            <el-col :span="12">
              <el-menu :default-active="menuConfig.defaultActive.toString()" class="el-menu-vertical-demo" @select="handleSelect">
                <el-menu-item v-for="(item, index) in menuConfig.items" :index="item.index.toString()">
                  <el-icon>
                    <component :is="item.icon" />
                  </el-icon>
                  <span>{{ item.title }}</span>
                </el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-container>
          <el-main>
            <div class="main-body" style="overflow: auto">
              <component :is="activeComponent" />
            </div>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
.main-header .main-body {
  margin-top: 20px;
}

.el-aside {
  margin-top: 20px;
}

.el-main {
  height: 100vh; /* 设置主容器高度 */
  overflow: hidden; /* 防止外部滚动 */
}

.main-body {
  height: 100%; /* 确保占满主容器 */
  overflow: auto; /* 处理溢出 */
}

.el-menu {
  border-right: 0 !important;
}
</style>