<template>
	<el-dialog :visible="isShow" :title="title" @open="open" @close="close" width="450px"
		:close-on-click-modal="closeOn" :close-on-press-escape="closeOn">
		<div class="dialog-body">
			<el-form ref="form" :model="data" :rules="rules" label-width="100px" size="small">
				<el-form-item label="菜单编号" v-if="type == 'edit'">
					<el-input v-model="data.menuId" placeholder="请输入菜单编码" readonly="true"/>
				</el-form-item>
				<el-form-item label="菜单名称" prop="name">
					<el-input v-model="data.name" placeholder="请输入菜单名称" maxlength="50"/>
				</el-form-item>
				<el-form-item label="菜单类型" prop="type">
					<el-select v-model="data.type" placeholder="请选择菜单类型" :disabled="type == 'edit'">
						<template v-if="typeList && typeList.length">
							<template v-for="itme in typeList">
								<el-option :label="itme.name" :value="itme.code"/>
							</template>
						</template>
					</el-select>
				</el-form-item>
				<el-form-item label="所属系统">
					<el-select v-model="data.sysId" placeholder="请选择系统" :disabled="type == 'edit'">
						<template v-if="sysList && sysList.length">
							<template v-for="itme in sysList">
								<el-option :label="itme.name" :value="itme.code"/>
							</template>
						</template>
					</el-select>
				</el-form-item>
				<el-form-item label="菜单链接">
					<el-input v-model="data.href" placeholder="请输入菜单链接" maxlength="500"/>
				</el-form-item>
				<el-form-item label="权限标识">
					<el-input v-model="data.permission" placeholder="请输入权限标识" maxlength="100"/>
				</el-form-item>
				<el-form-item label="是否启用">
					<el-switch v-model="data.display"/>
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
			typeList: [],
			sysList: [],
			rules: {
				name: [{
					required: true,
					message: "请输入菜单名称",
					trigger: "blur"
				}],
				type: [{
					required: true,
					message: "请选择菜单类型",
					trigger: "change"
				}]
			}
		};
	},
	props: {
		isShow: Boolean,
		title: String,
		data: Object,
		type: String
	},
	created() {
		this.typeList = this.$system.getDictList("sys_menu_type");
		this.sysList = this.$system.getDictList("sys_flag");
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
						url: `/menu/${self.type != 'edit' ? 'add' : 'mod'}`,
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
.el-select {
	display: block;
}
</style>
