<script>
export default {
  name: 'MenuItem',
  // 只含有script和style也是组件，因为里面含有functional: true，是函数式组件
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  // 渲染函数，第2个参数context是当前上下文
  render(h, context) {
    // context.props是接收刚刚传过来的icon, title
    const { icon, title } = context.props
    const vnodes = []

    if (icon) {
      if (icon.includes('el-icon')) {
        vnodes.push(<i class={[icon, 'sub-el-icon']} />)
      } else {
        // 渲染了一个svg图标，只需要传入icon的名字即可
        vnodes.push(<svg-icon icon-class={icon}/>)
      }
    }

    if (title) {
      vnodes.push(<span slot='title'>{(title)}</span>)
    }
    // 返回渲染节点
    return vnodes
  }
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}
</style>
