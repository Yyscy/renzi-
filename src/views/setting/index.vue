<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <div class="app-bun">
            <el-button type="primary" size="small" @click="appClick">新增角色</el-button>
          </div>

          <el-table :data="tableData" style="width: 100%" stripe border>
            <el-table-column width="120px" type="index" label="序号" />
            <el-table-column prop="name" label="角色" />
            <el-table-column prop="description" label="描述" />
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="success" size="small">分配权限</el-button>
                <el-button type="primary" size="small">编辑</el-button>
                <el-button type="danger" size="small" @click="onRemove(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class="pagination">
            <el-pagination
              layout="sizes, prev, pager, next"
              :page-size="Roeslpromise.pagesize"
              :page-sizes="[10, 20, 30, 40]"
              :total="total"
              @current-change="currentChange"
              @size-change="sizeChange"
            />
          </div>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">
          <el-alert
            title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
            type="info"
            show-icon
            :closable="false"
          />
          <el-form label-width="120px" style="margin-top:50px">
            <el-form-item label="公司名称">
              <el-input v-model="formData.name" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="公司地址">
              <el-input v-model="formData.companyAddress" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="formData.mailbox" disabled style="width:400px" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model="formData.remarks" type="textarea" :rows="3" disabled style="width:400px" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="50%"
      center
      @close="closes"
    >
      <el-form ref="form" :rules="addRoleFormRules" :model="addRoleForm" label-width="80px">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="addRoleForm.name" />
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input v-model="addRoleForm.description" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="noClose">取 消</el-button>
        <el-button type="primary" @click="onAddRole">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoeslApi, addRoeslApi, RemoveRoeslApi } from '@/api/role'
import { getCompanyInfo } from '@/api/settng'
export default {
  data() {
    return {
      activeName: 'first', // tabs选项
      tableData: [],
      Roeslpromise: {
        page: 1,
        pagesize: 10
      },
      total: 0,
      dialogVisible: false,
      addRoleForm: {
        name: '',
        description: ''
      },
      addRoleFormRules: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      },
      formData: {}
    }
  },

  created() {
    this.getRoesl()
    this.getCompanyInfo()
  },

  methods: {
    // 获取角色数据
    async getRoesl() {
      const arr = await getRoeslApi(this.Roeslpromise)
      this.tableData = arr.rows
      this.total = arr.total
      console.log(arr)
    },
    // 获取的公司的信息
    async getCompanyInfo() {
      this.formData = this.formData = await getCompanyInfo(
        this.$store.state.user.userInfo.companyId
      )
    },
    // 添加弹框
    appClick() {
      this.dialogVisible = true
    },
    // 取消弹框
    noClose() {
      this.dialogVisible = false
    },
    // 关闭弹层
    closes() {
      this.addRoleForm = {
        name: '',
        description: ''
      }
    },
    // 确定
    async onAddRole() {
      await this.$refs.form.validate()
      await addRoeslApi(this.addRoleForm)
      this.$message.success('添加成功')
      this.dialogVisible = false
      this.getRoesl()
    },
    // 删除
    onRemove(row) {
      this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        console.log(row)
        await RemoveRoeslApi(row.id)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getRoesl()
      })
    },
    // 切换页
    currentChange(val) {
      this.Roeslpromise.page = val
      this.getRoesl()
    },
    // 改变页数
    sizeChange(val) {
      this.Roeslpromise.pagesize = val
    }
    // tablestyle({ row, column, rowIndex, columnIndex }) {
    //   console.log(row, column, rowIndex, columnIndex)
    // }
  }
}
</script>

<style scoped>
.app-bun {
  height: 60px;
}
.pagination {
  height: 60px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
