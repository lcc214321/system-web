<template>
    <div class="sidebar">
        <el-menu :default-active="$route.path" class="el-menu-vertical-demo" theme="dark"
            unique-opened router background-color="#324157" text-color="#FFFFFF" active-text-color="#20A0FF">
            <template v-for="item in menus">
                <template v-if="item.children">
                    <el-submenu :index="item.funcId">
                        <template slot="title"><i v-if="item.icon" :class="item.icon"></i>{{ item.funcName }}</template>
                        <el-menu-item v-for="(subItem,i) in item.children" :key="i" :index="subItem.url">
                            <template slot="title"><i v-if="subItem.icon" :class="subItem.icon"></i>{{ subItem.funcName }}</template>
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.url">
                        <template slot="title"><i v-if="item.icon" :class="item.icon"></i>{{ item.funcName }}</template>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            menus: [],
        }
    },
    mounted() {
        const self = this;
        let timer = setInterval(() => {
            if (self.$cache.has('menu')) {
                self.menus = self.$cache.menu;
                clearInterval(timer);
            }
        }, 100);
    }
}
</script>

<style scoped>
.el-menu {
    border-right: 0px;
}
</style>
