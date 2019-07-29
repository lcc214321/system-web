import axios from 'axios';

/**
 * 地区接口
 */
class AreaApi {

    /**
     * 查询地区树状列表
     * 
     * @param areaId
     *            地区编号
     * @return 请求对象
     */
    static tree(areaId) {
        return axios.get('/sys/appVersion/tree', {params: {areaId}});
    }

}

export default AreaApi;
