<template>
	<el-dialog title="日志详情" :visible="isShow" @close="close" width="450px"
		:close-on-click-modal="closeOn" :close-on-press-escape="closeOn">
		<div class="dialog-info-body">
			<el-input v-model="data.logTypeName" readonly="true">
				<template slot="prepend">日志类型</template>
			</el-input>
			<el-input v-model="data.sysName" readonly="true">
				<template slot="prepend">系统名称</template>
			</el-input>
			<el-input v-model="data.operateInfo" readonly="true">
				<template slot="prepend">操作信息</template>
			</el-input>
			<el-input v-model="data.requestUrl" readonly="true">
				<template slot="prepend">请求地址</template>
			</el-input>
			<el-input v-model="data.param" readonly="true">
				<template slot="prepend">提交参数</template>
			</el-input>
			<el-input v-model="data.userId" readonly="true">
				<template slot="prepend">操作用户</template>
			</el-input>
			<el-input v-model="data.ip" readonly="true">
				<template slot="prepend">用户IP</template>
			</el-input>
			<el-input v-model="data.exception" readonly="true" v-if="data.logType == 'exception'">
				<template slot="prepend">异常信息</template>
			</el-input>
			<el-input v-model="data.recordTime" readonly="true">
				<template slot="prepend">记录时间</template>
			</el-input>
		</div>
	</el-dialog>
</template>

<script>
export default {
	data() {
		return {
			closeOn: false
		}
	},
	props: {
		isShow: Boolean,
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

</style>
