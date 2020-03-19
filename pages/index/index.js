//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
		list:[1,1,1,1,1]
	},
	onPullDownRefresh: function () {
		// wx.showLoading({
		// 	title: '刷新中...'
		// });
	}
})
