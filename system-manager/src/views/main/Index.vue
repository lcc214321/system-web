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

export default {
	data() {
		return {
			menus: [],
			userId: "未登录"
		};
	},
	created() {
		const self = this;
		AuthenApi.bizInfo().then(result => {
			self.$cache.bizInfo = result;
		});
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
        }
	},
	components: {vHeader, vSidebar}
}
</script>

<style scoped>

</style>
