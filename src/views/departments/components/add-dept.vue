<template>

  <el-dialog :title="showTitle" :visible="visible" width="50%" @close="btnCancel">
    <el-form ref="deptForm" :model="formData" :rules="formRules" label-width="100px">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" placeholder="输入部门名称" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:100%" placeholder="输入部门编码" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select
          v-model="formData.manager"
          style="width: 80%"
          placeholder="请选择"
          @focus="getEmployeeSimple"
        >
          <el-option
            v-for="item in EmployeeList"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          /></el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="formData.introduce" placeholder="输入部门介绍" type="textarea" />
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click.native="btnCancel">取 消</el-button>
      <el-button type="primary" @click.native="btnOK">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getDeptsApai, getEmployeeSimple, addDepartments, getDepartDetail, redactDepartDetail } from '@/api/departments'
export default {

  // 组件
  components: {

  },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    treenodes: {
      type: Object,
      required: true
    }
  },
  // 数据
  data() {
    // 现在定义一个函数 这个函数的目的是 去找 同级部门下 是否有重复的部门名称
    const checkNameRepeat = async(rule, value, callback) => {
      // 先要获取最新的组织架构数据
      // depts是所有的部门数据
      // 如何去找技术部所有的子节点
      const { depts } = await getDeptsApai()
      let isRepeat
      if (this.formData.id) {
        // 有id就是编辑模式
        // 编辑 张三 => 校验规则 除了我之外 同级部门下 不能有叫张三的
        isRepeat = depts.filter(item => item.id !== this.formData.id && item.pid === this.treeNode.pid).some(item => item.name === value)
      } else {
        isRepeat = depts.some(item => item.name === value)
      }
      isRepeat ? callback(new Error(`同级部门下已经有${value}的部门了`)) : callback()
    }
    // 检查编码重复
    const checkCodeRepeat = async(rule, value, callback) => {
      // 先要获取最新的组织架构数据
      let isRepeat
      const { depts } = await getDeptsApai()
      if (this.formData.id) {
        isRepeat = depts.filter(item => item.id !== this.formData.id).some(item => item.code === value)
      } else {
        isRepeat = depts.some(item => item.code === value && value) // 这里加一个 value不为空 因为我们的部门有可能没有code
      }

      isRepeat ? callback(new Error(`组织架构中已经有部门使用${value}编码`)) : callback()
    }
    return {
      formData: {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      },
      // 定义校验规则
      formRules: {
        name: [
          { required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' },
          {
            trigger: 'blur',
            validator: checkNameRepeat // 自定义函数的形式校验
          }],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' },
          {
            trigger: 'blur',
            validator: checkCodeRepeat
          }
        ],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-50个字符' }]
      },
      EmployeeList: []
    }
  },
  // 计算属性
  computed: {
    showTitle() {
      return this.formData.id ? '编辑部门' : '新增子部门'
    }
  },

  // 创建后
  created() {
  },

  // 函数
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 负责人列表
    async  getEmployeeSimple() {
      this.EmployeeList = await getEmployeeSimple()
    },
    // 点击确定时触发
    btnOK() {
      this.$refs.deptForm.validate(async isOK => {
        if (isOK) {
          // 表示可以提交了
          if (this.formData.id) {
            await redactDepartDetail(this.formData)
          } else {
            await addDepartments({ ...this.formData, pid: this.treenodes.id }) // 调用新增接口 添加父部门的id
          }
          this.$emit('refresh')
          this.$emit('update:visible', false)
        }
      })
    },
    btnCancel() {
      this.$emit('update:visible', false) // 关闭
      this.$refs.deptForm.resetFields() // 重置校验字段
      this.formData = {
        name: '',
        code: '',
        manager: '',
        introduce: ''
      }
    },
    // 获取部门详情
    async  getDepartDetail(id) {
      this.formData = await getDepartDetail(id)
    }
  }
}

</script>

<style scoped>

</style>
