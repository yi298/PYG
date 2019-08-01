// pages/goods_list/index.js
import { request } from "../../request/index.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 传给tabs子组件的数据
    tabs: [
      { id: 0, title: "综合", isActive: true },
      { id: 1, title: "销量", isActive: false },
      { id: 2, title: "价格", isActive: false }
    ],
    // 页面要渲染的商品数组
    goodsList: []
  },

  // 接口用的参数
  QueryParams: {
    query: "", //搜索的关键字
    cid: "", //分类id
    pagenum: 1, //页码
    pagesize: 10 //页容量
  },
  // 总页数
  TotalPages:1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options,'onLoad');
    this.QueryParams.cid = options.cid; // 接收url传递过来的参数,给全局参数赋值
    this.getGoodsList(); //发送获取商品列表数据的请求
  },

  /**
   * 子组件触发的自定义事件
   */
  handleItemChange(e) {
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) =>
      i === index ? (v.isActive = true) : (v.isActive = false)
    );
    this.setData({ tabs });
  },

  // 获取商品列表数据
  getGoodsList() {
    request({ url: "/goods/search",data:this.QueryParams})
      .then((result) => {
        console.log(result, '获取商品列表数据');
        // 计算总页数
        this.TotalPages = Math.ceil(result.total / this.QueryParams.pagesize);
        this.setData({
          // 拼接数组
          goodsList:[...this.data.goodsList,...result.goods]
        })
        
      })
  }
});
