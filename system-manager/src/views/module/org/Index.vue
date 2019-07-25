<template>
	<el-container>
		<el-header class="header-box">
			<div class="left">
				<el-button type="primary" @click="add" icon="el-icon-circle-plus-outline"
					v-if="$system.hasPermission('sys:org:add')">新增</el-button>
			</div>
			<div class="right">
				<el-input placeholder="请输入关键字" v-model="keyword" class="search-input">
					<el-button @click="search" slot="append" icon="el-icon-search"/>
				</el-input>
			</div>
		</el-header>
		<el-main class="main-box">
			<el-table :max-height="tableHeight" :data="tableData" border>
				<el-table-column label="机构编码" prop="orgId" width="200"/>
				<el-table-tree-column label="机构名称" prop="orgName" :expand-all="false"
					:remote="remote" tree-key="orgId" parent-key="parentId" levelKey="level"
					file-icon="icon icon-file" folder-icon="icon icon-folder"
					:show-overflow-tooltip="true"/>
				<el-table-column label="机构类型" prop="orgTypeName" width="150"/>
				<el-table-column label="所属地区" prop="areaName" width="200"/>
				<el-table-column label="操作" width="250">
					<template slot-scope="scope">
						<el-button-group>
							<el-button @click="addChild(scope.$index, scope.row)"
								size="mini" icon="el-icon-circle-plus-outline" title="新增子级"
								v-if="$system.hasPermission('sys:org:add')"/>
							<el-button @click="edit(scope.$index, scope.row)"
								size="mini" icon="el-icon-edit" title="编辑"
								v-if="$system.hasPermission('sys:org:mod')"/>
							<el-button @click="up(scope.$index, scope.row)"
								size="mini" icon="el-icon-arrow-up" title="上移"
								v-if="$system.hasPermission('sys:org:mod')"/>
							<el-button @click="down(scope.$index, scope.row)"
								size="mini" icon="el-icon-arrow-down" title="下移"
								v-if="$system.hasPermission('sys:org:mod')"/>
							<el-button @click="del(scope.$index, scope.row)"
								size="mini" icon="el-icon-delete" title="删除"
								v-if="$system.hasPermission('sys:org:del') && !scope.row.hasChildren"/>
						</el-button-group>
					</template>
				</el-table-column>
			</el-table>
		</el-main>
		<edit :is-show="editVisible" :title="editTitle" :data="editData"
			:type="editType" @sure="sure" @close="close"/>
	</el-container>
</template>

<script>
import Edit from "./Edit";
import { Common } from "basic-assets";

export default {
	data() {
		return {
			tableData: [],
			keyword: "",
			editVisible: false,
			editTitle: "",
			editData: {},
			editType: "",
			treeCache: new Map(),
			tableHeight: 1000
		}
	},
	created() {
		this.loadData();
	},
	methods: {
		loadData() {
			const self = this;
			let data = {};
			if (self.keyword) {
				data.keyword = self.keyword;
			} else {
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
			}
			self.$request({
				url: "/org/list",
				data,
				success(result) {
					if (result) {
						result.forEach(item => {
							item.level = 0;
							if (item.hasChildren) {
								item.children = [{}];
							}
						});
						self.tableData = result;
					}
				}
			});
		},
		remote(row, callback) {
			const self = this;
			if (self.treeCache && self.treeCache.has(row.orgId)) {
				callback(self.treeCache.get(row.orgId))
				return;
			}
			self.$request({
				url: "/org/list",
				data: {parentId: row.orgId},
				success(result) {
					result.forEach(item => {
						item.level = row.level + 1;
						if (item.hasChildren) {
							item.children = [{}];
						}
					});
					self.treeCache.set(row.orgId, result);
					callback(result);
				}
			});
		},
		search() {
			this.loadData();
		},
		//新增
		add() {
			const self = this;
			self.editVisible = true;
			self.editType = "add";
			self.editTitle = "新增机构";
			self.editData = {
				parentId: 0,
				areaId: 0,
				areaName: "中华人民共和国"
			};
		},
		//新增子机构
		addChild(index, row) {
			const self = this;
			self.editVisible = true;
			self.editType = "addChild";
			self.editTitle = "新增子机构";
			self.editData = {
				parentId: row.orgId,
				orgType: row.orgType,
				parentAreaId: row.areaId
			};
			self.treeCache.clear();
		},
		//编辑
		edit(index, row) {
			const self = this;
			self.editVisible = true;
			self.editType = "edit";
			self.editTitle = "编辑机构";
			self.editData = Common.clone(row);
		},
		up(index, row) {
			this.move("up", row);
		}, //下移
		down(index, row) {
			this.move("down", row);
		},
		move(direct, row) {
			const self = this;
			self.$request({
				url: `/org/${direct}`,
				data: {
					id: row.id,
					parentId: row.parentId,
					sort: row.sort
				},
				success: function(result) {
					if (result) {
						self.$message({
							message: '操作成功',
							type: 'success'
						});
						self.treeCache.clear();
						self.loadData();
					}
				}
			});
		},
		//删除
		del(index, row) {
			const self = this;
			self.$confirm('确认删除该机构吗?', '提示', {
				type: 'warning'
			}).then(() => {
				self.$request({
					url: "/org/del",
					data: {id: row.id},
					success(result) {
						if (result) {
							self.$message({
								message: '删除成功',
								type: 'success'
							});
							self.treeCache.clear();
							self.loadData();
						}
					}
				});
			}).catch(() => {});
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
