<template>
    <el-container>
        <el-header class="header-box">
            <div class="left">
                <el-button type="primary" @click="add" icon="el-icon-circle-plus-outline"
                    v-if="$system.isAuth('sys:bucket:add')">新增</el-button>
            </div>
            <div class="right">
                <el-input placeholder="请输入关键字" v-model="keyword" class="search-input">
                    <el-button slot="append" @click="search" icon="el-icon-search"/>
                </el-input>
            </div>
        </el-header>
        <el-main class="main-box">
            <el-table :max-height="tableHeight" :data="tableData" border>
                <el-table-column prop="bucket" label="板块标识" width="180"/>
                <el-table-column prop="name" label="板块名称" width="180"/>
                <el-table-column prop="count" label="附件数量" width="180"/>
                <el-table-column prop="description" label="描述" :show-overflow-tooltip="true"/>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button-group>
                            <el-button @click="edit(scope.$index, scope.row)"
                                size="mini" icon="el-icon-edit" title="编辑"
                                v-if="$system.isAuth('sys:bucket:mod')"/>
                            <el-button @click="del(scope.$index, scope.row)"
                                size="mini" icon="el-icon-delete" title="删除"
                                v-if="$system.isAuth('sys:bucket:del')"/>
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
        <Edit :title="editTitle" :is-show="editVisible" :isAdd="isAdd"
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
            editVisible: false,
            editTitle: "",
            editData: {},
            isAdd: true,
            totalCount: 0,
            pageSize: 10,
            currentPage: 1,
            tableHeight: 1000
        };
    },
    created() {
        this.loadData();
    },
    methods: {
        //获取板块列表
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
                url: "/bucket/page",
                data,
                success(result) {
                    if (result && result.records) {
                        self.tableData = result.records;
                        self.totalCount = result.total;
                    }
                }
            });
        },
        //新增板块
        add() {
            this.editVisible = true;
            this.editTitle = "新增板块";
            this.isAdd = true;
            this.editData = {};
        },
        //编辑板块
        edit(index, row) {
            this.editVisible = true;
            this.editTitle = "编辑板块";
            this.isAdd = false;
            this.editData = Common.clone(row);
        },
        close() {
            this.editVisible = false;
        },
        sure() {
            this.editVisible = false;
            this.loadData();
        },
        //删除板块
        del(index, row) {
            const self = this;
            self.$confirm('确认删除该记录吗?', '提示', {
                type: 'warning'
            }).then(() => {
                self.$request({
                    url: "/bucket/del",
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

</style>
