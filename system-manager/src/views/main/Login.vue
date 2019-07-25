<template>
    <div class="login-wrap">
        <el-card class="box-card">
            <div class="login-title">{{ $config.sysName }}</div>
            <el-form ref="form" :model="data" :rules="rules" label-width="0px">
                <el-form-item prop="username">
                    <el-input v-model="data.username" placeholder="请输入用户名" maxlength="32"/>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="data.password" placeholder="请输入密码" type="password"
                        @keyup.enter.native="login" maxlength="32"/>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submit">登录</el-button>
                </div>
            </el-form>
        </el-card>
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
                            Common.setCookie("token", result, self.$config.expiredays);
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
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    height: 100%;
    width: 100%;
    background: gray;
}

.box-card {
    text-align: center;
    width: 400px;
}

.login-title {
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 20px;
}

.login-btn {
    text-align: center;
}

.login-btn button {
    width: 100%;
    height: 40px;
}
</style>
