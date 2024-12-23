// src/api/sys/goods.js

import request from '@/utils/request'

export default {
  /**
   * 获取商品列表，支持筛选条件
   * @param {Object} params - 查询参数
   * @param {string} [params.goodsname] - 商品名称
   * @param {number} [params.goodsid] - 商品ID
   * @param {boolean} [params.isOnShelf] - 上架状态 (true: 已上架, false: 未上架)
   * @param {boolean} [params.isNew] - 新品状态 (true: 是新品, false: 非新品)
   * @param {boolean} [params.isRecommended] - 推荐状态 (true: 推荐, false: 不推荐)
   * @param {number} [params.currentPage] - 当前页码
   * @param {number} [params.pageSize] - 每页大小
   * @returns {Promise} 返回包含商品列表的 Promise 对象
   */
  getGoodsList(params = {}) {
    console.log('发送的商品列表查询参数:', params) // 打印出发送的查询参数

    return request({
      url: '/getGoods',
      method: 'get',
      params: params // 将筛选条件作为查询参数发送给后端
    }).then(response => {
      console.log('接收到的商品列表数据:', response) // 打印出接收到的数据
      return response
    })
  },

  /**
   * 删除指定 ID 的商品
   * @param {number} goodsid - 商品 ID
   * @returns {Promise} 返回一个 Promise 对象，表示删除操作的结果
   */
  deleteGoods(goodsid) {
    return request({
      // eslint-disable-next-line no-undef
      url: `/goods/${goodsid}`,
      method: 'delete'
    })
  }
}
