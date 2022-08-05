<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card class="box-card">
        <DreeTools :is-root="true" :tree-node="campanr" />
        <el-tree :data="treeData" :props="defaultProps">
          <template v-slot="{ data }">
            <DreeTools :tree-node="data" />
          </template>
        </el-tree>
      </el-card>
    </div>
  </div>
</template>

<script>
import DreeTools from './components/dree-tools.vue'
import { transListToTree } from '@/utils'
import { getDeptsApai } from '@/api/departments'
export default {
  components: {
    DreeTools
  },
  data() {
    return {
      treeData: [{ name: '总裁办', children: [{ name: '董事会' }] },
        { name: '行政部' }, { name: '人事部' }],
      defaultProps: {
        label: 'name'
      },
      campanr: { name: '传智教育', manager: '负责人' }
    }
  },
  created() {
    this.loadDepts()
  },
  methods: {
    async loadDepts() {
      const res = await getDeptsApai()
      this.treeData = transListToTree(res.depts, '')
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
