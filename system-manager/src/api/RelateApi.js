import axios from 'axios';

/**
 * 关联关系接口
 */
class RelateApi {

    /**
     * 新增关联关系
     * 
     * @param data
     *            关联关系信息
     * @return 请求对象
     */
    static add(data) {
        return axios.post('/sys/relate/add', data);
    }

    /**
     * 删除关联关系
     * 
     * @param id
     *            编号
     * @return 请求对象
     */
    static del(id) {
        return axios.delete(`/sys/relate/del/${id}`);
    }

    /**
     * 修改关联关系
     * 
     * @param data
     *            关联关系信息
     * @return 请求对象
     */
    static mod(data) {
        return axios.put('/sys/relate/mod', data);
    }

    /**
     * 查询关联关系列表
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static list(params) {
        return axios.get('/sys/relate/list', {params});
    }

    /**
     * 分页查询关联关系
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static page(params) {
        return axios.get('/sys/relate/page', {params});
    }

    /**
     * 查询单条关联关系
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static find(params) {
        return axios.get('/sys/relate/find', {params});
    }

    /**
     * 查询关联关系列表
     * 
     * @param relateType
     *            关系类型
     * @param objectId
     *            对象编号
     * @return 请求对象
     */
    static getTargetList(relateType, objectId) {
        return axios.get('/sys/relate/getTargetList', {params: {relateType, objectId}});
    }

}

export default RelateApi;
