<script setup lang="ts">

import { ElContainer,ElHeader,ElAside,ElMain,ElFooter } from 'element-plus'
import MainHeader from '../components/MainHeader.vue'
import MainSiderBar from '../components/MainSiderBar.vue'
import MainBody from '../components/MainBody.vue'

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <div class="main-header">
          <MainHeader>
          </MainHeader>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <div class="main-asider">
            <MainSiderBar>
          </MainSiderBar>
          </div>
        </el-aside>
        <el-container>
          <el-main>
            <div class="main-body" style="overflow: auto;">
              <MainBody>
              </MainBody>
            </div>
          </el-main>
          <el-footer>Footer</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>


.main-header .main-body{
  margin-top: 20px;
}

.main-asider {
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
</style>