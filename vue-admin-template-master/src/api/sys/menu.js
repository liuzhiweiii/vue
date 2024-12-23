// // import request from '@/utils/request'
// // export default {
// //     getUserList(){
// //         return request({
// //             url: '/getAllmenu',
// //             method: 'get',
// //         })
// //     }
// // }
// import request from '@/utils/request'; // 假设使用了 axios 作为请求库

// export default {
//   getMenuByOne() {
//     return request({
//       url: '/getMenuByOne',
//       method: 'get'
//     });
//   },
// //   getMenuBySecond(parentId) {
// //     return request({
// //       url: '/getMenuBySecond',
// //       method: 'get',
// //       params: { level: parentId }  // 根据需要调整参数
// //     });
// //   }
// };
// // api/menu.js
// export function getMenuBySecond(level) {
//   return request({
//     url: `/getMenuBySecond/${level}`, // 将 level 作为路径参数
//     method: 'get',
//   });
// }

import request from '@/utils/request'; // 假设使用了 axios 作为请求库

export default {
  // 获取一级菜单
  getMenuByOne() {
    return request({
      url: '/getMenuByOne',
      method: 'get'
    });
  },

  // // 获取二级菜单
  // getMenuBySecond1() {
  //   return request({
  //     url: `/getMenuBySecond/1`,
  //     method: 'get'
  //   });
  // },
  // getMenuBySecond2() {
  //   return request({
  //     url: `/getMenuBySecond/2`, 
  //     method: 'get'
  //   });
  // },
  // getMenuBySecond3() {
  //   return request({
  //     url: `/getMenuBySecond/3`, 
  //     method: 'get'
  //   });
  // },
  // getMenuBySecond4() {
  //   return request({
  //     url: `/getMenuBySecond/4`, 
  //     method: 'get'
  //   });
  // },
  // 获取所有菜单
  findAll() {
    return request({
      url: '/findAll',
      method: 'get'
    });
  },

  // 根据 ID 获取菜单
  findById(id) {
    return request({
      url: `/findById/${id}`,
      method: 'get'
    });
  },

  // 添加菜单
  insert(menuItem) {
    return request({
      url: '/insert', // 确保与后端路径匹配
      method: 'post',
      data: menuItem
    });
  },

  // 修改菜单
  update(menuItem) {
    return request({
      url: '/update',
      method: 'put',
      data: menuItem
    });
  },

  // 删除菜单
  delete(id) {
    return request({
      url: `/delete/${id}`,
      method: 'delete'
    });
  }
};
// src/api/sys/menu.js

export function getAllPage(pageNum, pageSize) {
  return request({
    url: `/api/menu/page?pageNum=${pageNum}&pageSize=${pageSize}`,
    method: 'get',
  });
};


