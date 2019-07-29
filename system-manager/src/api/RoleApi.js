import axios from 'axios';

/**
 * 角色信息接口
 */
class RoleApi {

    /**
     * 新增角色信息
     * 
     * @param data
     *            角色信息
     * @return 请求对象
     */
    static add(data) {
        return axios.post('/sys/role/add', data);
    }

    /**
     * 删除角色信息
     * 
     * @param id
     *            编号
     * @return 请求对象
     */
    static del(id) {
        return axios.delete(`/sys/role/del/${id}`);
    }

    /**
     * 修改角色信息
     * 
     * @param data
     *            角色信息
     * @return 请求对象
     */
    static mod(data) {
        return axios.put('/sys/role/mod', data);
    }

    /**
     * 查询角色信息列表
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static list(params) {
        return axios.get('/sys/role/list', {params});
    }

    /**
     * 分页查询角色信息
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static page(params) {
        return axios.get('/sys/role/page', {params});
    }

    /**
     * 查询单条角色信息
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static find(params) {
        return axios.get('/sys/role/find', {params});
    }

}

export default RoleApi;
