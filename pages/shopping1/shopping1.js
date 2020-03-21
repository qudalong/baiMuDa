import {
  floatOpration
} from '../../utils/util.js'
import {
  request
} from '../../utils/request.js'
const multi = floatOpration.multi;
const add = floatOpration.add;
Page({
  go() {
    wx.navigateTo({
      url: '../3/3',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    selectFoods: [],
    navActive: 0,
    heightArr: [],
    containerH: 0,
    totalMoeny: 0,
    totalCount: 0,
    closeShadow: false,
    showDetails: false
  },
  onLoad: function(options) {
    request({
      url: 'https://mp.ucloudant.com/app/index.php?i=56&t=0&v=9.2&from=wxapp&c=entry&a=wxapp&do=Dishes&m=zh_dianc&sign=819fcd817f0aeb118075924d12978351&id=5&dishes_type=2',
    }).then(res => {
      this.setData({
        list: res.data
      })
    }).then(() => {
      let query = wx.createSelectorQuery();
      let heightArr = [];
      let s = 0;
      // 获取每个分类高度
      query.selectAll('.pesticide').boundingClientRect((react) => {
        react.forEach((res) => {
          s += res.height;
          heightArr.push(s)
        });
        this.setData({
          heightArr: heightArr
        })
      });
      query.select('.content').boundingClientRect((res) => {
        // 计算容器高度
        this.setData({
          containerH: res.height
        })
      }).exec()
    })
  },

  closeShadow() {
    this.setData({
      closeShadow: false
    })
  },

  showCartList() {
    if (this.data.selectFoods.length) {
      this.setData({
        closeShadow: true
      })
    }
  },

  //清空购物车
  clearShopCart() {
    let data = this.data.list;
    let goods = this.data.selectFoods;

    let typeOneIndex, goodIndex;
    for (let i = 0; i < goods.length; i++) {
      typeOneIndex = goods[i].typeOneIndex;
      goodIndex = goods[i].goodIndex;
      data[typeOneIndex].goods[goodIndex].count = 0;
      data[typeOneIndex].typeItemCount = 0;
    }

    this.setData({
      selectFoods: [],
      list: this.data.list,
      totalMoney: 0,
      totalCount: 0
    })
  },

  //左边点击联动
  chooseType(e) {
    const id = e.currentTarget.dataset.id
    const index = e.currentTarget.dataset.index;
    this.setData({
      toView: id,
      navActive: index
    })
  },


  //选择商品
  onStepperEvent(e) {
    let {
      typeOneIndex,
      goodIndex,
      goodId,
      xsNum,
      goodOne,
      goodCount
    } = e.detail
    let {
      list,
      selectFoods
    } = this.data
    let typeGood = list[typeOneIndex]
    let good = list[typeOneIndex].goods[goodIndex]
    let itemCount = 0
    //在这里改变自定义count的值
    list[typeOneIndex].goods[goodIndex].count = goodCount
    typeGood.goods.forEach((good) => {
      itemCount += good.count || 0
    })
    //添加属性要传的属性
    typeGood.typeItemCount = itemCount

    good.typeOneIndex = typeOneIndex;
    good.goodIndex = goodIndex;
    if (selectFoods.includes(good)) {
      let index = selectFoods.indexOf(good)
      // 当前商品为0是清空
      goodCount === 0 ? selectFoods.splice(index, 1) : selectFoods[index].count = goodCount
    } else {
      selectFoods.push(good)
    }
    this.setData({
      list,
      selectFoods
    })
    this.calculateMoney(selectFoods)
  },

  /*计算价格和总数量*/
  calculateMoney(selectFoods) {
    let totalMoney = 0;
    let totalCount = 0;
    let price = 0;
    for (let i = 0; i < selectFoods.length; i++) {
      price = Number(selectFoods[i].money);
      totalMoney = add(totalMoney, multi(price, selectFoods[i].count));
      totalCount += selectFoods[i].count;
    }
    this.setData({
      totalMoney,
      totalCount
    });
  },

  //右边滚动联动
  onScroll(e) {
    let scrollTop = e.detail.scrollTop;
    let scrollArr = this.data.heightArr;
    if (scrollTop >= scrollArr[scrollArr.length - 1] - this.data.containerH) {
      return
    } else {
      for (let i = 0; i < scrollArr.length; i++) {
        if (scrollTop >= 0 && scrollTop < scrollArr[0]) {
          this.setData({
            navActive: 0
          })
        } else if (scrollTop >= scrollArr[i - 1] && scrollTop < scrollArr[i]) {
          this.setData({
            navActive: i
          })
        }
      }
    }
  },


  onReady: function() {

  },
  onHide: function() {
    console.log('onhide')
    wx.showModal({
      title: '',
      content: '确认前进吗',
    })
  },
  onShow: function() {
    console.log('onShow')
  },
  onUnload: function() {
    console.log('onunload')
    wx.showModal({
      title: '',
      content: '确认返回吗',
    })
  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  },
  closeShowDetails: function () {
    this.setData({
      showDetails: !this.data.showDetails
    });
  },
  showDetails: function (e) {
    const descImg=e.currentTarget.dataset.img;
    this.setData({
      descImg,
      showDetails: true
    });
  }
})