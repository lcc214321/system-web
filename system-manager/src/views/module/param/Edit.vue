<template>
	<el-dialog :title="title" :visible="isShow" @open="open" @close="close" width="450px"
		:close-on-click-modal="closeOn" :close-on-press-escape="closeOn">
		<div class="dialog-body">
      		<el-form ref="form" :model="data" :rules="rules" label-width="100px" size="small">
	        	<el-form-item label="参数标识" prop="paramKey">
	          		<el-input v-model="data.paramKey" placeholder="请输入参数标识" maxlength="50" :readonly="!isAdd"/>
	        	</el-form-item>
				<el-form-item label="参数值" prop="paramValue">
					<el-input v-model="data.paramValue" placeholder="请输入参数值" maxlength="1000"/>
		        </el-form-item>
				<el-form-item label="参数中文名" prop="paramLabel">
					<el-input v-model="data.paramLabel" maxlength="50"/>
				</el-form-item>
				<el-form-item label="描述">
					<el-input v-model="data.description" type="textarea"
						:autosize="{minRows: 4, maxRows: 4}" placeholder="请输入描述" maxlength="1000"/>
				</el-form-item>
				<el-form-item label="是否启用">
					<el-switch v-model="data.enable"/>
				</el-form-item>
			</el-form>
		</div>
		<div slot="footer" class="dialog-footer">
			<el-button @click="close" size="small">取消</el-button>
			<el-button type="primary" @click="sure" size="small">确定</el-button>
		</div>
	</el-dialog>
</template>

<script>
export default {
	data() {
		return {
			closeOn: false,
			rules: {
				paramKey: [{
					required: true,
					message: "请输入参数标识",
					trigger: "blur"
				}],
				paramValue: [{
					required: true,
					message: "请输入参数值",
					trigger: "blur"
				}]
			}
		};
	},
	props: {
		isShow: Boolean,
		title: String,
		data: Object,
		isAdd: Boolean
	},
	methods: {
		open() {
			this.$refs.form && this.$refs.form.clearValidate();
		},
		sure() {
			const self = this;
			self.$refs.form.validate(valid => {
				if (valid) {
					self.$request({
						url: `/param/${self.isAdd ? 'add' : 'mod'}`,
						data: self.data,
						success(result) {
							if (result === true) {
								self.$message({
									message: '提交成功',
									type: 'success'
								});
								self.$emit("sure");
							}
						}
					});
				} else {
					return false;
				}
			});
		},
		close() {
			this.$emit("close");
		}
	}
}
</script>

<style scoped>

</style>
