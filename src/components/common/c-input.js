import {
  Input
} from "element-ui"

/* 
    扩展el-input功能
    对聚焦和失焦添加样式控制
*/
export default {
  name: 'cInput',
  mixins: [Input],
  created() {
    this.$on('focus', v => {
      let dom = v.target.parentNode
      dom.classList.add('is-focus')
    })
    this.$on('blur', v => {
      let dom = v.target.parentNode
      dom.classList.remove('is-focus')
    })
  }
}
