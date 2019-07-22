<template>
	<div class="window_box">
		<el-dialog :title="title" :visible="isShow" @open="open" @close="close" width="360px"
			:close-on-click-modal="closeOn" :close-on-press-escape="closeOn">
			<div class="dialog-body">
				<el-form ref="form" :model="pwdData" :rules="rules" label-width="100px" size="small">
					<el-form-item label="旧密码" prop="oldPwd">
						<el-input placeholder="请输入旧密码" type="password" v-model="pwdData.oldPwd" maxlength="18"/>
					</el-form-item>
					<el-form-item label="新密码" prop="newPwd">
						<el-input placeholder="请输入新密码" type="password" v-model="pwdData.newPwd" maxlength="18"/>
					</el-form-item>
					<el-form-item label="确认密码" prop="cfmPwd">
						<el-input placeholder="请输入确认密码" type="password" v-model="pwdData.cfmPwd" maxlength="18"/>
					</el-form-item>
				</el-form>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="close" size="small">取消</el-button>
				<el-button type="primary" @click="sure" size="small">确定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
export default {
	data() {
		return {
			closeOn: false,
			pwdData: {},
			rules: {
				oldPwd: [{
					required: true,
					message: "请输入旧密码",
					trigger: "blur"
				}, {
					min: 6,
					max: 18,
					message: "请输入6-18位的密码"
				}],
				newPwd: [{
					required: true,
					message: "请输入新密码",
					trigger: "blur" 
				}, {
					min: 6,
					max: 18,
					message: "请输入6-18位的密码"
		        }],
				cfmPwd: [{
					required: true,
					message: "请输入确认密码",
					trigger: "blur"
				}, {
					min: 6,
					max: 18,
					message: "请输入6-18位的密码"
		        }]
			}
		};
	},
	props: {
		isShow: Boolean,
		title: String
	},
	methods: {
		open() {
			this.$refs.form && this.$refs.form.clearValidate();
		},
		close() {
			this.$emit("close");
		},
		sure() {
			const self = this;
			self.$refs.form.validate(valid => {
				if (valid) {
					if (self.pwdData.newPwd != self.pwdData.cfmPwd) {
						self.$message.error('确认密码不一致！');
						return false;
					}
					self.$request({
						url: "/user/modPwd",
						data: self.pwdData,
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
				} else {
					return false;
				}
			});
		}
	}
}
</script>

<style scoped>
.window_box {
	line-height: 0px;
}
</style>
