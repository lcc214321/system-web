<template>
	<div class="wrapper">
		<v-header/>
		<v-sidebar/>
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

export default {
	components: {vHeader, vSidebar}
}
</script>

<style scoped>

</style>
