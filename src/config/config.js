// 自定义配置，参考 ./default/setting.config.js，需要自定义的属性在这里配置即可
module.exports = {
  theme: {
    color: '#8643D4',                   //主题色
    mode: 'light',                       //主题模式 可选 dark、 light 和 night
    success: '#8643D4',                 //成功色
    warning: '#faad14',                 //警告色
    error: '#FF428E',                   //错误色
  },
  animate: {
    name: 'fade',
    direction: 'default'
  },


  layout: 'head',                       //导航布局，可选 side 和 head，分别为侧边导航和顶部导航
  fixedHeader: true,                   //固定头部状态栏，true:固定，false:不固定
  fixedSideBar: true,                   //固定侧边栏，true:固定，false:不固定
  fixedTabs: false,                      //固定页签头，true:固定，false:不固定
  pageWidth: 'fixed',                   //内容区域宽度，fixed:固定宽度，fluid:流式宽度
  weekMode: false,                      //色弱模式，true:开启，false:不开启
  multiPage: false,                     //多页签模式，true:开启，false:不开启
  cachePage: false,                      //是否缓存页面数据，仅多页签模式下生效，true 缓存, false 不缓存
  hideSetting: true,                   //隐藏设置抽屉，true:隐藏，false:不隐藏
  systemName: '',                       //系统名称 Sikka
  copyright: '',                        //copyright  。2018 ICZER 工作室出品
  asyncRoutes: false,                   //异步加载路由，true:开启，false:不开启
  showPageTitle: false,                  //是否显示页面标题（PageLayout 布局中的页面标题），true:显示，false:不显示
  filterMenu: false,                    //根据权限过滤菜单，true:过滤，false:不过滤
}
