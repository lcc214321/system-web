<template>
	<div class="wrapper">
		<v-header :user-id="userId"/>
		<v-sidebar :menus="menus"/>
		<div class="content">
			<transition name="move" mode="out-in">
				<router-view/>
			</transition>
		</div>
	</div>
</template>

<script>
import vHeader from "./Header";
import vSidebar from "./Sidebar";
import AuthenApi from '@/api/AuthenApi';
import axios from 'axios';

export default {
	data() {
		return {
			menus: [],
			userId: "未登录"
		};
	},
	created() {
// 		this.testload();
		let hh = 'hh';
//         this.loadData();
	},
	methods: {
		loadData() {
            const self = this;
            let currInfo = self.$system.cache.currInfo;
            if (currInfo) {
                if (currInfo.menu) {
                    self.menus = currInfo.menu;
                }
                if (currInfo.user) {
                    self.userId = currInfo.user.userId;
                }
            } else {
                self.$router.push("/login");
            }
        },
        async testload() {
//             const self = this;
//             let isAuthen = null;
//         	await AuthenApi.isAuthen().then(result => {
// //                 self.$cache.bizInfo = result;
//                 isAuthen = result;
//             });
            let isAuthen1 = await axios.get('/authen/isAuthen');
            let isAuthen2 = await axios.get('/authen/isAuthen');
        	return 123;
        }
	},
	components: {vHeader, vSidebar}
}
</script>

<style scoped>

</style>
