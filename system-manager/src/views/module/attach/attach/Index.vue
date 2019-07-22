<template>
	<el-container>
		<el-aside width="200px">
			<el-table ref="bucketTable" :max-height="tableHeight + 92" :data="bucketList"
				highlight-current-row @current-change="bucketClick" border>
				<el-table-column prop="name" label="存储板块" :show-overflow-tooltip="true"/>
			</el-table>
		</el-aside>
		<el-main class="right-box">
			<el-header class="header-box">
				<div class="left">
					<el-button type="primary" @click="add" icon="el-icon-circle-plus-outline"
						v-if="$system.hasPermission('sys:attach:add')">新增</el-button>
				</div>
				<div class="right">
					<el-input placeholder="请输入关键字" v-model="keyword" class="search-input">
						<el-button slot="append" @click="search" icon="el-icon-search"/>
					</el-input>
				</div>
			</el-header>
			<el-table :max-height="tableHeight" :data="tableData" border>
				<el-table-column prop="name" label="附件名称" :show-overflow-tooltip="true"/>
				<el-table-column prop="url" label="附件地址" :show-overflow-tooltip="true"/>
				<el-table-column prop="bucketName" label="存储板块" :show-overflow-tooltip="true" width="130"/>
				<el-table-column prop="type" label="附件类型" width="100"/>
				<el-table-column prop="size" label="附件大小" width="100"/>
				<el-table-column label="操作" width="180">
					<template slot-scope="scope">
						<el-button-group>
							<el-button @click="download(scope.$index, scope.row)"
								size="mini" icon="el-icon-download" title="下载"/>
							<el-button @click="edit(scope.$index, scope.row)"
								size="mini" icon="el-icon-edit" title="编辑"
								v-if="$system.hasPermission('sys:attach:mod')"/>
							<el-button @click="del(scope.$index, scope.row)"
								size="mini" icon="el-icon-delete" title="删除"
								v-if="$system.hasPermission('sys:attach:del')"/>
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
		<Edit :title="editTitle" :is-show="editVisible" :data="editData"
			:isAdd="isAdd" @sure="sure" @close="close"/>
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
			bucketList: [],
			firstBucket: {bucket: "all", name: "全部"},
			bucket: null,
			editVisible: false,
			editTitle: "",
			editData: {},
			isAdd: true,
			currentPage: 1,
			pageSize: 10,
			totalCount: 0,
			tableHeight: this.$system.limitHeight(153)
		};
	},
	created() {
		const self = this;
		self.loadData();
		self.loadBacketList();
	},
	methods: {
		//获取附件列表
		loadData() {
			const self = this;
			let data = {
				current: self.currentPage,
				size: self.pageSize
			};
			if (self.keyword) {
				data.keyword = self.keyword;
			}
			if (self.bucket && self.bucket.bucket && self.bucket.bucket != "all") {
				data.bucket = self.bucket.bucket;
			}
			self.$request({
				url: "/attach/page",
				data,
				success(result) {
					if (result && result.records) {
						self.tableData = result.records;
						self.totalCount = result.total;
					}
				}
			});
		},
		loadBacketList() {
			const self = this;
			self.bucketList = [self.firstBucket];
			self.$request({
				url: "/bucket/list",
				success(result) {
					if (result && result.length) {
						self.bucketList = [self.firstBucket, ...result];
					}
					setTimeout(() => self.$refs.bucketTable.setCurrentRow(self.firstBucket), 300);
				}
			});
		},
		bucketClick(data) {
			this.bucket = data;
			this.loadData();
		},
		download(index, row) {
			const self = this;
			Common.download(`${self.$system.cache.config.baseUrl}/download?name=${row.url}&bucket=${row.bucket}`);
		},
		//新增附件
		add() {
			const self = this;
			if (!self.bucket || !self.bucket.bucket || self.bucket.bucket == "all") {
				self.$message({
					type: "warning",
					message: "请选择存储板块!"
				});
				return false;
			}
			self.editVisible = true;
			self.editTitle = "新增附件";
			self.editData = {
				bucket: self.bucket.bucket,
				bucketName: self.bucket.bucketName
			};
			self.isAdd = true;
		},
		//编辑附件
		edit(index, row) {
			const self = this;
			self.editVisible = true;
			self.editTitle = "编辑附件";
			self.editData = Common.clone(row);
			self.isAdd = false;
		},
		close() {
			this.editVisible = false;
		},
		sure() {
			this.editVisible = false;
			this.loadData();
		},
		//删除附件
		del(index, row) {
			const self = this;
			self.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				self.$request({
					url: "/attach/del",
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
		search() {
			this.currentPage = 1;
			this.loadData();
		}
	},
	components: { Edit }
}
</script>

<style scoped>
.left-box {
	padding: 0px;
}
</style>
