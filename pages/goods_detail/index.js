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
  }
});
  