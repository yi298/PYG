import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime";

Page({
  data: {
    goodsInfo:{}
  },

  // 全局的商品对象
  GoodsObj:{},

  // 页面监听
  onLoad: function(options) {
    this.getGoodsInfo(options.goods_id);  // 记得需要写参数
  },
 
  // 获取商品详情数据
  async getGoodsInfo(goods_id) {
    const result = await request({ url: "/goods/detail", data: { goods_id } });
    console.log(result, '商品详情数据');
    this.GoodsObj = result;
    this.setData({
      goodsInfo: {
        goods_name: result.goods_name,
        goods_price: result.goods_price,
        pics:result.pics,
        goods_introduce: result.goods_introduce.replace(/\.webp/g,'.jpg')
      }
    })
  },

  // 轮播图放大预览事件
  handlePreviewImage(e) {
    console.log(e, '图片放大预览');
    const { index } = e.currentTarget.dataset;
    const urls = this.data.goodsInfo.pics.map(v => v.pics_big);
    const current = urls[index];
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  }
});
  