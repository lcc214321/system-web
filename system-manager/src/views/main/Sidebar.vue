<template>
    <div class="sidebar">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" theme="dark"
        	unique-opened router background-color="#324157" text-color="#FFFFFF" active-text-color="#20A0FF">
            <template v-for="item in menus">
				<template v-if="item.children">
                    <el-submenu :index="item.menuId">
						<template slot="title"><i v-if="item.icon" :class="item.icon"></i>{{ item.name }}</template>
						<el-menu-item v-for="(subItem,i) in item.children" :key="i" :index="subItem.href">{{ subItem.name }}</el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.menuId">
                        <template slot="title"><i v-if="item.icon" :class="item.icon"></i>{{ item.name }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
	props: {
		menus: Array
	}
}
</script>

<style scoped>
.sidebar {
	display: block;
	position: absolute;
	width: 220px;
	left: 0;
	top: 60px;
	bottom: 0;
	background: #2E363F;
}

.sidebar>ul {
	height: 100%;
}

.el-submenu .el-menu-item.el-menu-item {
	height: 40px !important;
	line-height: 40px !important;
}

.el-menu-item, .el-submenu__title {
	height: 50px !important;
	line-height: 50px !important;
}
</style>
