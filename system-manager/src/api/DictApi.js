import axios from 'axios';

/**
 * 字典接口
 */
class DictApi {

    /**
     * 新增字典
     * 
     * @param data
     *            字典信息
     * @return 请求对象
     */
    static add(data) {
        return axios.post('/sys/dict/add', data);
    }

    /**
     * 删除字典
     * 
     * @param id
     *            编号
     * @return 请求对象
     */
    static del(id) {
        return axios.delete(`/sys/dict/del/${id}`);
    }

    /**
     * 修改字典
     * 
     * @param data
     *            字典信息
     * @return 请求对象
     */
    static mod(data) {
        return axios.put('/sys/dict/mod', data);
    }

    /**
     * 查询字典列表
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static list(params) {
        return axios.get('/sys/dict/list', {params});
    }

    /**
     * 分页查询字典
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static page(params) {
        return axios.get('/sys/dict/page', {params});
    }

    /**
     * 查询单条字典
     * 
     * @param params
     *            查询参数
     * @return 请求对象
     */
    static find(params) {
        return axios.get('/sys/dict/find', {params});
    }

    /**
     * 查询字典树状数据
     * 
     * @return 请求对象
     */
    static tree() {
        return axios.get('/sys/dict/tree');
    }

    /**
     * 字典上移
     * 
     * @param data
     *            字典信息
     * @return 请求对象
     */
    static up(data) {
        return axios.put('/sys/dict/up', data);
    }

    /**
     * 字典下移
     * 
     * @param data
     *            字典信息
     * @return 请求对象
     */
    static down(data) {
        return axios.put('/sys/dict/down', data);
    }

    /**
     * 查询字典树状数据
     * 
     * @param parentCode
     *            上级字典代码
     * @return 请求对象
     */
    static dictList(parentCode) {
        return axios.get('/sys/dict/dictList', {params: {parentCode}});
    }

    /**
     * 查询业务字典全集
     * 
     * @return 请求对象
     */
    static dictMap() {
        return axios.get('/sys/dict/dictMap');
    }

}

export default DictApi;
