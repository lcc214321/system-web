<template>
    <avue-crud :option="option" :data="data"/>
</template>

<script>
import OrgApi from '@/api/OrgApi';

export default {
    data() {
        return {
            data: [],
            option: {
                border: true,
                column: [{
                    label: '事件',
                    prop: 'event',
                    align: 'left',
                    width: 200
                }],
            }
        };
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
                let info = self.$cache.info;
                if (info) {
                    if (info.user.userId != "admin" && (!info.roles || !info.roles.includes("admin"))) {
                        data.orgId = info.user.orgId;
                    } else {
                        data.parentId = 0;
                    }
                } else {
                    data.orgId = "-";
                }
            }
            OrgApi.list(data).then(result => {
                if (result) {
                    result.forEach(item => {
                        item.level = 0;
                        if (item.hasChildren) {
                            item.children = [{}];
                        }
                    });
                    self.tableData = result;
                }
            });
        },
        remote(row, callback) {
            const self = this;
            if (self.treeCache && self.treeCache.has(row.orgId)) {
                callback(self.treeCache.get(row.orgId))
                return;
            }
            OrgApi.list({parentId: row.orgId}).then(result => {
                if (result) {
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
        move(direct, row) {
            const self = this;
            OrgApi[direct]({
                id: row.id,
                parentId: row.parentId,
                sort: row.sort
            }).then(result => {
                if (result) {
                    self.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    self.treeCache.clear();
                    self.loadData();
                }
            });
        },
        //删除
        del(index, row) {
            const self = this;
            self.$confirm('确认删除该机构吗?', '提示', {
                type: 'warning'
            }).then(() => {
                OrgApi.del(row.id).then(result => {
                    if (result) {
                        self.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        self.treeCache.clear();
                        self.loadData();
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
