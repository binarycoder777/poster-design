<script lang="ts" setup>
import { reactive } from 'vue'
import { ElForm, ElFormItem,ElInput,ElOption,ElDatePicker,ElTimePicker,ElSelect,ElSwitch,ElCol,ElCheckboxGroup,ElCheckbox,ElRadio,ElRadioGroup,ElButton } from 'element-plus'

// 定义props接收父组件传递的form数据
const props = defineProps({
  form: {
    type: Object,
    required: true,
    default: () => ({
      name: '',
      relation: '',
      date: '',
      amount: 0,
      remark: '',
      resource: 'Sponsor'
    })
  }
})

// 使用reactive包装form数据使其具有响应性
const formData = reactive(props.form)

// 定义emit向父组件发送事件
const emit = defineEmits(['submit'])

const onSubmit = () => {
  emit('submit', formData)
}
</script>

<template>
  <div>
    <el-form :model="formData" label-width="auto" style="max-width: 600px">
      <el-form-item label="姓名">
        <el-input v-model="formData.name" />
      </el-form-item>
      <el-form-item label="关系">
        <el-select v-model="formData.relation" placeholder="请选择和宴会主人的关系">
          <el-option label="同事" value="同事" />
          <el-option label="朋友" value="朋友" />
          <el-option label="亲戚" value="亲戚" />
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-col :span="24">
          <el-date-picker
            v-model="formData.date"
            type="date"
            placeholder="记账日期"
            style="width: 100%"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="金额">
        <el-input v-model="formData.amount" />
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="formData.resource">
          <el-radio value="Sponsor">随礼</el-radio>
          <el-radio value="Venue">收礼</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="formData.remark" type="textarea" />
      </el-form-item>
      <el-form-item class="bottom-button">
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>

</style>
