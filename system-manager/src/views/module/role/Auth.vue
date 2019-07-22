<template>
	<el-dialog title="权限配置" :visible="isShow" @close="close" width="400px"
		:close-on-click-modal="closeOn" :close-on-press-escape="closeOn">
		<div class="dialog-body">
			<el-tree :data="treeData" :props="treeProps"
				ref="tree" node-key="menuId" show-checkbox/>
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
			treeProps: {
				label: "name",
				children: "children"
			},
			treeData: []
		};
	},
	props: {
		isShow: Boolean,
		data: Object
	},
	created() {
		this.treeData = this.$system.cache.currInfo.menu;
	},
	watch: {
		data(newData, oldData) {
			this.loadAuth();
		}
	},
	methods: {
		loadAuth() {
			const self = this;
			self.$request({
				url: "/role/menuIdList",
				data: {roleId: self.data.roleId},
				success(result) {
					if (!result || !result.length) {
						result = [];
					} else {
						result = result.filter(menuId => self.$refs
							.tree.getNode(menuId).childNodes.length == 0);
					}
		            self.$refs.tree.setCheckedKeys(result);
				}
			});
		},
		sure() {
			const self = this;
			let menuIds = [...self.$refs.tree.getCheckedKeys(), ...self.$refs.tree.getHalfCheckedKeys()].join();
			self.$request({
				url: "/role/auth",
				data: {
					roleId: self.data.roleId,
					menuIds: menuIds
				},
				success(result) {
					if (result) {
						self.$message({
							message: '操作成功',
							type: 'success'
						});
						self.$emit("sure");
					}
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
