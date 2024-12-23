// 存放后端login方法的标签
import request from '@/utils/request';

// // 登录请求
export function login(data) {
    return request({
        url: `/api/login`,
        method: 'post',
        data
    });
}
// import request from '@/utils/request'
// export default {
//     login(){
//         return request({
//             url: '/api/login',
//             method: 'post',
//         })
//     }
// }
// 注册请求
export function register(data) {
    return request({
        url: '/api/register',
        method: 'post',
        data
    });
}
