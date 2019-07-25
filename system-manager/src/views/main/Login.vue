<template>
    <div class="login-wrap">
        <el-card class="box-card">
            <avue-form ref="form" v-model="data" :option="option" @submit="submit">
                <template slot-scope="scope" slot="menuForm">
                    <el-button @click="tip">自定义按钮</el-button>
                </template>
            </avue-form>
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
    computed: {
    	
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
}
</style>
