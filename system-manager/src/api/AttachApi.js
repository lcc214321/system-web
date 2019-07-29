import axios from 'axios';

/**
 * 附件信息接口
 */
class AttachApi {

    /**
     * 新增附件信息
     * 
     * @param data
     *            附件信息
     * @return 请求对象
     */
    static add(data) {
        return axios.post('/sys/attach/add', data);
    }

    /**
     * 删除附件信息
     * 
     * @param id
     *            编号
     * @return 请求对象
     */
    static del(id) {
        return axios.delete(`/sys/attach/del/${id}`);
    }

    /**
     * 修改附件信息
     * 
     * @param data
     *            附件信息
     * @return 请求对象
     */
    static mod(data) {
        return axios.put('/sys/attach/mod', data);
    }

    /**
     * 查询附件信息列表
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static list(params) {
        return axios.get('/sys/attach/list', {params});
    }

    /**
     * 分页查询附件信息
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static page(params) {
        return axios.get('/sys/attach/page', {params});
    }

    /**
     * 查询单条附件信息
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static find(params) {
        return axios.get('/sys/attach/find', {params});
    }

}

export default AttachApi;
