<template>
	<el-container>
		<el-header class="header-box">
			<div class="left">
				<el-button type="primary" @click="add" icon="el-icon-circle-plus-outline"
					v-if="$system.hasPermission('sys:param:add')">新增</el-button>
			</div>
			<div class="right">
				<el-input placeholder="请输入关键字" v-model="keyword" class="search-input">
					<el-button @click="search" slot="append" icon="el-icon-search"/>
				</el-input>
			</div>
		</el-header>
		<el-main class="main-box">
			<el-table :data="tableData" :max-height="tableHeight" border>
				<el-table-column prop="paramKey" label="参数标识" width="200"/>
				<el-table-column prop="paramValue" label="参数值" width="280"/>
				<el-table-column prop="paramLabel" label="参数中文名" width="200"/>
				<el-table-column prop="description" label="描述" :show-overflow-tooltip="true"/>
				<el-table-column label="操作" width="150">
					<template slot-scope="scope">
						<el-button-group>
							<el-button @click="edit(scope.$index, scope.row)"
								title="编辑" size="mini" icon="el-icon-edit"
									v-if="$system.hasPermission('sys:param:mod')"/>
							<el-button @click="del(scope.$index, scope.row)"
								title="删除" size="mini" icon="el-icon-delete"
									v-if="$system.hasPermission('sys:param:del')"/>
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
		<edit :is-show="editVisible" :title="editTitle" :is-add="isAdd"
			:data="editData" @sure="sure" @close="close"/>
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
			editTitle: "",
			isAdd: true,
			editData: {},
			currentPage: 1,
			pageSize: 10,
			totalCount: 0,
			tableHeight: 1000
		};
	},
	created() {
		this.loadData();
	},
	methods: {
		//获取参数列表
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
				url: "/param/page",
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
		//新增参数
		add() {
			const self = this;
			self.editVisible = true;
			self.editTitle = "新增参数";
			self.isAdd = true;
			self.editData = {enable: true};
		},
		//编辑参数
		edit(index, row) {
			const self = this;
			self.editVisible = true;
			self.editTitle = "编辑参数";
			self.isAdd = false;
			self.editData = Common.clone(row);
		},
		close() {
			this.editVisible = false;
		},
		sure() {
			this.editVisible = false;
			this.loadData();
		},
		//删除参数
		del(index, row) {
			const self = this;
			self.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				self.$request({
					url: "/param/del",
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
		}
	},
	components: { Edit }
}
</script>

<style scoped>

</style>
