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
  addMerchant(addMerchantFrom) {
    const formData = new FormData();
    formData.append('merchantId', addMerchantFrom.merchantId)
    formData.append('merchantName', addMerchantFrom.merchantName)
    formData.append('merchantIntital', addMerchantFrom.merchantIntital)
    formData.append('merchantCorrelation', addMerchantFrom.merchantCorrelation)
    formData.append('merchantRanking', addMerchantFrom.merchantRanking)
    formData.append('merchantShow', addMerchantFrom.merchantShow)
    return request({
      url: '/addMerchant',
      method: 'post',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  getMerchantById(merchantId) {
    return request({
      url: `/getMerchant/${merchantId}`,
      method: 'get'
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
      url: `/searchMerchantsByShow/${merchantShow}`,  // 确保这里使用反引号
      method: 'get'
    });
  }
}
