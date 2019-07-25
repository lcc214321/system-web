import axios from 'axios';

/**
 * 系统接口
 */
class SystemApi {

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

    /**
	 * 查询功能树状数据
	 * 
	 * @param sysId
	 *            系统编号
	 * @param roleIds
	 *            角色编号列表
	 * @return 请求对象
	 */
	static menu(sysId, roleIds) {
		return axios.get('/sys/func/tree', {params: {sysId, roleIds}});
	}

    /**
	 * 查询业务字典全集
	 * 
	 * @return 请求对象
	 */
	static dict() {
		return axios.get('/sys/dict/dictMap');
	}

}

export default SystemApi;
