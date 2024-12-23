import request from '@/utils/request'
export default {

  // 获取用户
  getUserList() {
    return request({
      url: '/getUsers',
      method: 'get'
    })
  },

  // 新增用户
  addUser(addUserForm) {
    // 创建 FormData 对象并填充数据
    const formData = new FormData();
    formData.append('username', addUserForm.username);
    formData.append('password', addUserForm.password || "defaultPassword");
    if (addUserForm.avatar) { // 只有当 avatar 存在时才添加
      formData.append('avatar', addUserForm.avatar);
    }
    formData.append('email', addUserForm.email);
    formData.append('city', addUserForm.city);
    formData.append('status', addUserForm.status);
    return request({
      url: '/addUsers',
      method: 'post',
      data: formData, // 发送的数据
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  // 更新用户
  updateUser(updatedUser) {
    const formData = new FormData();
    formData.append('id', updatedUser.id);
    formData.append('username', updatedUser.username);
    if (updatedUser.password) { // 只有在密码被修改时才添加
      formData.append('password', updatedUser.password);
    }
    if (updatedUser.avatar) { // 只有在 avatar 存在时才添加
      formData.append('avatar', updatedUser.avatar);
    }
    formData.append('email', updatedUser.email);
    formData.append('city', updatedUser.city);
    formData.append('status', updatedUser.status);

    return request({
      url: '/updateUsers', // 更新用户的API地址
      method: 'post', // 使用POST方法
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },

  // 删除用户
  deleteUser(id) {
    return request({
      url: `/deleteUsers/${id}`,
      method: 'delete'
    })
  }
}
