import request from '@/utils/request';

export default {
  getMerchantList() {
    return request({
      url: '/getMerchants',
      method: 'get'
    });
  },
  searchMerchantList(input) {
    return request({
      url: '/searchMerchants/{input}',
      method: 'get',
      params: { search: input }
    });
  },
  addMerchant(merchant) {
    return request({
      url: '/addMerchant',
      method: 'post',
      data: merchant
    });
  },
  deleteMerchant(id) {
    return request({
      url: `/deleteUsers/${id}`,
      method: 'delete'
    })
  },
  searchMerchantsByShow(merchantShow) {
    return request({
      url: `/searchMerchantsByShow/${merchantShow}`,
      method: 'get'
    });
  }
}
