<template>
	<el-container>
		<el-header class="header-box">
			<div class="left">
				<el-button type="primary" @click="add" icon="el-icon-circle-plus-outline"
					v-if="$system.hasPermission('sys:dict:add')">新增</el-button>
			</div>
			<div class="right">
				<el-input placeholder="请输入关键字" v-model="keyword" class="search-input">
					<el-button slot="append" @click="search" icon="el-icon-search"/>
				</el-input>
			</div>
		</el-header>
		<el-main class="main-box">
			<el-table :max-height="tableHeight" :data="tableData" border>
				<el-table-column prop="code" label="字典代码" width="150"/>
				<el-table-tree-column :expand-all="false" :remote="remote"
					tree-key="code" parent-key="parentCode" levelKey="level" prop="name"
					file-icon="icon icon-file" folder-icon="icon icon-folder" label="字典名称"
					:show-overflow-tooltip="true"/>
				<el-table-column prop="description" label="描述" :show-overflow-tooltip="true"/>
				<el-table-column label="操作" width="250">
					<template slot-scope="scope">
						<el-button-group>
							<el-button @click="addchild(scope.$index, scope.row)"
								size="mini" icon="el-icon-plus" title="新增子级"
								v-if="$system.hasPermission('sys:dict:add')"/>
							<el-button @click="edit(scope.$index, scope.row)"
								size="mini" icon="el-icon-edit" title="编辑"
								v-if="$system.hasPermission('sys:dict:mod')"/>
							<el-button @click="up(scope.$index, scope.row)"
								size="mini" icon="el-icon-arrow-up" title="上移"
								v-if="$system.hasPermission('sys:dict:mod')"/>
							<el-button @click="down(scope.$index, scope.row)"
								size="mini" icon="el-icon-arrow-down" title="下移"
								v-if="$system.hasPermission('sys:dict:mod')"/>
							<el-button @click="del(scope.$index, scope.row)"
								size="mini" icon="el-icon-delete" title="删除"
								v-if="$system.hasPermission('sys:dict:del') && !scope.row.hasChildren"/>
						</el-button-group>
					</template>
				</el-table-column>
			</el-table>
		</el-main>
		<edit :title="editTitle" :is-show="editVisible" :isAdd="isAdd"
			:data="editData" @sure="sure" @close="close"/>
	</el-container>
</template>

<script>
import Edit from "./Edit";
import { Common } from 'basic-assets';

export default {
	data() {
		return {
			keyword: "",
			tableData: [],
			editTitle: "",
			editVisible: false,
			editData: {},
			isAdd: true,
			treeCache: new Map(),
			tableHeight: this.$system.limitHeight(70)
		};
	},
	created() {
		this.loadData();
	},
	methods: {
		//获取字典列表
		loadData() {
			const self = this;
			let data = {};
			if (self.keyword) {
				data.keyword = self.keyword;
			} else {
				data.parentCode = 0;
			}
			self.$request({
				url: "/dict/list",
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
			if (self.treeCache && self.treeCache.has(row.code)) {
				callback(self.treeCache.get(row.code))
				return;
			}
			self.$request({
				url: "/dict/list",
				data: {parentCode: row.code},
				success(result) {
					result.forEach(item => {
						item.level = row.level + 1;
						if (item.hasChildren) {
							item.children = [{}];
						}
					});
					self.treeCache.set(row.code, result);
					callback(result);
				}
			});
		},
		search() {
			this.loadData();
		},
		//新增字典
		add() {
			const self = this;
			self.editVisible = true;
			self.editTitle = "新增字典";
			self.editData = {parentCode: 0};
			self.isAdd = true;
		},
		//新增子机构
		addchild(index, row) {
			const self = this;
			self.editVisible = true;
			self.editTitle = "新增子级";
			self.editData = {parentCode: row.code};
			self.isAdd = true;
			self.treeCache.clear();
		},
		//编辑字典
		edit(index, row) {
			const self = this;
			self.editVisible = true;
			self.editTitle = "编辑字典";
			self.editData = Common.clone(row);
			self.isAdd = false;
		},
		//上移
		up(index, row) {
			this.move("up", row);
		}, //下移
		down(index, row) {
			this.move("down", row);
		},
		move(direct, row) {
			const self = this;
			self.$request({
				url: `/dict/${direct}`,
				data: {
					id: row.id,
					parentCode: row.parentCode,
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
		//删除字典
		del(index, row) {
			const self = this;
			self.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				self.$request({
					url: "/dict/del",
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
			this.editVisible = false;
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
