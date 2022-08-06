<template>
  <div class="dashboard-container">
    <div v-loading="loading" class="app-container">
      <el-card class="box-card">
        <DreeTools :is-root="true" :tree-node="campanr" @add="addxdepartment" />
        <el-tree :data="treeData" :props="defaultProps" default-expand-all>
          <template v-slot="{ data }">
            <DreeTools :tree-node="data" @refresh="loadDepts" @add="addxdepartment" @editDepts="editDepts" />
          </template>
        </el-tree>
      </el-card>
    </div>
    <addDept ref="addDept" :visible.sync="dialogVisible" :treenodes="treeNode" />
  </div>
</template>

<script>
import { transListToTree } from '@/utils'
import { getDeptsApai } from '@/api/departments'
import DreeTools from './components/dree-tools.vue'
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
      treeNode: {},
      loading: false
    }
  },
  created() {
    this.loadDepts()
  },
  methods: {
    async loadDepts() {
      this.loading = true
      try {
        const res = await getDeptsApai()
        this.treeData = transListToTree(res.depts, '')
      } finally {
        this.loading = false
      }
    },
    addxdepartment(treeNode) {
      this.dialogVisible = true
      this.treeNode = treeNode
    },
    // 编辑部门节点
    editDepts(node) {
      // 首先打开弹层
      this.dialogVisible = true
      this.treeNode = node // 赋值操作的节点
      this.$refs.addDept.getDepartDetail(node.id)
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
