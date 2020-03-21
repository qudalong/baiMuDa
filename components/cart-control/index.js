// components/cart-contart/index.js
Component({
  /**
   * 组件的属性列表
   */
  // < v - cart - control typeOneIndex = '{{typeOneIndex}}'  goodId = '{{good.id}}' xsNum = '{{good.xs_num}}' > </v-cart-control>
  properties: {
    typeOneIndex: {
      type: Number,
      value: 0,
      desc: '一级索引'
    },
    goodIndex: {
      type: Number,
      value: 0,
      desc: '二级索引'
    },
    goodId: {
      type: Number,
      value: 0,
      desc: '商品id'
    },
    xsNum: {
      type: Number,
      value: 0,
      desc: '库存'
    },
    goodOne: {
      type: Number,
      value: 0,
      desc: '单个商品数量'
    },
    goodCount: {
      type: Number,
      value: 0,
      desc: '单个商品数量'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {},

  /**
   * 组件的方法列表
   */
  methods: {
    add() {
      // let typeOneIndex = this.properties.typeOneIndex
      // let goodIndex = this.properties.goodIndex
      // let goodId = this.properties.goodId
      // let xsNum = this.properties.xsNum
      // let goodOne = this.properties.goodOne
      // let goodCount = this.properties.goodCount
      let {typeOneIndex, goodIndex, goodId, xsNum, goodOne, goodCount} = this.data
      goodCount ++
      this.setData({
        goodCount
      });
      let myEventDetail = {
        typeOneIndex,
        goodIndex,
        goodId,
        xsNum,
        goodOne,
        goodCount
      }
      //激活自定义事件
      this.triggerEvent('stepperEvent', myEventDetail)
    },

    minus() {
      let { typeOneIndex, goodIndex, goodId, xsNum, goodOne, goodCount } = this.data
      if (goodCount<=0){
        return
      }
      goodCount--
      this.setData({
        goodCount
      });

      let myEventDetail = {
        typeOneIndex,
        goodIndex,
        goodId,
        xsNum,
        goodOne,
        goodCount
      }
      //激活自定义事件
      this.triggerEvent('stepperEvent', myEventDetail)
    }
  }
})