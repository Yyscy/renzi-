<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <DreeTools :is-root="true" :tree-node="campanr" @add="addxdepartment" />
        <el-tree :data="treeData" :props="defaultProps" default-expand-all>
          <template v-slot="{ data }">
            <DreeTools :tree-node="data" @refresh="loadDepts" @add="addxdepartment" />
          </template>
        </el-tree>
      </el-card>
    </div>
    <addDept :visible.sync="dialogVisible" :treenodes="treeNode" />
  </div>
</template>

<script>
import DreeTools from './components/dree-tools.vue'
import { transListToTree } from '@/utils'
import { getDeptsApai } from '@/api/departments'
import addDept from './components/add-dept.vue'
export default {
  components: {
    DreeTools,
    addDept
  },
  data() {
    return {
      treeData: [{ name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' }, { name: '人事部' }],
      defaultProps: {
        label: 'name'
      },
      campanr: { name: '传智教育', manager: '负责人' },
      dialogVisible: false,
      treeNode: {}
    }
  },
  created() {
    this.loadDepts()
  },
  methods: {
    async loadDepts() {
      const res = await getDeptsApai()
      this.treeData = transListToTree(res.depts, '')
    },
    addxdepartment(treeNode) {
      this.dialogVisible = true
      this.treeNode = treeNode
    }
  }
}
</script>

<style scoped >
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
 .box-card {
    width: 100%;
  }
</style>
