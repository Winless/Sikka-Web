// admin 配置
const ADMIN = {
  palettes: ['#f5222d', '#fa541c', '#fadb14', '#3eaf7c', '#13c2c2', '#1890ff', '#722ed1', '#eb2f96'],
  animates: require('./animate.config').preset,
  theme: {
    mode: {
      DARK: 'dark',
      LIGHT: 'light',
      NIGHT: 'night'
    }
  },
  layout: {
    SIDE: 'side',
    HEAD: 'head'
  },
  animate: {                            //动画设置
    disabled: false,                    //禁用动画，true:禁用，false:启用
    name: 'lightSpeed',                     //动画效果，支持的动画效果可参考 ./animate.config.js
    direction: 'right'                   //动画方向，切换页面时动画的方向，参考 ./animate.config.js
  },
}

module.exports = ADMIN
