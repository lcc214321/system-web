<template>
	<el-tabs type="border-card" style="margin: -10px;">
	  	<el-tab-pane v-if="$system.hasPermission('sys:bucket')" label="板块">
			<Bucket/>
	  	</el-tab-pane>
	  	<el-tab-pane v-if="$system.hasPermission('sys:attach')" label="附件">
	  		<Attach/>
	  	</el-tab-pane>
	</el-tabs>
</template>

<script>
import Bucket from "./bucket/";
import Attach from "./attach/";

export default {
	components: { Bucket, Attach }
}
</script>
