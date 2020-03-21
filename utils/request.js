var app = getApp();
var host = 'https://parking.ciccv.cn/';

function request({url,data={},method='GET'}){
     return new Promise(function(resolve,reject){
       _request(url, resolve, reject, data, method)
     })
}

function _request(url, resolve, reject, data = {}, method = 'GET') {
  wx.request({
    // url: host + url,
    url: url,
    header: {
      "content-type": "application/json"
    },
    data: data,
    method: method,
    success: res => {
      resolve(res)
    },
    fail: () => {
      reject('接口请求失败')
    },
    complete: () => {
      wx.hideLoading();
    }
  })
}

module.exports = {
  request
}