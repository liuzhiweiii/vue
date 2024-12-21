import request from '@/utils/request'
export default {

    getUserList(){
        return request({
            url:'/getUsers',
            method:'get',
        })
}
}