// src/api/sys/Addgoods.js

import request from '@/utils/request'
export default {
  addGoods(goodsData) {
    return request({
      // url: process.env.VUE_APP_BASE_API + '/addGoods',
      url: '/add/addGoods',
      method: 'post',
      data: goodsData,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      return response
    }).catch((error) => {
      console.log('请求错误:', error)
      if (error.response && error.response.status === 400) {
        alert('请求错误，请检查数据格式或登录状态')
      }
      return Promise.reject(error)
    })
  }
}

