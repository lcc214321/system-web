import axios from 'axios';

/**
 * 纵向数据模型信息接口
 */
class VerticalDomainApi {

    /**
     * 新增纵向数据模型信息
     * 
     * @param data
     *            纵向数据模型信息
     * @return 请求对象
     */
    static add(data) {
        return axios.post('/sys/verticalDomain/add', data);
    }

    /**
     * 删除纵向数据模型信息
     * 
     * @param id
     *            编号
     * @return 请求对象
     */
    static del(id) {
        return axios.delete(`/sys/verticalDomain/del/${id}`);
    }

    /**
     * 修改纵向数据模型信息
     * 
     * @param data
     *            纵向数据模型信息
     * @return 请求对象
     */
    static mod(data) {
        return axios.put('/sys/verticalDomain/mod', data);
    }

    /**
     * 查询纵向数据模型信息列表
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static list(params) {
        return axios.get('/sys/verticalDomain/list', {params});
    }

    /**
     * 分页查询纵向数据模型信息
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static page(params) {
        return axios.get('/sys/verticalDomain/page', {params});
    }

    /**
     * 查询单条纵向数据模型信息
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static find(params) {
        return axios.get('/sys/verticalDomain/find', {params});
    }

}

export default VerticalDomainApi;
