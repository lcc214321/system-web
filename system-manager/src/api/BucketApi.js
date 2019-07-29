import axios from 'axios';

/**
 * 附件板块信息接口
 */
class BucketApi {

    /**
     * 新增附件板块信息
     * 
     * @param data
     *            附件板块信息
     * @return 请求对象
     */
    static add(data) {
        return axios.post('/sys/bucket/add', data);
    }

    /**
     * 删除附件板块信息
     * 
     * @param id
     *            编号
     * @return 请求对象
     */
    static del(id) {
        return axios.delete(`/sys/bucket/del/${id}`);
    }

    /**
     * 修改附件板块信息
     * 
     * @param data
     *            附件板块信息
     * @return 请求对象
     */
    static mod(data) {
        return axios.put('/sys/bucket/mod', data);
    }

    /**
     * 查询附件板块信息列表
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static list(params) {
        return axios.get('/sys/bucket/list', {params});
    }

    /**
     * 分页查询附件板块信息
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static page(params) {
        return axios.get('/sys/bucket/page', {params});
    }

    /**
     * 查询单条附件板块信息
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static find(params) {
        return axios.get('/sys/bucket/find', {params});
    }

}

export default BucketApi;
