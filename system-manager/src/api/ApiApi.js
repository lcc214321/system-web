import axios from 'axios';

/**
 * 接口信息接口
 */
class ApiApi {

    /**
     * 新增接口信息
     * 
     * @param data
     *            接口信息
     * @return 请求对象
     */
    static add(data) {
        return axios.post('/sys/api/add', data);
    }

    /**
     * 删除接口信息
     * 
     * @param id
     *            编号
     * @return 请求对象
     */
    static del(id) {
        return axios.delete(`/sys/api/del/${id}`);
    }

    /**
     * 修改接口信息
     * 
     * @param data
     *            接口信息
     * @return 请求对象
     */
    static mod(data) {
        return axios.put('/sys/api/mod', data);
    }

    /**
     * 查询接口信息列表
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static list(params) {
        return axios.get('/sys/api/list', {params});
    }

    /**
     * 分页查询接口信息
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static page(params) {
        return axios.get('/sys/api/page', {params});
    }

    /**
     * 查询单条接口信息
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static find(params) {
        return axios.get('/sys/api/find', {params});
    }

}

export default ApiApi;
