// 封装所有项目中用到本地存储的代码

// 获取分类商品数据到本地存储
export const getStorageCate = () => {
  return wx.getStorageSync("cate")
}
// 设置分类商品数据到本地存储中
export const setStorageCate = (obj) => {
  wx.setStorageSync("cate", obj);
}


// 获取本地存储中购物车的数据
export const getStorageCart = () => {
  return wx.getStorageSync("cart"); 
}
// 设置购物车到本地存储中   obj 要填充的数据
export const setStorageCart = (cart) => {
  wx.setStorageSync("cart", cart);
}


// 获取本地存储中地址的数据
export const getStorageAddress = () => {
  return wx.getStorageSync("address"); 
}
// 设置地址到本地存储中   address 要填充的数据
export const setStorageAddress = (address) => {
  wx.setStorageSync("address", address);
}