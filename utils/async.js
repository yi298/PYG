// wx.openSetting打开授权有页面
export const openSetting = () => {
  return new Promise((resolve, reject) => {
    wx.openSetting({
      success: result => {
        resolve(result);
      },
      fail: err => {
        reject(err);
      }
    });
  });
};

// wx.getSetting获取授权信息
export const getSetting = () => {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: result => {
        resolve(result);
      },
      fail: err => {
        reject(err);
      }
    });
  });
}

// wx.chooseAddress 获取收货地址
export const chooseAddress = () => {
  return new Promise((resolve, reject) => {
    wx.chooseAddress({
      success: result => {
        resolve(result);
      },
      fail: err => {
        reject(err);
      }
    });
  });
}
