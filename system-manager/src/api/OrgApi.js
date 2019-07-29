import axios from 'axios';

/**
 * 组织机构接口
 */
class OrgApi {

    /**
     * 新增组织机构
     * 
     * @param data
     *            组织机构信息
     * @return 请求对象
     */
    static add(data) {
        return axios.post('/sys/org/add', data);
    }

    /**
     * 删除组织机构
     * 
     * @param id
     *            编号
     * @return 请求对象
     */
    static del(id) {
        return axios.delete(`/sys/org/del/${id}`);
    }

    /**
     * 修改组织机构
     * 
     * @param data
     *            组织机构信息
     * @return 请求对象
     */
    static mod(data) {
        return axios.put('/sys/org/mod', data);
    }

    /**
     * 查询组织机构列表
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static list(params) {
        return axios.get('/sys/org/list', {params});
    }

    /**
     * 分页查询组织机构
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static page(params) {
        return axios.get('/sys/org/page', {params});
    }

    /**
     * 查询单条组织机构
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static find(params) {
        return axios.get('/sys/org/find', {params});
    }

    /**
     * 查询组织机构树状数据
     * 
     * @param parentId
     *            上级机构编号
     * @return 请求对象
     */
    static tree(parentId) {
        return axios.get('/sys/org/tree', {params: {parentId}});
    }

    /**
     * 组织机构上移
     * 
     * @param data
     *            组织机构信息
     * @return 请求对象
     */
    static up(data) {
        return axios.put('/sys/org/up', data);
    }

    /**
     * 组织机构下移
     * 
     * @param data
     *            组织机构信息
     * @return 请求对象
     */
    static down(data) {
        return axios.put('/sys/org/down', data);
    }

}

export default OrgApi;
