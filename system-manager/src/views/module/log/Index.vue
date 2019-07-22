<template>
	<el-container>
		<el-header class="header-box">
			<div class="right">
				<el-select v-model="sysId" clearable placeholder="请选择系统">
					<el-option :key="item.code" v-for="item in sysIds"
						:label="item.name" :value="item.code"/>
				</el-select>
				<el-date-picker v-model="rangeTime" type="datetimerange"
					start-placeholder="开始日期" range-separator="至" end-placeholder="结束日期"/>
				<el-input placeholder="请输入关键字" v-model="keyword" class="search-input">
					<el-button slot="append" @click="search" icon="el-icon-search"/>
				</el-input>
			</div>
		</el-header>
		<el-main class="main-box">
			<el-table :max-height="tableHeight" :data="tableData" border>
				<el-table-column prop="sysName" label="系统名称" width="150"/>
				<el-table-column prop="logTypeName" label="日志类型" width="100"/>
				<el-table-column prop="operateInfo" label="操作信息" :show-overflow-tooltip="true"/>
				<el-table-column prop="requestUrl" label="请求地址" :show-overflow-tooltip="true"/>
				<el-table-column prop="userId" label="操作用户" width="100"/>
				<el-table-column prop="ip" label="用户IP" width="130"/>
				<el-table-column prop="recordTime" label="记录时间" width="170"/>
				<el-table-column label="操作" width="80">
					<template slot-scope="scope">
						<el-button-group>
							<el-button @click="detail(scope.$index, scope.row)"
								 title="日志详情"icon="el-icon-info" size="mini"/>
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
		<detail :is-show="detailVisible" :data="detailData"
			@sure="detailSure" @close="detailClose"/>
	</el-container>
</template>

<script>
import Detail from "./Detail";

export default {
	data() {
		return {
			tableData: [],
			detailVisible: false,
			detailData: {},
			keyword: "",
			sysId: "",
			rangeTime: [],
			sysIds: [],
			currentPage: 1,
			pageSize: 10,
			totalCount: 0,
			tableHeight: this.$system.limitHeight(112)
		};
	},
	created() {
		this.loadData();
		this.sysIds = this.$system.getDictList("sys_flag")
	},
	methods: {
		//获取用户列表
		loadData() {
			const self = this;
			let data = {
				current: self.currentPage,
				size: self.pageSize
			};
			if (self.keyword) {
				data.keyword = self.keyword;
			}
			if (self.sysId) {
				data.sysId = self.sysId;
			}
			if (self.rangeTime && self.rangeTime.length == 2) {
				data.startTime = self.rangeTime[0];
				data.endTime = self.rangeTime[1];
			}
			self.$request({
				url: "/log/page",
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
		detailClose() {
			this.detailVisible = false;
		},
		detailSure() {
			this.detailVisible = false;
			this.loadData();
		},
		detail(index, row) {
			const self = this;
			self.detailVisible = true;
			self.detailStatus = true;
			self.detailData = row;
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
	components: { Detail }
}
</script>

<style scoped>

</style>
