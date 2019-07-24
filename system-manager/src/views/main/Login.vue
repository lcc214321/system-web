<template>
    <div class="login-wrap">
        <div class="ms-title">平台系统管理中心</div>
        <div class="ms-login">
            <el-form ref="form" :model="data" :rules="rules" label-width="0px">
                <el-form-item prop="username">
                    <el-input v-model="data.username" placeholder="请输入用户名" maxlength="50"/>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="data.password" placeholder="请输入密码" type="password"
                    	@keyup.enter.native="login" maxlength="50"/>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submit">登录</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import {Common} from 'basic-assets';
import AuthenApi from '@/api/AuthenApi';

export default {
	data() {
        return {
        	data: {
        		username: "",
                password: ""
        	},
            rules: {
                username: [{
                	required: true,
                	message: "请输入用户名",
                	trigger: "blur"
				}], password: [{
					required: true,
					message: "请输入密码",
					trigger: "blur"
				}]
            }
        }
    },
	methods: {
		submit() {
			const self = this;
			self.$refs.form.validate(valid => {
				if (valid) {
					AuthenApi.login(self.data).then(result => {
						if (result) {
                            Common.setCookie("token", result, 1000 * 60 * 60 * 24);
                            self.$system.loadInfo();
                            self.$router.push("/index");
                        }
					});
				} else {
					return false;
				}
			});
		}
	}
}
</script>

<style scoped>
.login-wrap {
	position: relative;
	width: 100%;
	height: 100%;
}

.ms-title {
	position: absolute;
	top: 50%;
	width: 100%;
	margin-top: -230px;
	text-align: center;
	font-size: 30px;
	color: #fff;
}

.ms-login {
	position: absolute;
	left: 50%;
	top: 50%;
	width: 300px;
	height: 160px;
	margin: -150px 0 0 -190px;
	padding: 40px;
	border-radius: 5px;
	background: #fff;
}

.login-btn {
	text-align: center;
}

.login-btn button {
	width: 100%;
	height: 36px;
}
</style>
