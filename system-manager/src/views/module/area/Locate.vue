<template>
	<el-dialog :title="title" :visible="isShow" @close="close" width="1000px"
		v-loading="loading" element-loading-background="rgba(255, 255, 255, 0.1)"
		:close-on-click-modal="closeOn" :close-on-press-escape="closeOn">
		<div class="dialog-map-body">
			<gaode :options="mapOptions" @mapcreated="mapcreated"/>
		</div>
	</el-dialog>
</template>

<script>
import Gaode from "@/components/Gaode";

export default {
	data() {
		return {
			closeOn: false,
			mapOptions: {
				options: {
					zoom: 12,
					zooms: [ 3, 20 ]
				},
				baseLayerMode: "google",
				tools: true,
				controls: [
					new AMap.OverView(),
					new AMap.Scale()
				]
			},
			map: null,
			areas: [],
			districtSearch: new AMap.DistrictSearch({extensions: "all"}),
			loading: false
		};
	},
	props: {
		isShow: Boolean,
		title: String,
		locateData: Object
	},
	watch: {
		locateData: function(newData, oldData) {
			const self = this;
			if (self.map) {
				self.locate();
			} else {
				let timer = setInterval(() => {
					if (self.map) {
						clearInterval(timer);
						self.locate();
					}
				}, 100);
			}
		}
	},
	methods: {
		mapcreated(map) {
			this.map = map;
		},
		close() {
			this.$emit("close");
		},
		locate() {
			const self = this;
			self.loading = true;
			self.map.clearMap();
			self.districtSearch.search(self.locateData.id + "", function(status, result) {
				if (result && result.districtList && result.districtList.length) {
					let list = result.districtList.map(district => {
						return new AMap.Polygon({
							path: district.boundaries,
							strokeColor: "#FF0000",
							strokeWeight: 1,
							strokeStyle: "dashed",
							fillColor: "#FF0000",
							fillOpacity: 0.1
						});
					});
					self.map.add(list);
					self.map.setFitView(list);
					self.loading = false;
				}
			});
		}
	},
	components: { Gaode }
}
</script>

<style scoped>
.dialog-map-body {
	position: relative;
	height: 550px;
}
</style>
