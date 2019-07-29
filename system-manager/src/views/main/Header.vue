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
        <UserInfo :isShow="userInfoShow" :data="userInfoData" @close="close"/>
        <ModPwd :isShow="pwdShow" @sure="sure" @close="close"/>
    </div>
</template>

<script>
import UserInfo from './UserInfo';
import ModPwd from './ModPwd';
import SystemApi from '@/api/SystemApi';

export default {
    data() {
        return {
            userInfoShow: false,
            userInfoData: {},
            pwdShow: false,
            activeTextColor: "#FFD04B",
        }
    },
    mounted() {
        const self = this;
        let timer = setInterval(() => {
            if (self.$cache.has('info')) {
                self.userInfoData = self.$cache.info.user;
                clearInterval(timer);
            }
        }, 100);
    },
    components: {
        ModPwd ,
        UserInfo
    },
    computed: {
        userId() {
            return this.userInfoData.userId || "未登录";
        }
    },
    methods: {
        logout() {
            const self = this;
            self.$confirm("确定退出当前用户吗?", "退出登录", {
                type: 'warning'
            }).then(() => {
                SystemApi.logout().then(result => {
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
            this.userInfoShow = true;
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
.logo {
    float: left;
    font-size: 24px;
    padding-left: 50px;
    color: #87CECB;
    background: url("../../assets/img/logo.png") no-repeat 0px 8px;
    font-weight: bold;
}

.user-info {
    float: right;
    font-size: 16px;
}
</style>
