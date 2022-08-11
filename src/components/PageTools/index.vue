<template>
  <el-card class="box-card">
    <el-row type="flex" class="row-bg">
      <el-col>
        <el-tag v-if="isShowLeft" size="medium" closable>
          <i :class="icon" />
          <slot name="left-tag" />
        </el-tag>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <slot name="right" />
        </el-row>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>

export default {
  name: 'PageTools',
  // 组件
  components: {

  },
  props: {
    icon: {
      type: String,
      default: 'el-icon-info'
    },
    isShowLeft: {
      type: String,
      default: 'true'
    }
  },
  // 数据
  data() {
    return {

    }
  },

  // 计算属性
  computed: {

  },

  // 创建后
  created() {

  },

  // 函数
  methods: {

  }

}
</script>

<style scoped>

</style>
