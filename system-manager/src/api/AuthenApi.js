import axios from 'axios';

/**
 * 登录认证接口
 */
class AuthenApi {

    /**
	 * 当前会话是否在线
	 */
	static isAuthen() {
		return axios.get('/authen/isAuthen');
	}

    /**
	 * 用户登录服务
	 * 
	 * @param username 用户名
	 * @param password 密码
	 */
	static login(username, password) {
		return axios.post('/authen/login', {username, password});
	}

    /**
	 * 退出当前会话登录
	 */
	static logout() {
		return axios.delete('/authen/logout');
	}

    /**
	 * 获取当前会话认证业务信息
	 */
	static info() {
		return axios.get('/authen/info');
	}

}

export default AuthenApi;
