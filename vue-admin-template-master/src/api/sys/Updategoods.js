import request from '@/utils/request'

export default {
  /**
   * 更新指定 ID 商品的信息
   * @param {Object} updateData - 包含商品更新信息的数据对象，例如 { goodsname: '新名称', price: 100,... }
   * @returns {Promise} 返回一个 Promise 对象，表示更新操作的结果
   */
  updateGoods(updateData) {
    const formData = new FormData()
    for (const key in updateData) {
      formData.append(key, updateData[key])
    }
    return request({
      url: '/goods/update', // 这里调整了接口地址格式，去掉了之前的 {goodsid} 这种占位符形式，假设后端接口是这样的路径，你可按实际情况改
      method: 'post',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      return response
    }).catch((error) => {
      console.error('修改商品请求出现错误:', error)
      if (error.response) {
        const status = error.response.status
        if (status === 400) {
          alert('请求错误，请检查数据格式或登录状态')
        } else if (status === 401) {
          alert('未授权，请登录后再尝试')
        } else if (status === 403) {
          alert('权限不足，无法执行此操作')
        } else {
          alert('服务器返回错误，请查看控制台详细信息')
        }
      } else if (error.request) {
        console.error('请求发送失败，可能网络问题，请检查网络连接')
        alert('请求发送失败，请检查网络连接后再试')
      } else {
        console.error('其他错误:', error.message)
        alert('出现未知错误，请查看控制台详细信息')
      }
      return Promise.reject(error)
    })
  },
  /**
   * 根据商品 ID 获取商品详情信息
   * @param {number} goodsId - 商品 ID
   * @returns {Promise} 返回一个 Promise，成功时 resolve 商品详情数据，失败时 reject 错误信息
   */
  getGoodsById(goodsId) {
    return request({
      url: `/goods/${goodsId}`, // 确保根据实际 API 路径调整
      method: 'get'
    }).then((response) => {
      return response.data // 返回商品详情数据
    }).catch((error) => {
      console.error('获取商品详情请求出现错误:', error)
      if (error.response) {
        const status = error.response.status
        if (status === 400) {
          alert('请求错误，请检查数据格式或登录状态')
        } else if (status === 404) {
          alert('商品未找到，请检查商品 ID')
        } else {
          alert('服务器返回错误，请查看控制台详细信息')
        }
      } else if (error.request) {
        console.error('请求发送失败，可能网络问题，请检查网络连接')
        alert('请求发送失败，请检查网络连接后再试')
      } else {
        console.error('其他错误:', error.message)
        alert('出现未知错误，请查看控制台详细信息')
      }
      return Promise.reject(error) // 传播错误
    })
  }
}
