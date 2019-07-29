import axios from 'axios';

/**
 * 用户信息接口
 */
class UserApi {

    /**
     * 新增用户信息
     * 
     * @param data
     *            用户信息
     * @return 请求对象
     */
    static add(data) {
        return axios.post('/sys/user/add', data);
    }

    /**
     * 删除用户信息
     * 
     * @param id
     *            编号
     * @return 请求对象
     */
    static del(id) {
        return axios.delete(`/sys/user/del/${id}`);
    }

    /**
     * 修改用户信息
     * 
     * @param data
     *            用户信息
     * @return 请求对象
     */
    static mod(data) {
        return axios.put('/sys/user/mod', data);
    }

    /**
     * 查询用户信息列表
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static list(params) {
        return axios.get('/sys/user/list', {params});
    }

    /**
     * 分页查询用户信息
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static page(params) {
        return axios.get('/sys/user/page', {params});
    }

    /**
     * 查询单条用户信息
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static find(params) {
        return axios.get('/sys/user/find', {params});
    }

    /**
     * 获取用户信息
     * 
     * @param userId
     *            用户编号
     * @return 请求对象
     */
    static getUser(userId) {
        return axios.get('/sys/user/getUser', {params: {userId}});
    }

    /**
     * 获取用户角色列表
     * 
     * @param userId
     *            用户编号
     * @return 请求对象
     */
    static getRoles(userId) {
        return axios.get('/sys/user/getRoles', {params: {userId}});
    }

    /**
     * 获取用户权限列表
     * 
     * @param userId
     *            用户编号
     * @return 请求对象
     */
    static getAuths(userId) {
        return axios.get('/sys/user/getAuths', {params: {userId}});
    }

    /**
     * 获取用户接口列表
     * 
     * @param userId
     *            用户编号
     * @return 请求对象
     */
    static getApis(userId) {
        return axios.get('/sys/user/getApis', {params: {userId}});
    }

    /**
     * 重置用户密码
     * 
     * @param data
     *            用户信息
     * @return 请求对象
     */
    static resetPwd(data) {
        return axios.put('/sys/user/resetPwd', data);
    }

}

export default UserApi;
