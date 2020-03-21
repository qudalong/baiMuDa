//index.js
//获取应用实例
const app = getApp()
import {
	request
} from '../../utils/request.js'
Page({
  data: {
		list:[1,1,1,1,1]
	},
	onLoad: function(options) {
		this.getData()
	},
	getData() {
		request({
			url: 'https://mp.ucloudant.com/app/index.php?i=56&t=0&v=9.2&from=wxapp&c=entry&a=wxapp&do=Dishes&m=zh_dianc&sign=819fcd817f0aeb118075924d12978351&id=5&dishes_type=2',
		}).then(res => {
			this.setData({
				list: res.data[0].goods
			})
		})
	},
	onPullDownRefresh: function () {
		// wx.showLoading({
		// 	title: '刷新中...'
		// });
	}
})
