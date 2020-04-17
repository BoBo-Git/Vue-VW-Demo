# Vue VW布局适配案例

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### 用到的组件和依赖

#### 1.Vant-UI
```
npm i vant -S
```
配置自动按需引入
```
npm i babel-plugin-import -D
```
然后在 babel.config.js 中配置
```javascript
module.exports = {
  plugins: [
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
};
```

#### 2.VW 适配用到的库
第一步：
```
npm i postcss-aspect-ratio-mini postcss-px-to-viewport postcss-write-svg postcss-cssnext postcss-viewport-units cssnano postcss-import postcss-url   --S
```

第二步：
还需要安装
```
npm i cssnano-preset-advanced --save-dev
```

第三步：
配置 postcss.config.js 文件
```javascript
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
```

第四步：
对于较老机型或浏览器 VW 的兼容处理
在 index.html 引入
```html
<script src="//g.alicdn.com/fdilab/lib3rd/viewport-units-buggyfill/0.6.2/??viewport-units-buggyfill.hacks.min.js,viewport-units-buggyfill.min.js"></script>

<script>
  window.onload = function () {
      window.viewportUnitsBuggyfill.init({
      hacks: window.viewportUnitsBuggyfillHacks
      });

    /* var winDPI = window.devicePixelRatio;
      var uAgent = window.navigator.userAgent;
      var screenHeight = window.screen.height;
      var screenWidth = window.screen.width;
      var winWidth = window.innerWidth;
      var winHeight = window.innerHeight;

      alert(
          "Windows DPI:" + winDPI +
          ";\ruAgent:" + uAgent +
          ";\rScreen Width:" + screenWidth +
          ";\rScreen Height:" + screenHeight +
          ";\rWindow Width:" + winWidth +
          ";\rWindow Height:" + winHeight
      )   */
      //注释代码可以看出你设备的信息，没用的，主要是上面的那一段
  }
</script>
```
或者
```
npm i viewport-units-buggyfill -S
```
然后在 main.js 中引用
```javascript
let hacks = require('viewport-units-buggyfill/viewport-units-buggyfill.hacks')
require('viewport-units-buggyfill').init({
  hacks: hacks
})
```

第五步：
给全局 img 标签添加属性
```css
img {
  content: normal !important;
}
```

第六步：
如果运行有关于 Browser 的报错，检查 .browserslistrc 文件，删除
```
not dead
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
