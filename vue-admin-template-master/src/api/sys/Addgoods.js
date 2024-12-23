import request from '@/utils/request'

export default {
  addGoods(goodsData) {
    const formData = new FormData()
    for (const key in goodsData) {
      formData.append(key, goodsData[key])
    }
    return request({
      url: '/add/addGoods',
      method: 'post',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then((response) => {
      return response
    }).catch((error) => {
      console.error('添加商品请求出现错误:', error)
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
  }
}
