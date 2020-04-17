module.exports = {
  plugins: {
    'postcss-import': {}, // 1. vuecli自带 带@import 引入
    'postcss-url': {}, // 2. vuecli自带
    // autoprefixer: {}, // 3. cssnano中包含此功能 任意注释一个
    'postcss-write-svg': {
      utf8: false
    }, // 4. 这个东西是通过border-image,background-image来直接画svg 我试了下感觉css2svg还是有学习成本 我打算还是用伪类+transform来算了
    'postcss-cssnext': {}, // 5. 使用下一代css新特性
    cssnano: {
      preset: 'advanced',
      autoprefixer: true, // 同上3
      'postcss-zindex': false
    },
    'postcss-px-to-viewport': {
      viewportWidth: 375, // 视口宽度，对应的是我们设计稿的宽度，一般是750
      // viewportHeight: 1334, // 视口高度
      unitPrecision: 3, // 单位精度
      viewportUnit: 'vw', // 单位名称
      selectorBlackList: [
        '.ignore',
        '.hairlines'
      ], // 配置白名单拥有该类名的元素保留px单位
      minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
      mediaQuery: false // 允许在媒体查询中转换`px`
    },
    'postcss-viewport-units': {
      filterRule: rule =>
        rule.selector.indexOf('::after') === -1 &&
        rule.selector.indexOf('::before') === -1 &&
        rule.selector.indexOf(':after') === -1 &&
        rule.selector.indexOf(':before') === -1
    } // 6. 自动添加content属性 （但是注意使用伪类的里面同时带了after,before，需要排除）
  }
}
