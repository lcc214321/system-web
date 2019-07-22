<template>
	<el-container>
		<el-header class="header-box">
			<div class="left">
				<el-button type="primary" @click="add" icon="el-icon-circle-plus-outline"
					v-if="$system.hasPermission('sys:role:add')">新增</el-button>
			</div>
			<div class="right">
				<el-input placeholder="请输入关键字" v-model="keyword" class="search-input">
					<el-button @click="search" slot="append" icon="el-icon-search"/>
				</el-input>
			</div>
		</el-header>
		<el-main class="main-box">
			<el-table :max-height="tableHeight" :data="tableData" border>
				<el-table-column prop="roleId" label="角色编号" width="200"/>
				<el-table-column prop="roleName" label="角色名称" width="200"/>
				<el-table-column prop="description" label="备注" :show-overflow-tooltip="true"/>
				<el-table-column prop="enable" label="状态" width="100">
					<template slot-scope="scope">
						{{ scope.row.enable ? '启用': '禁用' }}
					</template>
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<el-button-group>
							<el-button @click="edit(scope.$index, scope.row)"
								title="编辑" size="mini" icon="el-icon-edit"
								v-if="$system.hasPermission('sys:role:mod')"/>
							<el-button @click="auth(scope.$index, scope.row)"
								title="权限配置" size="mini" icon="el-icon-setting"
								v-if="$system.hasPermission('sys:role:auth')"/>
							<el-button @click="del(scope.$index, scope.row)"
								title="删除" size="mini" icon="el-icon-delete"
								v-if="$system.hasPermission('sys:role:del') && scope.row.roleId != 'admin'"/>
						</el-button-group>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination layout="total, sizes, prev, pager, next, jumper"
					:page-size="pageSize" :total="totalCount" :current-page="currentPage"
					@size-change="sizeChange" @current-change="currentChange"/>
			</div>
		</el-main>
		<edit :title="editTitle" :is-show="editVisible" :is-add="isAdd"
			:data="editData" @sure="sure" @close="close"/>
		<auth :is-show="authVisible" :data="authDate" @sure="sure" @close="close"/>
	</el-container>
</template>

<script>
import Edit from "./Edit";
import Auth from "./Auth";
import { Common } from "basic-assets";

export default {
	data() {
		return {
			keyword: "",
			tableData: [],
			editVisible: false,
			editTitle: "",
			isAdd: true,
			editData: {},
			authVisible: false,
			authDate: {},
			currentPage: 1,
			pageSize: 10,
			totalCount: 0,
			tableHeight: this.$system.limitHeight(112)
		};
	},
	created() {
		this.loadData();
	},
	methods: {
		//获取角色列表
		loadData() {
			const self = this;
			let data = {
				current: self.currentPage,
				size: self.pageSize
			};
			if (self.keyword) {
				data.keyword = self.keyword;
			}
			self.$request({
				url: "/role/page",
				data,
				success(result) {
					if (result && result.records) {
						self.tableData = result.records;
						self.totalCount = result.total;
					}
				}
			});
		},
		search() {
			this.currentPage = 1;
			this.loadData();
		},
		//新增角色
		add() {
			const self = this;
			self.editVisible = true;
			self.editTitle = "新增角色";
			self.isAdd = true;
			self.editData = {enable: true};
		},
		//编辑角色
		edit(index, row) {
			const self = this;
			self.editVisible = true;
			self.editTitle = "编辑角色";
			self.isAdd = false;
			self.editData = Common.clone(row);
		},
		//权限配置
		auth(index, row) {
			const self = this;
			self.authVisible = true;
			self.authDate = row;
		},
		//删除角色
		del(index, row) {
			const self = this;
			self.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				self.$request({
					url: "/role/del",
					data: {id: row.id},
					success(result) {
						if (result) {
							self.$message({
								message: '删除成功',
								type: 'success'
							});
							self.loadData();
						}
					}
				});
			}).catch(() => {});
		},
		sizeChange(pageSize) {
			this.pageSize = pageSize;
			this.loadData();
		},
		currentChange(currentPage) {
			this.currentPage = currentPage;
			this.loadData();
		},
		close() {
			this.editVisible = false;
			this.authVisible = false;
		},
		sure() {
			this.close();
			this.loadData();
		}
	},
	components: { Edit, Auth }
}
</script>

<style scoped>

</style>
