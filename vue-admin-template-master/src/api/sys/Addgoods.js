// src/api/sys/Addgoods.js

import request from '@/utils/request'

export default {
  addGoods(goodsData) {
    console.log('提交的数据:',JSON.stringify(goodsData))
    return request({
      url: '/api/goods/add', // 确保与后端路径一致
      method: 'post',
      data: goodsData, // 使用 data 来传递商品信息
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      return response
    }).catch((error) => {
      console.log('请求错误:', error)
      if (error.response) {
        console.error('服务器响应错误:', error.response.data)
        // 输出更多的响应信息
        console.error('请求数据:', error.request)
      } else if (error.request) {
        console.error('请求发送失败:', error.request)
      } else {
        console.error('其他错误:', error.message)
      }
      return Promise.reject(error)
    })
  }
}
