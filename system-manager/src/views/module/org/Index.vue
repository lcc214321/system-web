<template>
    <avue-crud @on-load="loadData" :option="option" :data="data"/>
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
                    label: '机构编码',
                    prop: 'orgId',
                    width: 200
                }, {
                    label: '机构名称',
                    prop: 'orgName'
                }, {
                    label: '机构类型',
                    prop: 'orgTypeName',
                    width: 150
                }]
            }
        };
    },
    methods: {
        loadData() {
            const self = this;
            OrgApi.tree().then(result => self.data = result);
        }
    }
}
</script>

<style scoped>

</style>
