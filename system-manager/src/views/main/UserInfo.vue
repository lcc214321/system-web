<template>
	<div class="window_box">
		<el-dialog :title="title" :visible="isShow" @close="close" width="450px"
			:close-on-click-modal="closeOn" :close-on-press-escape="closeOn">
			<div class="dialog-info-body">
				<el-input v-model="data.userId" readonly="true">
					<template slot="prepend">用户名</template>
				</el-input>
				<el-input v-model="data.realName" readonly="true">
					<template slot="prepend">真实姓名</template>
				</el-input>
				<el-input v-model="data.gender" readonly="true">
					<template slot="prepend">性别</template>
				</el-input>
				<el-input v-model="data.birthday" readonly="true">
					<template slot="prepend">出生日期</template>
				</el-input>
				<el-input v-model="data.address" readonly="true">
					<template slot="prepend">地址</template>
				</el-input>
				<el-input v-model="data.areaId" readonly="true">
					<template slot="prepend">地区编码</template>
				</el-input>
				<el-input v-model="data.mobilePhone" readonly="true">
					<template slot="prepend">电话</template>
				</el-input>
				<el-input v-model="data.email" readonly="true">
					<template slot="prepend">邮箱</template>
				</el-input>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			closeOn: false,
			orgName: "",
		}
	},
	props: {
		isShow: Boolean,
		title: String,
		data: Object
	},
	methods: {
		close() {
			this.$emit("close");
		}
	}
}
</script>

<style scoped>
.window_box {
	line-height: 0px;
}
</style>
