<script lang="ts" setup>
import { ElRow, ElCol } from 'element-plus'
import Pane from './homepage/Pane.vue'
</script>

<template>
  <el-row>
    <el-col class="pane" :span="24">
        <Pane></Pane>
    </el-col>
  </el-row>
</template>

<style scoped lang="scss">

.pane {
  max-width: 100%;
}

.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
