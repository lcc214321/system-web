<template>
    <el-container>
        <el-header class="header-box">
            <div class="right">
                <el-input placeholder="请输入关键字" v-model="keyword" class="search-input">
                    <el-button slot="append" @click="search" icon="el-icon-search"/>
                </el-input>
            </div>
        </el-header>
        <el-main class="main-box">
            <el-table :max-height="tableHeight" :data="tableData" border>
                <el-table-column prop="id" label="地区代码" width="150"/>
                <el-table-tree-column :expand-all="false" :remote="remote"
                    tree-key="id" parent-key="parentId" levelKey="level" prop="name"
                    file-icon="icon icon-file" folder-icon="icon icon-folder" label="地区名称"
                    :show-overflow-tooltip="true"/>
                <el-table-column prop="parentName" label="上级地区" width="250" :show-overflow-tooltip="true"/>
                <el-table-column prop="level" label="地区等级" width="150">
                    <template slot-scope="scope">{{ levelName(scope.row.level) }}</template>
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button-group>
                            <el-button @click="locate(scope.$index, scope.row)"
                                size="mini" icon="el-icon-location" title="定位"/>
                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>
        </el-main>
        <locate :title="locateTitle" :is-show="locateVisible" :locateData="locateData"
            @sure="sure" @cancel="locateClose" @close="locateClose"/>
    </el-container>
</template>

<script>
import Locate from "./Locate";

export default {
    data() {
        return {
            tableData: [],
            keyword: "",
            locateVisible: false,
            locateTitle: "",
            locateData: {},
            treeCache: new Map(),
            tableHeight: 1000
        }
    },
    created() {
        this.loadData();
    },
    methods: {
        //获取列表
        loadData() {
            const self = this;
            let data = {};
            if (self.keyword) {
                data.keyword = self.keyword;
            } else {
                data.parentId = 0;
            }
            self.$request({
                url: "/area/list",
                data,
                success(result) {
                    if (result) {
                        result.forEach(area => {
                            area.parentName = data.parentId == 0 ? "中华人民共和国" : self.$system.getAreaName(area.parentId);
                            if (area.hasChildren) {
                                area.children = [{}];
                            }
                        });
                        self.tableData = result;
                    }
                }
            });
        },
        remote(row, callback) {
            const self = this;
            if (self.treeCache && self.treeCache.has(row.id)) {
                callback(self.treeCache.get(row.id))
                return;
            }
            self.$request({
                url: "/area/list",
                data: {parentId: row.id},
                success(result) {
                    if (result) {
                        result.forEach(area => {
                            area.parentName = row.name;
                            if (area.hasChildren) {
                                area.children = [{}];
                            }
                        });
                        self.treeCache.set(row.id, result);
                        callback(result);
                    }
                }
            });
        },
        search() {
            this.loadData();
        },
        //每次定位触发的函数
        locate(index, row) {
            this.locateVisible = true;
            this.locateTitle = row.name;
            this.locateData = row;
        },
        locateClose() {
            this.locateVisible = false;
        },
        sure() {
            this.locateVisible = false;
        },
        levelName(level) {
            switch (level) {
                case 1:
                    return "省级";
                case 2:
                    return "地市级";
                case 3:
                    return "区县级";
                default:
                    return "-";
            }
        }
    },
    components: { Locate }
}
</script>

<style scoped>

</style>
