import axios from 'axios';

/**
 * 功能接口
 */
class FuncApi {

    /**
     * 新增功能
     * 
     * @param data
     *            功能信息
     * @return 请求对象
     */
    static add(data) {
        return axios.post('/sys/func/add', data);
    }

    /**
     * 删除功能
     * 
     * @param id
     *            编号
     * @return 请求对象
     */
    static del(id) {
        return axios.delete(`/sys/func/del/${id}`);
    }

    /**
     * 修改功能
     * 
     * @param data
     *            功能信息
     * @return 请求对象
     */
    static mod(data) {
        return axios.put('/sys/func/mod', data);
    }

    /**
     * 查询功能列表
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static list(params) {
        return axios.get('/sys/func/list', {params});
    }

    /**
     * 分页查询功能
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static page(params) {
        return axios.get('/sys/func/page', {params});
    }

    /**
     * 查询单条功能
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static find(params) {
        return axios.get('/sys/func/find', {params});
    }

    /**
     * 查询功能树状数据
     * 
     * @param sysId
     *            系统编号
     * @param roleIds
     *            角色编号列表
     * @return 请求对象
     */
    static tree(sysId, roleIds) {
        return axios.get('/sys/func/tree', {params: {sysId, roleIds}});
    }

    /**
     * 功能上移
     * 
     * @param data
     *            功能信息
     * @return 请求对象
     */
    static up(data) {
        return axios.put('/sys/func/up', data);
    }

    /**
     * 功能下移
     * 
     * @param data
     *            功能信息
     * @return 请求对象
     */
    static down(data) {
        return axios.put('/sys/func/down', data);
    }

}

export default FuncApi;
