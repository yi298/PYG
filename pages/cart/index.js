import regeneratorRuntime from "../../lib/runtime/runtime";
import { openSetting, getSetting, chooseAddress } from "../../utils/async";
import { getStorageCart,setStorageCart,getStorageAddress,setStorageAddress } from "../../utils/storage";


Page({
  data: {
    address: {}, //添加的数据
    cart: {} //购物车数据
  },

  onLoad: function(options) {},

  onShow() {
    const address = getStorageAddress() || {};
    const cart = getStorageCart() || {};
    this.setData({ address, cart });
    // this.setData(cart);
  },

  // 添加添加收货地址
  async handleChooseAddress() {
    // wx.getSetting获取授权信息
    const result1 = await getSetting();
    const scopeAddress = result1.authSetting["scope.address"]; // 是否授权通讯地址，对应接口 wx.chooseAddress 属性
    if (scopeAddress === true || scopeAddress === undefined) {
      // 已经授权 并 空地址 =》wx.chooseAddress 获取收货地址
      const result2 = await chooseAddress();
    } else {
      // 还没授权 =》 打开授权页面
      await openSetting();
    }
    const result2 = await chooseAddress();
    // 把新增的地址信息存入本地存储中
    result2.all =
      result2.provinceName +
      result2.cityName +
      result2.countyName +
      result2.detailInfo;
      setStorageAddress(result2)
  }
});
