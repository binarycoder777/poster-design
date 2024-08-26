
<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { ElCard, ElRow, ElCol, ElAnchor, ElAnchorLink } from 'element-plus'
import { pa } from 'element-plus/es/locale'

const containerRef = ref<HTMLElement | null>(null)

const handleClick = (e: MouseEvent) => {
  e.preventDefault()
}

const partKeyArray = new Array()

// 26个字母
const loadAllPart = () => {
  for (let i = 0; i < 26; ++i) {
    // 使用字符码转换生成字母
    partKeyArray.push(String.fromCharCode(65 + i))
  }
}

onMounted(() => {
  loadAllPart()
})
</script>

<template>
  <div>
    <el-row>
      <el-col :span="20">
        <div className="catalog-title">
          <img src="https://tools-api.webcrumbs.org/image-placeholder/120/160/book"/>
          <div class="catalog-subtitle">
            <h1>xxx与YYY的婚宴</h1>
            <p>2024年6月20日</p>
            <p>xxx与YYY的婚宴于yyyy-MM-dd在某某大酒店举行...</p>
          </div>
        </div>
        <div ref="containerRef" style="max-height: 600px; overflow-y: auto">
          <div v-for="(partKey, index) in partKeyArray" :key="index" :id="partKey" style="height: 100px; background: rgba(255, 0, 0, 0.02); margin-top: 30px">{{ partKey }}</div>
        </div>
      </el-col>
      <el-col :span="4">
        <el-anchor :container="containerRef" direction="vertical" type="default" :offset="30" @click="handleClick">
          <el-anchor-link v-for="partKey in partKeyArray" :href="'#' + partKey" :title="partKey" />
        </el-anchor>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.catalog-title{
  display: flex;
  flex-grow: 2;
  max-width: 700px;
  max-height: 160px;
  justify-content: space-evenly;
  margin-bottom: 2%;
}

.catalog-subtitle > h1 {
  text-align: center;
}

.catalog-subtitle > p {
  margin-top: 5%;
  text-align: center;
}


</style>
