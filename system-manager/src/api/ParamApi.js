import axios from 'axios';

/**
 * 系统参数接口
 */
class ParamApi {

    /**
     * 新增系统参数
     * 
     * @param data
     *            系统参数信息
     * @return 请求对象
     */
    static add(data) {
        return axios.post('/sys/param/add', data);
    }

    /**
     * 删除系统参数
     * 
     * @param id
     *            编号
     * @return 请求对象
     */
    static del(id) {
        return axios.delete(`/sys/param/del/${id}`);
    }

    /**
     * 修改系统参数
     * 
     * @param data
     *            系统参数信息
     * @return 请求对象
     */
    static mod(data) {
        return axios.put('/sys/param/mod', data);
    }

    /**
     * 查询系统参数列表
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static list(params) {
        return axios.get('/sys/param/list', {params});
    }

    /**
     * 分页查询系统参数
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static page(params) {
        return axios.get('/sys/param/page', {params});
    }

    /**
     * 查询单条系统参数
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static find(params) {
        return axios.get('/sys/param/find', {params});
    }

}

export default ParamApi;
