import { request } from "../../request/index.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
import { getStorageCate, setStorageCate } from "../../utils/storage.js";

//Page Object
Page({
  data: {
    leftList: [],
    rightList: [],
    currentIndex: 0,
    scrollTop: 0
  },

  // 接口的返回值  数组格式
  Cates: [], //页面中不需要用的数据不要放在data里面，会损耗性能

  //options(Object)
  onLoad: function(options) {
    // 本地存储区
    /* 【例子】wx.setStorageSync('zzz', { name: 'AAAAA' }) //存值
    let zzz = wx.getStorageSync('zzz') //取值
    console.log(zzz); // 打印出取到的值*/

    // 1、拿到缓存中的数据
    // const cates = wx.getStorageSync("cates");
    const cates = getStorageCate();
    // 2、判断有没有缓存数据
    if (!cates) {
      this.getCategory(); // 如果没有数据，发送请求
    } else {
      // 有缓存数据  判断是否过期，如果过期重新发送请求
      if (Date.now() - cates.time > 1000 * 10) {
        this.getCategory(); // 过期了
      } else {
        // 没有过期，获取缓存的数据
        const catesData = cates.data;
        // 给全局数据赋值
        this.Cates = catesData;
        // 获取左侧菜单数据
        const leftList = this.Cates.map(v => ({
          cat_id: v.cat_id,
          cat_name: v.cat_name
        }));
        // 获取右侧菜单数据
        const rightList = this.Cates[0].children;
        this.setData({
          leftList,
          rightList
        });
      }
    }
  },

  // 获取列表数据接口
  async getCategory() {
    const result = await request({ url: "/categories" });
    // 把接口的数据，赋值给全局变量
    this.Cates = result;
      // 把数据存入缓存
      // wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
      setStorageCate({time: Date.now(), data: this.Cates})
      // 获取左侧菜单数据
      const leftList = this.Cates.map(v => ({
        cat_id: v.cat_id,
        cat_name: v.cat_name
      }));
      // 获取右侧菜单数据
      const rightList = this.Cates[0].children;
      this.setData({
        leftList,
        rightList
      });
  },

  // 左侧菜单点击事件
  handleMenuChange(e) {
    console.log(e, "点击获取索引");
    const { index } = e.currentTarget.dataset;
    const rightList = this.Cates[index].children;
    this.setData({
      currentIndex: index,
      rightList,
      scrollTop: 0 // 点击切换刷新后，从其他地方回到顶部开始
    });
  }
});
