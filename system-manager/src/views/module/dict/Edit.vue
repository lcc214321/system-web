<template>
	<el-dialog :visible="isShow" :title="title" @open="open" @close="close" width="450px"
		:close-on-click-modal="closeOn" :close-on-press-escape="closeOn">
		<div class="dialog-body">
			<el-form ref="form" :model="data" :rules="rules" label-width="100px" size="small">
				<el-form-item label="字典代码" prop="code">
					<el-input v-model="data.code" placeholder="请输入字典编码" maxlength="50" :readonly="!isAdd"/>
				</el-form-item>
				<el-form-item label="字典名称" prop="name">
					<el-input v-model="data.name" placeholder="请输入字典名称" maxlength="50"/>
				</el-form-item>
				<el-form-item label="上级代码" prop="parentCode">
					<el-input v-model="data.parentCode" readonly="true"/>
				</el-form-item>
				<el-form-item label="描述" prop="description">
					<el-input v-model="data.description" type="textarea"
						:autosize="{minRows: 4, maxRows: 4}" placeholder="请输入描述" maxlength="1000"/>
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
				code: [{
					required: true,
					message: "请输入字典编码",
					trigger: "blur"
				}],
				name: [{
					required: true,
					message: "请输入字典名称",
					trigger: "blur"
				}]
			}
		}
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
						url: `/dict/${this.isAdd ? 'add' : 'mod'}`,
						data: self.data,
						success(result) {
							if (result === true) {
								self.$message({
									type: "success",
									message: "保存成功!"
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
