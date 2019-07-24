import axios from 'axios';

/**
 * 登录认证接口
 */
class AuthenApi {

    /**
	 * 当前会话是否在线
	 * 
	 * @return 请求对象
	 */
	static isAuthen() {
		return axios.get('/authen/isAuthen');
	}

    /**
	 * 用户登录服务
	 * 
	 * @param data
	 *            登录信息
	 * @return 请求对象
	 */
	static login(data) {
		return axios.post('/authen/login', data);
	}

    /**
	 * 退出当前会话登录
	 * 
	 * @return 请求对象
	 */
	static logout() {
		return axios.delete('/authen/logout');
	}

    /**
	 * 获取当前会话认证信息
	 * 
	 * @return 请求对象
	 */
	static info() {
		return axios.get('/authen/info');
	}

}

export default AuthenApi;
