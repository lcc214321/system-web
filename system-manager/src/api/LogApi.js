import axios from 'axios';

/**
 * 日志信息接口
 */
class LogApi {

    /**
	 * 分页查询日志信息
	 * 
	 * @param params
	 *            查询参数
	 * @return 请求对象
	 */
	static page(params) {
		return axios.get('/sys/log/page', {params});
	}

    /**
	 * 查询单条日志信息
	 * 
	 * @param params
	 *            查询参数
	 * @return 请求对象
	 */
	static find(params) {
		return axios.get('/sys/log/find', {params});
	}

}

export default LogApi;
