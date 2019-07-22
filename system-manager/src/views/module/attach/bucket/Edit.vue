<template>
	<el-dialog :title="title" :visible="isShow" @open="open" @close="close" width="400px"
		:close-on-click-modal="closeOn" :close-on-press-escape="closeOn">
		<div class="dialog-body">
			<el-form ref="form" :model="data" :rules="rules" label-width="100px" size="small">
				<el-form-item label="板块标识" prop="bucket">
					<el-input v-model="data.bucket" placeholder="请输入板块标识" maxlength="50"/>
				</el-form-item>
				<el-form-item label="板块名称" prop="name">
					<el-input v-model="data.name" placeholder="请输入板块名称" maxlength="50"/>
				</el-form-item>
				<el-form-item label="描述">
					<el-input type="textarea" v-model="data.description"
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
				bucket: [{
					required: true,
					message: "请输入板块标识",
					trigger: "blur"
				}],
				name: [{
					required: true,
					message: "请输入板块名称",
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
				if (!valid) {
					return false;
				}
				self.$request({
					url: `/bucket/${self.isAdd ? 'add' : 'mod'}`,
					data: self.data,
					success(result) {
						if (result === true) {
							self.$message({
								message: '操作成功',
								type: 'success'
							});
							self.$emit("sure");
						}
					}
				});
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
