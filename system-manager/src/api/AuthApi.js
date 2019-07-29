import axios from 'axios';

/**
 * 权限信息接口
 */
class AuthApi {

    /**
     * 新增权限信息
     * 
     * @param data
     *            权限信息
     * @return 请求对象
     */
    static add(data) {
        return axios.post('/sys/auth/add', data);
    }

    /**
     * 删除权限信息
     * 
     * @param id
     *            编号
     * @return 请求对象
     */
    static del(id) {
        return axios.delete(`/sys/auth/del/${id}`);
    }

    /**
     * 修改权限信息
     * 
     * @param data
     *            权限信息
     * @return 请求对象
     */
    static mod(data) {
        return axios.put('/sys/auth/mod', data);
    }

    /**
     * 查询权限信息列表
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static list(params) {
        return axios.get('/sys/auth/list', {params});
    }

    /**
     * 分页查询权限信息
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static page(params) {
        return axios.get('/sys/auth/page', {params});
    }

    /**
     * 查询单条权限信息
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static find(params) {
        return axios.get('/sys/auth/find', {params});
    }

    /**
     * 根据对象编号及关系类型查询权限信息
     * 
     * @param relateType
     *            关系类型
     * @param objectId
     *            对象编号
     * @return 请求对象
     */
    static getAuth(relateType, objectId) {
        return axios.get('/sys/auth/getAuth', {params: {relateType, objectId}});
    }

    /**
     * 通用授权
     * 
     * @param data
     *            权限信息
     * @return 请求对象
     */
    static authorize(data) {
        return axios.post('/sys/auth/authorize', data);
    }

}

export default AuthApi;
