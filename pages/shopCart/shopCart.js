import Dialog from '../../miniprogram_npm/vant-weapp/dialog/dialog';
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		cart: [],
		cartNumber: 0,
		selectAllStatus: false,
		totalMoney:0
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function(options) {

	},
	//删除订单
	delOrder(e) {
		// let id = e.currentTarget.dataset.id;
		Dialog.confirm({
			message: '确定要删除该订单吗?'
		}).then(() => {
			return
			request({
				token: app.globalData.token.prefix + app.globalData.token.token,
				url: `orders/${id}`,
				method: 'delete',
				data: {}
			}).then(res => {
				if (res.data.code == 200) {
					wx.showToast({
						title: '删除成功',
						icon: 'none'
					});
					this.getOrdersList(); //更新订单
				}
			});
		}).catch(() => {});
	},

	selectItem(e) {
		const index = e.currentTarget.dataset.index;
		let selectAllStatus = this.data.selectAllStatus;
		let cart = this.data.cart;
		const selected = cart[index].selected;
		cart[index].selected = !selected;
		let ckallFlag = cart.find(item => item.selected == false)
		if (ckallFlag) {
			this.setData({
				selectAllStatus: false,
				cart
			});
		} else {
			this.setData({
				selectAllStatus: true,
				cart
			});
		}
	},

	selectAll(e) {
		let selectAllStatus = this.data.selectAllStatus;
		selectAllStatus = !selectAllStatus;
		let cart = this.data.cart;

		for (let i = 0; i < cart.length; i++) {
			cart[i].selected = selectAllStatus;
		}
		this.setData({
			selectAllStatus: selectAllStatus,
			cart: cart
		});
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function() {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function() {
		let cart = wx.getStorageSync("cart") //购物车数据
		let cartNumber = wx.getStorageSync("cartNumber") //tabbar数字
		this.setData({
			cart,
			cartNumber
		})
	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function() {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function() {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function() {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function() {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function() {

	}
})
