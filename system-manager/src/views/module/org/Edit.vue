<template>
    <el-dialog :visible="isShow" :title="title" @open="open" @close="close" width="450px"
        :close-on-click-modal="closeOn" :close-on-press-escape="closeOn">
        <div class="dialog-body">
            <el-form ref="form" :model="data" :rules="rules" label-width="100px" size="small">
                <el-form-item label="机构编码" prop="orgId" v-if="type != 'addChild'">
                    <el-input v-model="data.orgId" placeholder="请输入机构编码前缀" maxlength="50" :readonly="type != 'add'"/>
                </el-form-item>
                <el-form-item label="机构名称" prop="orgName">
                    <el-input v-model="data.orgName" placeholder="请输入机构名称" maxlength="50" />
                </el-form-item>
                <el-form-item label="机构类型" prop="orgType">
                    <el-select v-model="data.orgType" placeholder="请选择机构类型">
                        <template v-if="orgTypeList && orgTypeList.length">
                            <template v-for="itme in orgTypeList">
                                <el-option :label="itme.name" :value="itme.code"/>
                            </template>
                        </template>
                    </el-select>
                </el-form-item>
                <el-form-item label="所属地区" prop="areaId">
                    <el-select v-model="data.areaId" :disabled="type != 'addChild'">
                        <template v-if="areaList && areaList.length">
                            <template v-for="itme in areaList">
                                <el-option :label="itme.name" :value="itme.id"/>
                            </template>
                        </template>
                    </el-select>
                </el-form-item>
                <el-form-item label="联系人">
                    <el-input v-model="data.person" placeholder="请输入联系人" maxlength="50"/>
                </el-form-item>
                <el-form-item label="联系电话" prop="telephone">
                    <el-input v-model="data.telephone" placeholder="请输入联系电话" maxlength="50"/>
                </el-form-item>
                <el-form-item label="住址">
                    <el-input v-model="data.address" placeholder="请输入住址" maxlength="200"/>
                </el-form-item>
                <el-form-item label="电子邮箱" prop="email">
                    <el-input v-model="data.email" placeholder="请输入电子邮箱" maxlength="100"/>
                </el-form-item>
                <el-form-item label="传真" prop="fax">
                    <el-input v-model="data.fax" placeholder="请输入传真号码" maxlength="20"/>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="data.description" type="textarea"
                        :autosize="{minRows: 4, maxRows: 4}" placeholder="请输入描述" maxlength="1000"/>
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close" size="small">取消</el-button>
            <el-button type="primary" @click="sure" size="small">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { Common } from "basic-assets";

export default {
    data() {
        return {
            closeOn: false,
            orgTypeList: [],
            areaList: [],
            rules: {
                orgId: [{
                    required: true,
                    message: "请输入机构编码前缀",
                    trigger: "blur"
                }, {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message: '机构编码前缀只能为英文、数字、下划线',
                    trigger: "blur"
                }],
                orgName: [{
                    required: true,
                    message: "请输入机构名称",
                    trigger: "blur"
                }],
                orgType: [{
                    required: true,
                    message: "请选择机构类型",
                    trigger: "change"
                }],
                areaId: [{
                    required: true,
                    message: "请选择所属地区",
                    trigger: "change"
                }],
                telephone: [{
                    pattern: /^1[34578]\d{9}$/,
                    message: "电话号码格式错误",
                    trigger: "blur"
                }],
                email: [{
                    type: 'email',
                    message: '请输入正确的邮箱地址',
                    trigger: 'blur',
                }]
            }
        }
    },
    props: {
        isShow: Boolean,
        title: String,
        data: Object,
        type: String
    },
    created() {
        this.orgTypeList = this.$system.getDictList("org_type");
    },
    watch: {
        data: function(newData, oldData) {
            const self = this;
            if (self.type == "add" || newData.areaId == 0) {
                self.areaList = [{id: 0, name: "中华人民共和国"}];
            } else if (newData.parentAreaId >= 0) {
                self.$request({
                    url: "/area/list",
                    data: {parentId : newData.parentAreaId},
                    success (result) {
                        if (result) {
                            self.areaList = result;
                        }
                    }
                });
            }
        }
    },
    methods: {
        open() {
            this.$refs.form && this.$refs.form.clearValidate();
        },
        sure() {
            const self = this;
            self.$refs.form.validate(valid => {
                if (valid) {
                    switch (self.type) {
                        case "add":
                            let cnAreaId = "100000";
                            if (!self.data.orgId.endsWith(cnAreaId)) {
                                self.data.orgId += cnAreaId;
                            }
                            break;
                        case "addChild":
                            self.data.orgId = self.data.parentId.slice(0, -6) + self.data.areaId;
                            break;
                    }
                    if (self.data.areaId) {
                        self.data.areaName = self.$system.getAreaName(self.data.areaId);
                    }
                    self.$request({
                        url: `/org/${self.type != 'edit' ? 'add' : 'mod'}`,
                        data: self.data,
                        success(result) {
                            if (result === true) {
                                self.$message({
                                    type: "success",
                                    message: "保存成功!"
                                });
                                self.$emit("sure");
                            }
                        }
                    });
                } else {
                    return false;
                }
            });
        },
        close() {
            this.$emit("close");
        }
    }
}
</script>

<style scoped>
.el-select {
    display: block;
}
</style>
