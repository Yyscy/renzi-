<template>
  <div class="dashboard-container">
    <div class="app-container">
      <UploadExcel :before-upload="excelSuccess" :on-success="onSuccess" />
    </div>
  </div>
</template>

<script>
import { importEmployee } from '@/api/employees'
import employees from '@/constant/employees'
import { formatTimes } from '@/filters'
const { importMapKeyOath } = employees
export default {
  components: {
  },
  data() {
    return {
    }
  },

  created() {},

  methods: {
    excelSuccess({ name }) {
      if (!name.endsWith('.xlsx')) {
        this.$message.error('请输入xlsx文件')
        return false
      }
      return true
    },
    async onSuccess({ header, results }) {
      const newArr = await results.map((item) => {
        const obj = {}
        for (const key in importMapKeyOath) {
          if (key === '入职日期' || key === '转正日期') {
            const timestamp = item[key]
            const data = new Date((timestamp - 1) * 24 * 3600000)
            data.setFullYear(data.getFullYear() - 70)
            obj[importMapKeyOath[key]] = formatTimes(data)
          } else {
            obj[importMapKeyOath[key]] = item[key]
          }
        }
        return obj
      })
      console.log(newArr)
      await importEmployee(newArr) // 调用导入接口
      this.$message.success('导入成功')
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less"></style>
