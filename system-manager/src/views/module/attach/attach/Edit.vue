<template>
    <el-dialog :title="title" :visible="isShow" @open="open" @close="close" width="450px"
        v-loading="loading" element-loading-background="rgba(255, 255, 255, 0.1)"
        :close-on-click-modal="closeOn" :close-on-press-escape="closeOn">
        <div class="dialog-body">
            <el-form ref="form" :model="data" :rules="rules" label-width="100px" size="small">
                <el-form-item label="业务模型" prop="domainId">
                    <el-input v-model="data.domainId" maxlength="50" :readonly="!isAdd"/>
                </el-form-item>
                <el-form-item label="目标编号" prop="targetId">
                    <el-input v-model="data.targetId" maxlength="50" :readonly="!isAdd"/>
                </el-form-item>
                <el-form-item label="字段标识" prop="fieldId">
                    <el-input v-model="data.fieldId" maxlength="50" :readonly="!isAdd"/>
                </el-form-item>
                <el-form-item label="文件上传" prop="file">
                    <el-input v-model="data.file" v-show="false"/>
                    <el-upload ref="upload" name="file" :action="uploadAction" :auto-upload="autoUpload"
                        :data="data" :show-file-list=false :multiple=false :on-change="changeFile"
                        :on-success="success" :with-credentials="true" :on-error="error">
                        <el-button size="small" type="primary" icon="el-icon-upload">上传附件</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="文件名称">
                    <el-input v-model="data.name" readonly="true"/>
                </el-form-item>
                <template v-if="!isAdd">
                    <el-form-item label="文件地址">
                        <el-input v-model="data.url" readonly="true"/>
                    </el-form-item>
                    <el-form-item label="文件类型">
                        <el-input v-model="data.type" readonly="true"/>
                    </el-form-item>
                    <el-form-item label="文件大小">
                        <el-input v-model="data.size" readonly="true"/>
                    </el-form-item>
                    <el-form-item label="相对地址">
                        <el-input v-model="data.presignedUrl" readonly="true"/>
                    </el-form-item>
                </template>
                <el-form-item label="存储板块">
                    <el-input v-model="data.bucketName" readonly="true"/>
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
            loading: false,
            autoUpload: false,
            uploadFile: null,
            rules: {
                domainId: [{
                    required: true,
                    message: '请输入业务模型',
                    trigger: 'blur'
                }],
                targetId: [{
                    required: true,
                    message: '请输入目标编号',
                    trigger: 'blur'
                }],
                fieldId: [{
                    required: true,
                    message: '请输入字段标识',
                    trigger: 'blur'
                }],
                file: [{
                    required: true,
                    message: '请选择文件',
                    trigger: 'blur'
                }]
            }
        }
    },
    computed: {
        uploadAction() {
            return `${this.$system.cache.config.baseUrl}/attach/${this.isAdd ? 'add' : 'mod'}`;
        }
    },
    props: {
        isShow: Boolean,
        title: String,
        data: Object,
        isAdd: Boolean
    },
    methods: {
        open() {
            this.$refs.form && this.$refs.form.clearValidate();
        },
        changeFile(file, fileList) {
            if (file.status === "ready") {
                this.uploadFile = file;
                this.$set(this.data, "file", file.name);
                this.$set(this.data, "name", file.name);
            } else {
                file.status = "ready";
                delete file.response;
            }
        },
        sure() {
            const self = this;
            self.$refs.form.validate(valid => {
                if (valid && self.uploadFile && self.uploadFile.name) {
                    self.loading = true;
                    self.$refs.upload.submit();
                }
            });
        },
        success(response, file, fileList) {
            const self = this;
            self.loading = false;
            if (response.code == "200") {
                self.uploadFile = null;
                self.$message({
                    type: "success",
                    message: "提交成功!"
                });
                self.$emit("sure");
            } else {
                self.$message({
                    type: "error",
                    message: response.result
                });
                return false;
            }
        },
        error(err, file) {
            const self = this;
            self.loading = false;
            self.$message({
                type: "error",
                message: "上传失败!"
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
