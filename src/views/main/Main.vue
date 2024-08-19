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
            <div class="main-body">
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
</style>