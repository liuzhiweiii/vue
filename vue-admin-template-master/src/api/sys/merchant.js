import request from '@/utils/request'
export default {
  getMerchantList() {
    return request({
      url: '/getMerchants',
      method: 'get'
    })
  }
}
