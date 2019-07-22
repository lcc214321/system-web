<template>
	<div :id="mapId" class="map-container">
		<div id="popInfo" v-if="popInfo">
			<slot name="infoContent"></slot>
		</div>
		<div id="search-box">
			<slot name="search"></slot>
		</div>
		<div id="top-box">
			<slot name="top-box"></slot>
		</div>
		<div id="rt-box">
			<slot name="rt-box"></slot>
		</div>
		<div id="map-switcher" v-if="baseLayerMode != null">
			<el-radio-group v-if="baseLayerMode == 'google'" v-model="googleType" size="mini">
				<el-radio-button label="m">矢量</el-radio-button>
				<el-radio-button label="y">影像</el-radio-button>
				<el-radio-button label="p">地形</el-radio-button>
			</el-radio-group>
		</div>
		<div id="map-tools" v-if="tools">
			<el-dropdown trigger="click" size="small" @command="toolsCommand">
				<el-button type="primary" size="mini">工具</el-button>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item command="distance">测距</el-dropdown-item>
					<el-dropdown-item command="area">测面</el-dropdown-item>
					<el-dropdown-item command="clear">清除</el-dropdown-item>
					<el-dropdown-item command="full-screen">全屏</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</div>
</template>

<script>
import { Common } from "basic-assets";

export default {
	data() {
		return {
			mapId: Common.uuid(),
			baseLayerMode: null,
			googleType: "m",
			tools: false,
			popInfo: false
		};
	},
	props: {
		options: Object
	},
	mounted() {
		this.initMap();
	},
	destroyed() {
		const self = this;
		if (self.map) {
			self.map.destroy();
		}
	},
	methods: {
		initMap() {
			const self = this;
			if (self.options) {
				if (self.options.options) {
					let zooms = Object.assign([], self.options.options.zooms);
					self.map = new AMap.Map(self.mapId, self.options.options);
					if (zooms && zooms.length) {
						self.setZooms(zooms);
					}
				} else {
					self.map = new AMap.Map(self.mapId);
				}
				if (self.options.baseLayerMode) {
					self.baseLayerMode = self.options.baseLayerMode;
					switch (self.options.baseLayerMode) {
						case "google":
							self.setGoogleLayer();
							if (self.options.googleType) {
								self.googleType = self.options.googleType;
							}
							break;
					}
				}
				if (self.options.controls && self.options.controls.length) {
					for (let control of self.options.controls) {
						self.map.addControl(control);
					}
				}
				if (self.options.tools === true) {
					self.tools = self.options.tools;
					self.mouseTool = new AMap.MouseTool(self.map);
					self.mouseTool.on("draw", function(event) {
						self.mouseTool.close();
					});
				}
				self.popInfo = self.options.popInfo;
			} else {
				self.map = new AMap.Map(self.mapId);
			}
			self.$emit("mapcreated", self.map);
			self.__removeLogo__();
		},
		setZooms(zooms) {
			const self = this;
			for (let [name, item] of Object.entries(self.map)) {
				if (typeof item === "object") {
					for (let [key, value] of Object.entries(item)) {
						if (key === "zooms") {
							item[key] = zooms;
						}
					}
				}
			}
		},
		toolsCommand(command) {
			const self = this;
			switch (command) {
				case "distance":
					self.mouseTool.rule();
					break;
				case "area":
					self.mouseTool.measureArea();
					break;
				case "clear":
					self.mouseTool.close(true);
					break;
				case "full-screen":
					if (self.options && self.options.fullScreen === "map") {
						Common.fullScreen(document.getElementById(self.mapId));
					} else {
						Common.fullScreen();
					}
					break;
			}
		},
		setGoogleLayer() {
			const self = this;
			self.vectorLayer = self.googleLayer("m");
			self.imageLayer = self.googleLayer("y");
			self.imageLayer.hide();
			self.terrainLayer = self.googleLayer("p");
			self.terrainLayer.hide();
			self.map.setLayers([
				self.vectorLayer,
				self.imageLayer,
				self.terrainLayer
			]);
		},
		googleLayer(type) {
			return new AMap.TileLayer({
	            tileUrl: `http://mt{0,1,2,3}.google.cn/vt/lyrs=${type}@142&hl=zh-CN&gl=cn&x=[x]&y=[y]&z=[z]&s=Galil`,
				zooms: [3, 20]
	        });
		},
		__removeLogo__() {
			let amap_logo = document.getElementsByClassName('amap-logo');
			for (let i = 0; i < amap_logo.length; i++) {
				amap_logo[i].parentNode.removeChild(amap_logo[i]);
			}
			let amap_copyright = document.getElementsByClassName('amap-copyright');
			for (let i = 0; i < amap_copyright.length; i++) {
				amap_copyright[i].parentNode.removeChild(amap_copyright[i]);
			}
		}
	},
	watch: {
		googleType(type) {
			const self = this;
			if (self.vectorLayer) {
				self.vectorLayer.hide();
			}
			if (self.imageLayer) {
				self.imageLayer.hide();
			}
			if (self.terrainLayer) {
				self.terrainLayer.hide();
			}
			switch (type) {
				case "m":
					self.vectorLayer.show();
					break;
				case "y":
					self.imageLayer.show();
					break;
				case "p":
					self.terrainLayer.show();
					break;
			}
		}
	}
}
</script>

<style scoped>
.map-container {
	position: absolute;
	width: 100%;
	height: 100%;
	top: 0px;
	bottom: 0;
}

#search-box {
	position: absolute;
    top: 20px;
    left: 20px;
    z-index: 1;
}

#top-box {
	position: absolute;
    top: 20px;
    left: 300px;
    z-index: 1;
}

#rt-box {
	position: absolute;
    top: 20px;
    right: 210px;
    z-index: 1;
}

#popInfo {
	position: absolute;
	margin: 10px;
	width: calc(27% - 5px);
	height: calc(100% - 20px);
	background: #FFFFFF;
	z-index: 1;
}

#map-switcher {
	position: absolute;
    top: 20px;
    right: 20px;
    z-index: 1;
}

#map-tools {
	position: absolute;
    top: 80px;
    right: 20px;
    z-index: 1;
}
</style>
