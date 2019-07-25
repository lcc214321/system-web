<template>
	<div class="header">
		<div class="logo"> {{ $config.sysName }}</div>
		<div class="user-info">
			<el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect"
				background-color="#242F42" text-color="#FFFFFF"
				:active-text-color="activeTextColor">
				<el-submenu index="user" style="border-bottom-color: blue!important;">
					<template slot="title">{{ userId }}</template>
					<el-menu-item index="userInfo" @click="userInfo">用户信息</el-menu-item>
					<el-menu-item index="modPwd" @click="modPwd">修改密码</el-menu-item>
				</el-submenu>
				<el-menu-item index="logout">
					<img src="../../assets/img/exit.png" title="退出">
				</el-menu-item>
			</el-menu>
		</div>
		<ModPwd :isShow="pwdShow" :title="pwdTitle" @sure="sure" @close="close"/>
		<UserInfo :isShow="userInfoShow" :title="userInfoTitle" :data="userInfoData" @sure="sure" @close="close"/>
	</div>
</template>

<script>
import UserInfo from './UserInfo';
import ModPwd from './ModPwd';
import AuthenApi from '@/api/AuthenApi';

export default {
	props: {
		userId: String
	},
	data() {
		return {
			userInfoShow: false,
			userInfoTitle: "用户信息",
			userInfoData: {},
			pwdShow: false,
			pwdTitle: "修改密码",
			activeTextColor: "#FFD04B",
		}
	},
	components: {
		ModPwd ,
		UserInfo
	},
	methods: {
		logout() {
			const self = this;
			self.$confirm("确定退出当前用户吗?", "退出登录", {
				type: 'warning'
			}).then(() => {
				AuthenApi.logout().then(result => {
					if (result) {
                        self.$system.clearData();
						self.$router.push("/login");
					}
				});
			}).catch({});
		},
		handleSelect(key, keyPath) {
			if (key) {
				const self = this;
				switch (key) {
				case "logout": self.logout();
					break;
				}
			}
		},
		//登录用户信息
		userInfo() {
			const self = this;
			self.userInfoShow = true;
			self.userInfoData = self.$system.cache.currInfo.user;
		},
		//修改密码
		modPwd() {
			this.pwdShow = true;
		},
		sure() {
			this.userInfoShow = false;
			this.pwdShow = false;
		},
		close() {
			this.userInfoShow = false;
			this.pwdShow = false;
		},
	}
}
</script>

<style scoped>
.header {
	position: relative;
	box-sizing: border-box;
	width: 100%;
	height: 60px;
	font-size: 22px;
	line-height: 60px;
	color: #fff;
	background-color: #242f42;
}

.header .logo {
	float: left;
	padding-left: 50px;
	color: #049AD4;
	background: url("../../assets/img/logo.png") no-repeat 0px 8px;
	margin-left: 20px;
}

.user-info {
	float: right;
	font-size: 16px;
	color: #fff;
}

.user-info .el-dropdown-link {
	position: relative;
	display: inline-block;
	padding-left: 50px;
	color: #fff;
	cursor: pointer;
	vertical-align: middle;
}

.user-info .user-logo {
	position: absolute;
	left: 0;
	top: 15px;
	width: 40px;
	height: 40px;
	border-radius: 50%;
}

.el-dropdown-menu__item {
	text-align: center;
}
</style>
