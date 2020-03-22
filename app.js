//app.js
App({
	onLaunch: function() {
		//初始化购物车
		this.timer = setInterval(() => {
			this.scanCart(this)
			console.log('111111111')
		}, 100);
		this.scanCart(this);

		// 登录
		wx.login({
			success: res => {
				// 发送 res.code 到后台换取 openId, sessionKey, unionId
				wx.request({
					url: this.globalData.url + 'wechat',
					method: 'POST',
					data: {
						code: res.code
					},
					header: {
						'content-type': 'application/json;charset=utf-8'
					},
					success: res => {
						if (res.data.code == 200) {
							this.globalData.token = res.data.data.token;
							wx.setStorageSync('userOpenid', res.data.data.token.wechatUser.open_id);
							wx.setStorageSync('token', res.data.data.token);
							wx.setStorageSync('seller', res.data.data.token.wechatUser.seller);
							wx.setStorageSync('user', res.data.data.token.wechatUser.user);
							if (this.checkLoginReadyCallback) {
								this.checkLoginReadyCallback(res);
							}
						}
					}
				});
			}
		})
		// 获取用户信息
		wx.getSetting({
			success: res => {
				if (res.authSetting['scope.userInfo']) {
					// 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
					wx.getUserInfo({
						success: res => {
							// 可以将 res 发送给后台解码出 unionId
							this.globalData.userInfo = res.userInfo
							console.log(res.userInfo)

							// 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
							// 所以此处加入 callback 以防止这种情况
							if (this.userInfoReadyCallback) {
								this.userInfoReadyCallback(res)
							}
						}
					})
				}
			}
		})
	},
	globalData: {
		userInfo: null,
		token: '',
		url: 'https://shop.dnote.cn/api/v1/'
	},
	//首先定义了一个方法
	timer: false,
	scanCart: function(that) {
		//我把购物车里面的数据都塞到了缓存里，取名cart,任何一项修改购物车的行为，都会先取购物车的缓存，在重新更新缓存里的购物车参数
		//购物车
		let cartNumber = wx.getStorageSync("cartNumber")||0;
		//统计购物车商品的总数量
		// let cartnumber = 0; //购物车菜品的一共的数量

		// for (let index in cart) {
		// 	cartnumber += cart[index].one
		// }

		if (cartNumber) { //判断购物车的数量个数，购物车如果为空就走else
			wx.setTabBarBadge({ //购物车不为空 ，给购物车的tabar右上角添加购物车数量标志
				index: 2, //标志添加位置
				text: "" + cartNumber + "" //通过编译，将购物车总数量放到这里
			})
		} else { //购物车为空
			wx.removeTabBarBadge({ //移除指定位置的tabbar右上角的标志
				index: 2,
			})
		}
	}
})
