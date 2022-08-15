import PageTools from '@/components/PageTools'
import UploadExcel from '@/components/UploadExcel'
import Uploadimg from '@/components/Uploadimg'
const components = [PageTools, UploadExcel, Uploadimg]
export default {
  install(Vue) {
    components.forEach(component => {
      Vue.component(component.name, component)
    })
  }
}
