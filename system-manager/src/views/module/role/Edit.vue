<template>
    <el-dialog :visible="isShow" :title="title" @open="open" @close="close" width="450px"
        :close-on-click-modal="closeOn" :close-on-press-escape="closeOn">
        <div class="dialog-body">
            <el-form ref="form" :model="data" :rules="rules" label-width="100px" size="small">
                <el-form-item label="角色编号" prop="roleId">
                    <el-input v-model="data.roleId" placeholder="请输入角色编号" :readonly="!isAdd" maxlength="50"/>
                </el-form-item>
                <el-form-item label="角色名称" prop="roleName">
                    <el-input v-model="data.roleName" placeholder="请输入角色名称" maxlength="50"/>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input v-model="data.description" type="textarea"
                        :autosize="{minRows: 4, maxRows: 4}" placeholder="请输入描述" maxlength="1000"/>
                </el-form-item>
                <el-form-item label="是否启用">
                    <el-switch v-model="data.enable" :disabled="data.roleId == 'admin'"/>
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
            rules: {
                roleId: [{
                    required: true,
                    message: "请输入角色编号",
                    trigger: "blur"
                }, {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message: '角色编号只能为英文、数字、下划线',
                    trigger: "blur"
                }],
                roleName: [{
                    required: true,
                    message: "请输入角色名称",
                    trigger: "blur"
                }]
            }
        };
    },
    props: {
        isShow: Boolean,
        title: String,
        isAdd: Boolean,
        data: Object
    },
    methods: {
        open() {
            this.$refs.form && this.$refs.form.clearValidate();
        },
        sure() {
            const self = this;
            self.$refs.form.validate(valid => {
                if (valid) {
                    self.$request({
                        url: `/role/${self.isAdd ? 'add' : 'mod'}`,
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

</style>
