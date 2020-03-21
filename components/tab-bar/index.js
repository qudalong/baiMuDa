// components/tab-bar/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {

    //选项卡切换
    checkCurrent: function(e) {
      var currentIndex = e.currentTarget.dataset.current
      this.setData({
        currentIndex
      });
      this.triggerEvent('tab',{
        currentIndex: currentIndex
      },{})

    },

  }
})