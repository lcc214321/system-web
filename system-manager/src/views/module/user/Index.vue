<template>
	<el-container>
		<el-aside width="200px" class="left-box">
			<el-tree :props="treeProps" :load="loadNode" @node-click="nodeClick"
				:highlight-current="true" :expand-on-click-node="false" lazy>
			</el-tree>
		</el-aside>
		<el-main class="right-box">
			<el-header class="header-box">
				<div class="left">
					<el-button type="primary" @click="add" icon="el-icon-circle-plus-outline"
						v-if="$system.hasPermission('sys:user:add')">新增</el-button>
				</div>
				<div class="right">
					<el-input placeholder="请输入关键字" v-model="keyword" class="search-input">
						<el-button @click="search" slot="append" icon="el-icon-search"/>
					</el-input>
				</div>
			</el-header>
			<el-main class="main-box">
				<el-table :max-height="tableHeight" :data="tableData" border>
					<el-table-column label="用户名" prop="userId" :show-overflow-tooltip="true"/>
					<el-table-column label="真实姓名" prop="realName" :show-overflow-tooltip="true"/>
					<el-table-column label="所属机构" prop="orgName" :show-overflow-tooltip="true"/>
					<el-table-column label="性别" prop="gender" width="50" />
					<el-table-column label="联系电话" prop="mobilePhone" width="120" />
					<el-table-column label="状态" prop="enable" width="60">
						<template slot-scope="scope">
							{{ scope.row.enable ? '启用': '禁用' }}
						</template>
					</el-table-column>
					<el-table-column label="操作" width="170">
						<template slot-scope="scope">
							<el-button-group>
								<el-button @click="edit(scope.$index, scope.row)"
									title="编辑" size="mini" icon="el-icon-edit"
									v-if="$system.hasPermission('sys:user:mod')"/>
								<el-button @click="resetPwd(scope.$index, scope.row)"
									title="密码重置" size="mini" icon="el-icon-setting"
									v-if="$system.hasPermission('sys:user:resetPwd')"/>
		                		<el-button @click="del(scope.$index, scope.row)"
									title="删除" size="mini" icon="el-icon-delete"
									v-if="$system.hasPermission('sys:user:del') && scope.row.userId != 'admin'"/>
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
				:data="editData" @sure="sure" @close="close" />
		</el-main>
	</el-container>
</template>

<script>
import Edit from "./Edit";
import { Common } from "basic-assets";

export default {
	data() {
		return {
			keyword: "",
			tableData: [],
			editVisible: false,
			isAdd: true,
			editTitle: "",
			editData: {},
			treeProps: {
				label: "orgName",
				isLeaf: (data) => !data.hasChildren
			},
			org: {},
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
		loadNode(node, resolve) {
			const self = this;
			let data = {};
			if (node.level == 0) {
				let currInfo = self.$system.cache.currInfo;
				if (currInfo) {
					if (currInfo.user.userId != "admin" && (!currInfo.roles || !currInfo.roles.includes("admin"))) {
						data.orgId = currInfo.user.orgId;
					} else {
						data.parentId = 0;
					}
				} else {
					data.orgId = "-";
				}
			} else {
				data.parentId = node.data.orgId;
			}
			self.$request({
				url: "/org/list",
				data,
				success(result) {
					if (node.level == 0) {
						let list = [{orgId: 0, orgName: "全部", hasChildren: false}];
						if (result) {
							list.push(...result);
						}
						resolve(list);
					} else if (result) {
						resolve(result);
					}
				}
			});
		},
		nodeClick(data, node, event) {
			this.org = data;
			this.currentPage = 1;
			this.loadData();
		},
		loadData() {
			const self = this;
			let data = {
				current: self.currentPage,
				size: self.pageSize
			}
			if (self.keyword) {
				data.keyword = self.keyword;
			}
			if (self.org && self.org.orgId) {
				data.orgId = self.org.orgId;
			}
			self.$request({
				url: "/user/page",
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
		//新增用户
		add() {
			const self = this;
			if (!self.org || !self.org.orgId) {
				self.$message({
					type: "warning",
					message: "请先选择机构"
				});
				return false;
			}
			self.editVisible = true;
			self.isAdd = true;
			self.editTitle = "新增用户";
			self.editData = {
				orgId: self.org.orgId,
				orgName: self.org.orgName,
				areaId: self.org.areaId,
				areaName: self.org.areaName,
				gender: "男",
				enable: true
			};
		},
		//编辑用户
		edit(index, row) {
			const self = this;
			self.editVisible = true;
			self.isAdd = false;
			self.editTitle = "编辑用户";
			self.editData = Common.clone(row);
		},
		//重置密码
		resetPwd(index, row) {
			const self = this;
			self.$confirm('是否重置用户密码？', '重置密码', {
				type: 'warning'
			}).then(() => {
				self.$request({
					url: "/user/resetPwd",
					data: {id: row.id},
					success(result) {
						if (result) {
							self.$message({
								message: '重置成功',
								type: 'success'
							});
						}
					}
				});
			}).catch(() => {});
		},
		//删除用户
		del(index, row) {
			const self = this;
			self.$confirm('确认删除该记录吗?', '删除用户', {
				type: 'warning'
			}).then(() => {
				self.$request({
					url: "/user/del",
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
		sure() {
			this.close();
			this.loadData();
		},
		close() {
			this.editVisible = false;
		}
	},
	components: { Edit }
}
</script>

<style scoped>

</style>
