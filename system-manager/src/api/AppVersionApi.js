import axios from 'axios';

/**
 * 版本信息接口
 */
class AppVersionApi {

    /**
	 * 新增版本信息
	 * 
	 * @param data
	 *            版本信息
	 * @return 请求对象
	 */
	static add(data) {
		return axios.post('/sys/appVersion/add', data);
	}

    /**
	 * 删除版本信息
	 * 
	 * @param id
	 *            编号
	 * @return 请求对象
	 */
	static del(id) {
		return axios.delete(`/sys/appVersion/del/${id}`);
	}

    /**
	 * 修改版本信息
	 * 
	 * @param data
	 *            版本信息
	 * @return 请求对象
	 */
	static mod(data) {
		return axios.put('/sys/appVersion/mod', data);
	}

    /**
	 * 查询版本信息列表
	 * 
	 * @param params
	 *            查询参数
	 * @return 请求对象
	 */
	static list(params) {
		return axios.get('/sys/appVersion/list', {params});
	}

    /**
	 * 分页查询版本信息
	 * 
	 * @param params
	 *            查询参数
	 * @return 请求对象
	 */
	static page(params) {
		return axios.get('/sys/appVersion/page', {params});
	}

    /**
	 * 查询单条版本信息
	 * 
	 * @param params
	 *            查询参数
	 * @return 请求对象
	 */
	static find(params) {
		return axios.get('/sys/appVersion/find', {params});
	}

    /**
	 * 获取应用最新版本信息
	 * 
	 * @param appId
	 *            应用编号
	 * @return 请求对象
	 */
	static currVersion(appId) {
		return axios.get('/sys/appVersion/currVersion', {params: {appId}});
	}

}

export default AppVersionApi;
