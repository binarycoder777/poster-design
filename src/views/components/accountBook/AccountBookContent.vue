<script lang="ts" setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import { ElInput, ElTable, ElTableColumn, ElDialog, ElForm, ElFormItem, ElButton } from 'element-plus'
import SaveAccountBookItem from './SaveAccountBookItem.vue'


interface User {
  date: string
  name: string
  relation: string
  amount: number
  remark: string
}

const tableData: User[] = [
  {
    date: '2016-05-04',
    name: 'Aleyna Kutzner',
    relation: '朋友',
    amount: 150.0,
    remark: 'Lohrbergstr. 86c, Süd Lilli, Saarland',
  },
  {
    date: '2016-05-03',
    name: 'Helen Jacobi',
    relation: '同事',
    amount: 200.0,
    remark: '760 A Street, South Frankfield, Illinois',
  },
  {
    date: '2016-05-02',
    name: 'Brandon Deckert',
    relation: '亲戚',
    amount: 300.0,
    remark: 'Arnold-Ohletz-Str. 41a, Alt Malinascheid, Thüringen',
  },
  {
    date: '2016-05-01',
    name: 'Margie Smith',
    relation: '朋友',
    amount: 100.0,
    remark: '23618 Windsor Drive, West Ricardoview, Idaho',
  },
  {
    date: '2016-05-03',
    name: 'Helen Jacobi',
    relation: '同事',
    amount: 200.0,
    remark: '760 A Street, South Frankfield, Illinois',
  },
  {
    date: '2016-05-02',
    name: 'Brandon Deckert',
    relation: '亲戚',
    amount: 300.0,
    remark: 'Arnold-Ohletz-Str. 41a, Alt Malinascheid, Thüringen',
  },
  {
    date: '2016-05-01',
    name: 'Margie Smith',
    relation: '朋友',
    amount: 100.0,
    remark: '23618 Windsor Drive, West Ricardoview, Idaho',
  },
  {
    date: '2016-05-03',
    name: 'Helen Jacobi',
    relation: '同事',
    amount: 200.0,
    remark: '760 A Street, South Frankfield, Illinois',
  },
  {
    date: '2016-05-02',
    name: 'Brandon Deckert',
    relation: '亲戚',
    amount: 300.0,
    remark: 'Arnold-Ohletz-Str. 41a, Alt Malinascheid, Thüringen',
  },
  {
    date: '2016-05-01',
    name: 'Margie Smith',
    relation: '朋友',
    amount: 100.0,
    remark: '23618 Windsor Drive, West Ricardoview, Idaho',
  },
]

const filtersRelation = [
  {
    text: '同事',
    value: '同事',
  },
  {
    text: '朋友',
    value: '朋友',
  },
  {
    text: '亲戚',
    value: '亲戚',
  },
]

// 排序
const search = ref('')

const pageQuery = () => {}

// 将这些变量移到顶层作用域
const dialogVisible = ref(false)
const editForm = reactive({
  name: '',
  relation: '',
  date: '',
  amount: 0,
  remark: ''
})

// 简化 handleEdit 函数
const handleEdit = (index: number, row: User) => {
  dialogVisible.value = true
  editForm.name = row.name
  editForm.relation = row.relation 
  editForm.date = row.date
  editForm.amount = row.amount
  editForm.remark = row.remark
}

const onSubmit = () => {
  console.log('submit:', editForm)
  dialogVisible.value = false
}

// 删除
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}

// 添加重置表单的函数
const resetForm = () => {
  editForm.name = ''
  editForm.relation = ''
  editForm.date = ''
  editForm.amount = 0
  editForm.remark = ''
}

// 添加新增函数
const handleAdd = () => {
  resetForm()
  dialogVisible.value = true
}
</script>



<template>
  <!-- 移除新增按钮,因为已经在AccountBook.vue中有了新增功能 -->

  <el-table :data="tableData" style="width: 100%" max-height="450">
    <el-table-column prop="date" label="日期" width="180" column-key="date" sortable="custom" :sort-change="pageQuery" />
    <el-table-column property="name" label="姓名" width="120" sortable="custom" :sort-change="pageQuery" />
    <el-table-column property="relation" label="关系" width="120" :filters="filtersRelation" :filter-method="pageQuery" />
    <el-table-column property="amount" label="金额" width="120" sortable="custom" :sort-change="pageQuery" />
    <el-table-column align="center" property="remark" label="备注" width="240" show-overflow-tooltip />
    <el-table-column align="center">
      <template #header>
        <el-input v-model="search" size="small" placeholder="搜索..." />
      </template>
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"> 编辑 </el-button>
        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)"> 删除 </el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog v-model="dialogVisible" :title="editForm.name ? '编辑' : '新增'" width="30%">
    <SaveAccountBookItem :form="editForm" @submit="onSubmit" />
  </el-dialog>
</template>

<style scoped>
</style>