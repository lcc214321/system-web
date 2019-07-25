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
        this.loadData();
	},
	methods: {
		loadData() {
			this.menus = this.$cache.menu || [];
            if (this.$cache.info && this.$cache.info.user) {
            	this.userId = this.$cache.info.user.userId;
            } else {
            	this.userId = "未知用户";
            }
        }
	},
	components: {vHeader, vSidebar}
}
</script>

<style scoped>

</style>
