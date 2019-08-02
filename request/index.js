// 同时发送请求的ajax的次数
let ajaxTimes = 0;

// 封装公共请求接口
export const request = params => {
  ajaxTimes++;
  // 显示正在等待图标
  wx.showLoading({
    title: "加载中"
  });

  const baseUrl = "https://api.zbztb.cn/api/public/v1";
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: result => {
        // console.log(result);
        resolve(result.data.message);
      },
      fail: err => {
        reject(err);
      },
      complete: () => {
        ajaxTimes--;
        if(ajaxTimes===0)
        // 关闭正在等待图标
          wx.hideLoading();
        console.log(ajaxTimes);
        
      }
    });
  });
};
