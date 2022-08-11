<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-button type="primary" size="small">新增角色</el-button>
          <el-table
            :data="tableData"
            style="width: 100%"
            border
          >
            <el-table-column
              prop="date"
              label="日期"
              width="180"
            />
            <el-table-column
              prop="name"
              label="姓名"
              width="180"
            />
            <el-table-column
              prop="address"
              label="地址"
            />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">公司信息</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'first', // tabs选项
      tableData: [{ // 表格数据
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },

  created() {},

  methods: {}
}
</script>

<style scoped lang="less"></style>
