import regeneratorRuntime from "../../lib/runtime/runtime";
import { openSetting, getSetting, chooseAddress } from "../../utils/async";
import { getStorageCart,setStorageCart,getStorageAddress,setStorageAddress } from "../../utils/storage";


Page({
  data: {
    address: {}, //添加的数据
    cart: {}, //购物车数据
    isAllChecked: false, 
    totalPrice: 0,
    totalNum: 0,
    hasGoods:false
  },

  onLoad: function(options) {},

  onShow() {
    const address = getStorageAddress() || {};
    const cart = getStorageCart() || {};
    this.setData({ address, cart });
    this.setCart(cart);
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
  },

  // 商品复选框事件
  handleCartCheck(e) {
    console.log(e,"商品复选框事件");
    const { id } = e.currentTarget.dataset;//根据id获取数据
    let { cart } = this.data;
    cart[id].checked = !cart[id].checked; // 选中取反
    this.setCart(cart); // 重新计算，全选状态
  },

  // 根据cart对象来计算总价格
  setCart(cart) {
    let cartArr = Object.values(cart); // 把的对象中的值 提取出来 变成一个数组 
    // 1 计算全选
    let isAllChecked = true;
    // 2 计算要购买的总数量
    let totalNum = 0;
    // 3 计算总价格
    let totalPrice = 0;
    cartArr.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price;
        totalNum += v.num;
      } else {
        isAllChecked = false;
      }
    });
    // 判断购物车中有没有数据
    isAllChecked = cartArr.length === 0 ? false : isAllChecked;
    // 判断购物车中有没有商品
    const hasGoods = cartArr.length ? true : false;
    this.setData({ cart, isAllChecked, totalPrice, totalNum, hasGoods });
    setStorageCart(cart);
  }
});
