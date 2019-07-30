// 引入接口文件
import { request } from "../../request/index.js"

Page({
  data: {
    // 轮播图数据
    swiperList: [],
    // 导航菜单数据
    CatItemsList:[]
  },
  
  // 生命周期
  onLoad() {
    this.getSwiperList();
    this.getCatItemsList()
  },

  // 获取轮播图数据
  getSwiperList() {
    request({ url: '/home/swiperdata' })
      .then((result) => {
        this.setData({
          swiperList:result
      })
    })
  },

  // 获取导航菜单数据
  getCatItemsList() {
    request({ url: '/home/catitems' })
      .then((result) => {
        this.setData({
          CatItemsList:result
      })
    })
  }
});
  