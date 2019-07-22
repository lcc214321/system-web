<template>
	<el-container>
		<el-header class="header-box">
			<div class="left">
				<el-button type="primary" @click="add" icon="el-icon-circle-plus-outline"
					v-if="$system.hasPermission('sys:appVersion:add')">新增</el-button>
			</div>
			<div class="right">
				<el-input placeholder="请输入关键字" v-model="keyword" class="search-input">
					<el-button slot="append" @click="search" icon="el-icon-search"/>
				</el-input>
			</div>
		</el-header>
		<el-main class="main-box">
			<el-table :max-height="tableHeight" :data="tableData" border>
				<el-table-column prop="version" label="版本号" width="150"/>
				<el-table-column prop="content" label="更新内容" :show-overflow-tooltip="true"/>
				<el-table-column label="是否强制更新" width="120">
					<template slot-scope="scope">{{ isForce(scope.row.enforceable) }}</template>
				</el-table-column>
				<el-table-column prop="publisher" label="发布人" width="150"/>
				<el-table-column prop="publishTime" label="发布时间" width="180"/>
				<el-table-column label="操作" width="150">
					<template slot-scope="scope">
						<el-button-group>
							<el-button @click="download(scope.row)"
								size="mini" icon="el-icon-download" title="下载"/>
							<el-button @click="del(scope.$index, scope.row)"
								size="mini" icon="el-icon-delete" title="删除"
								v-if="$system.hasPermission('sys:appVersion:del')"/>
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
		<edit :is-show="editVisible" :data="editData" @sure="sure" @close="close"/>
	</el-container>
</template>

<script>
import Edit from "./Edit";
import {Common} from "basic-assets";

export default {
	data() {
		return {
			keyword: "",
			tableData: [],
			editVisible: false,
			editData: {},
			pageSize: 10,
			currentPage: 1,
			totalCount: 0,
			tableHeight: this.$system.limitHeight(112)
		};
	},
	created() {
		this.loadData();
	},
	methods: {
		//获取版本列表
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
				url: "/appVersion/page",
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
		//新增版本
		add() {
			this.editVisible = true;
			this.editData = {};
		},
		close() {
			this.editVisible = false;
		},
		sure() {
			this.editVisible = false;
			this.loadData();
		},
		download(data) {
			if (!data || !data.id) {
				return false;
			}
			const self = this;
			self.$request({
				url: "/attach/find",
				data: {
					domainId: "LOC_APP_VERSION",
					targetId: data.id,
					fieldId: "apk"
				},
				success(result) {
					if (result && result.url) {
						Common.download(`${self.$system.cache.config.baseUrl}/download?name=${result.url}&bucket=${result.bucket}`);
					}
				}
			});
		},
		//删除版本
		del(index, row) {
			const self = this;
			self.$confirm('确认删除该记录吗?', '提示', {
				type: 'warning'
			}).then(() => {
				self.$request({
					url: "/appVersion/del",
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
		isForce(enforceable) {
			return enforceable ? "是": "否";
		}
	},
	components: { Edit }
}
</script>

<style scoped>

</style>
