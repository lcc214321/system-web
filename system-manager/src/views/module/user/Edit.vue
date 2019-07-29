<template>
    <el-dialog :visible="isShow" :title="title" @open="open" @close="close" width="450px"
        :close-on-click-modal="closeOn" :close-on-press-escape="closeOn">
        <div class="dialog-body">
            <el-form ref="form" :model="data" :rules="rules" label-width="100px" size="small">
                <el-form-item label="用户名" prop="userId">
                    <el-input v-model="data.userId" placeholder="请输入用户名" :readonly="!isAdd" maxlength="50"/>
                </el-form-item>
                <el-form-item label="真实姓名" prop="realName">
                    <el-input v-model="data.realName" placeholder="请输入真实姓名" maxlength="50"/>
                </el-form-item>
                <el-form-item label="联系电话" prop="mobilePhone">
                    <el-input v-model="data.mobilePhone" placeholder="请输入联系电话" maxlength="20"/>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select v-model="data.roleId" placeholder="请选择角色类型"
                        :disabled="data.userId == 'admin'" clearable>
                        <template v-if="roleList && roleList.length">
                            <template v-for="role in roleList">
                                <el-option :label="role.roleName" :value="role.roleId" :disabled="role.roleId == 'admin'"/>
                            </template>
                        </template>
                    </el-select>
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="data.gender">
                        <el-radio-button label="男" />
                        <el-radio-button label="女" />
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="出生年月">
                    <el-date-picker v-model="data.birthday" placeholder="请选择出生年月" type="date"
                        :editable="false" value-format="yyyy-MM-dd" :picker-options="birthdayPickerOptions" />
                </el-form-item>
                <el-form-item label="家庭住址">
                    <el-input v-model="data.address" placeholder="请输入家庭住址" maxlength="200"/>
                </el-form-item>
                <el-form-item label="电子邮箱" prop="email">
                    <el-input v-model="data.email" placeholder="请输入电子邮箱" maxlength="100"/>
                </el-form-item>
                <el-form-item label="是否启用">
                    <el-switch v-model="data.enable" />
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
export default {
    data() {
        return {
            closeOn: false,
            roleList: [],
            rules: {
                userId: [{
                    required: true,
                    message: "请输入用户名",
                    trigger: "blur"
                }, {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message: '用户名只能为英文、数字、下划线',
                    trigger: "blur"
                }, {
                    max: 24,
                    min: 4,
                    message: "用户名长度为4到24字符",
                    trigger: "blur"
                }],
                realName: [{
                    required: true,
                    message: "请输入真实姓名",
                    trigger: "blur"
                }],
                mobilePhone: [{
                    required: true,
                    message: "请输入电话号码",
                    trigger: "blur"
                }, {
                    pattern: /^1[34578]\d{9}$/,
                    message: "电话号码格式错误",
                    trigger: "blur"
                }],
                email: [{
                    type: "email",
                    message: "请输入正确的邮件格式",
                    trigger: "blur"
                }]
            },
            birthdayPickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                }
            }
        };
    },
    props: {
        isShow: Boolean,
        isAdd: Boolean,
        title: String,
        data: Object
    },
    created() {
        this.loadRoleList();
    },
    methods: {
        open() {
            const self = this;
            if (self.data && self.data.userId) {
                self.$request({
                    url: "/user/getUserRole",
                    data: {userId: self.data.userId},
                    success(result) {
                        if (result && result.length > 0) {
                            self.$set(self.data, "roleId", result[0].roleId);
                        }
                    }
                });
            }
            self.$refs.form && self.$refs.form.clearValidate();
        },
        loadRoleList() {
            const self = this;
            self.$request({
                url: "/role/list",
                success(result) {
                    self.roleList = result;
                }
            });
        },
        sure() {
            const self = this;
            self.$refs.form.validate(valid => {
                if (valid) {
                    self.$request({
                        url: `/user/${self.isAdd ? 'add' : 'mod'}`,
                        data: self.data,
                        success(result) {
                            if (result === true) {
                                self.$message({
                                    message: '操作成功',
                                    type: 'success'
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

.el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
}
</style>
