import { request } from "../../request/index.js";
//Page Object
Page({
  data: {
    leftList: [],
    rightList: [],
    currentIndex:0
  },

  // 接口的返回值  数组格式  
  Cates:[],//页面中不需要用的数据不要放在data里面，会损耗性能
  //options(Object)
  onLoad: function(options) {
    this.getCategory();
  },

  // 获取列表数据接口
  getCategory() {
    request({ url: "/categories" }).then(result => {
      // 把接口的数据，赋值给全局变量
      this.Cates = result;
      const leftList = this.Cates.map(v => ({
        cat_id: v.cat_id,
        cat_name: v.cat_name
      }));
      const rightList=this.Cates[0].children
      this.setData({
        leftList,
        rightList
      })
    });
  },

  // 左侧菜单点击事件
  handleMenuChange(e) {
    console.log(e,'点击获取索引');
    const { index } = e.currentTarget.dataset;
    const rightList = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightList,
      scrollTop:0 // 点击切换刷新后，从其他地方回到顶部开始
    })
  }
});
