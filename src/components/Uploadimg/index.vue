<template>
  <div>
    <el-upload
      v-loading="loading"
      element-loading-text="上传中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      action="#"
      :file-list="fileList"
      list-type="picture-card"
      :on-change="onChange"
      :http-request="oRequest"
      :on-remove="onRemove"
      :on-preview="onPreview"
      :before-upload="beforeUpload"
      :limit="1"
      class="upload"
      :class="fileList.length === 1 ? 'hideAdd' : ''"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog title="图片预览" :visible.sync="previewImgDialogVisible">
      <img style="width: 100%" :src="previewImgUrl">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDY7fLIG6j8WvfQ9oKg0MaIpRxOgHpLqhR',
  SecretKey: 'hYL5fBe0BSmDVcaL2f9RdgZJwVzKawHq'
})
export default {
  name: 'Uploadimg',
  // 组件
  components: {},
  // 数据
  data() {
    return {
      loading: false,
      fileList: [],
      previewImgDialogVisible: false,
      previewImgUrl: ''
    }
  },

  // 计算属性
  computed: {},

  // 创建后
  created() {},

  // 函数
  methods: {
    // 文件状态发生变化
    onChange(file, fileList) {
      this.fileList = fileList
    },
    // 自定义请求
    oRequest(data) {
      this.loading = true
      cos.putObject(
        {
          Bucket: 'hrsaas-26-1302962993' /* 填入您自己的存储桶，必须字段 */,
          Region: 'ap-shanghai' /* 存储桶所在地域，例如ap-beijing，必须字段 */,
          Key: data.file
            .name /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
          StorageClass: 'STANDARD',
          Body: data.file // 上传文件对象
        },
        (err, data) => {
          this.loading = false
          if (!err && data.statusCode === 200) {
            this.$emit('onSuccess', {
              url: 'https:' + data.Location
            })
          }
        }
      )
    },

    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onPreview(file) {
      this.previewImgDialogVisible = true
      this.previewImgUrl = file.url
    },
    beforeUpload(file) {
      // 要开始做文件上传的检查了
      // 文件类型 文件大小
      const types = ['image/jpeg', 'image/gif', 'image/bmp']
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      //  检查大小
      const maxSize = 5 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      return true
    }
  }
}
</script>

<style scoped lang="scss">
.hideAdd .el-upload--picture-card {
  display: none;
}
.upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
