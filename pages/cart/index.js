import regeneratorRuntime from "../../lib/runtime/runtime";
import {openSetting,getSetting,chooseAddress} from "../../utils/async"

Page({
  data: {},

  onLoad: function(options) {},

  // 添加添加收货地址
  async handleChooseAddress() {
    // wx.getSetting获取授权信息
    const result1 = await getSetting();
    const scopeAddress = result1.authSetting["scope.address"]; // 是否授权通讯地址，对应接口 wx.chooseAddress 属性
    if (scopeAddress === true || scopeAddress === undefined) {
      // 已经授权 并 空地址 =》wx.chooseAddress 获取收货地址
      const result2 = await chooseAddress();
      console.log(result2);
    } else {
      // 还没授权 =》 打开授权页面
      await openSetting();
      // 直接调用收货地址
      const result2 = await chooseAddress();
      console.log(result2);
    }
  }
});
