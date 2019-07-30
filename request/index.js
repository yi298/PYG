// 封装公共请求接口
export const request = params => {
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
      }
    });
  });
};
