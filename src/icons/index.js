import Vue from 'vue'
import SvgIcon from '@/components/SvgIcon'// svg component

// register globally
// 全局注册组件
Vue.component('svg-icon', SvgIcon)

// 下面三行代码的任务是 把 同级目录的 svg目录下的.svg图片引入到项目中来
// require.context(目标目录，是否扫描子目录， 正则匹配) 扫描目录中的文件  可以引入某个目录下的内容 扫描./svg目录下，不扫描子目录，所有以.svg结尾的文件
const req = require.context('./svg', false, /\.svg$/)
// 返回了req，可以控制台打印一下，看看req是什么,可以看到返回的req是个函数
console.log('1111' + req.keys())
// 把箭头函数赋值给了requireAll
const requireAll = requireContext => requireContext.keys().map(requireContext)
// 调用了requireAll函数。里面传参的req就是上面的req函数。相当于是req.keys().map
// map是数组方法，循环每一项svg图片。map(()=>{}),map里面要传一个箭头函数，req正好是一个箭头函数，作为参数传入map
requireAll(req)

// 相当于把svg下的所有的svg图片打包到了项目中
// 如果想用svg图片 就在svg目录下去寻找就可以了
