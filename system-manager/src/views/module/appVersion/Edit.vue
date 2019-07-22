<template>
	<el-dialog title="新增版本" :visible="isShow" @open="open" @close="close" width="400px"
		v-loading="loading" element-loading-background="rgba(255, 255, 255, 0.1)"
		:close-on-click-modal="closeOn" :close-on-press-escape="closeOn">
		<div class="dialog-body">
			<el-form ref="form" :rules="rules" :model="data"
				label-width="100px" size="small">
				<el-form-item label="版本号" prop="version">
					<el-input v-model="data.version" placeholder="请输入版本号" maxlength="50"/>
				</el-form-item>
				<el-form-item label="版本文件" prop="file">
					<el-input v-model="data.file" v-show="false"/>
					<el-upload ref="upload" name="file" :action="uploadAction" :auto-upload=false
						:data="data" :show-file-list="true" :multiple="false" :on-change="changeFile"
						:on-success="success" :with-credentials="true" :on-error="error">
						<el-button size="small" type="primary" icon="el-icon-upload">选择文件</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label="文件名称">
					<el-input v-model="data.file" readonly="true"/>
				</el-form-item>
				<el-form-item prop="content" label="更新内容">
					<el-input v-model="data.content" type="textarea"
						:autosize="{minRows: 4, maxRows: 4}"
						placeholder="请输入更新内容" resize="none" maxlength="4000"/>
				</el-form-item>
				<el-form-item prop="enforceable" label="是否强制更新">
					<el-switch v-model="data.enforceable" active-value="true" inactive-value="false"/>
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
import {Common} from "basic-assets";

export default {
	data() {
		return {
			closeOn: false,
			uploadFile: null,
			loading: false,
			rules: {
				version: [{
					required: true,
					message: '请输入版本号',
					trigger: 'blur'
				}],
				file: [{
					required: true,
					message: '请选择文件',
					trigger: 'blur'
				}]
			}
		};
	},
	computed: {
		uploadAction() {
			return `${this.$system.cache.config.baseUrl}/appVersion/add`;
		}
	},
	props: {
		isShow: Boolean,
		data: Object
	},
	methods: {
		open() {
			this.$refs.form && this.$refs.form.clearValidate();
		},
		changeFile(file, fileList) {
			if (file.status === "ready") {
				this.uploadFile = file;
				this.$set(this.data, "file", file.name);
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
					if (self.$refs.upload.headers) {
						self.$refs.upload.headers.Authorization = Common.getCookie("Authorization");
					}
					self.$refs.upload.submit();
				}
			});
		},
		success(response, file, fileList) {
			this.loading = false;
			if (response.code == "200") {
				this.uploadFile = null;
				this.$message({
					type: "success",
					message: "提交成功!"
				});
				this.$emit("sure");
			} else {
				this.$message({
					type: "error",
					message: response.result
				});
				return false;
			}
		},
		error(err, file) {
			this.loading = false;
			this.$message({
				showClose: true,
				message: '文件上传失败',
				type: 'error'
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
