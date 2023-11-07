<script setup lang="ts">
import __esri from "@arcgis/core/intl"; // 引入ArcGis的TS所有类型合集
import { nanoid } from "nanoid";
import { onMounted, computed, onBeforeUnmount, ref, watch } from "vue";
import Arcgis from "..";

/**
 * 定义props类型
 */
interface TArcgisProps {
  mapType: "MapView" | "SceneView";
  container?: string;
  mapOptions?: __esri.MapProperties | __esri.SceneViewProperties;
  width?: string;
  height?: string;
  qualityProfile?: "low" | "medium" | "high";
}

const Nanoid = nanoid();
const containerId = computed(
  () => `${props.container}_${Nanoid}` || `t-arcgis-box_${Nanoid}`
);

/**
 * 定义emits
 */
const emits = defineEmits<{
  (e: "onMapLoaded", map: __esri.SceneView | __esri.MapView): void;
  (e: "onMapClick", event: __esri.ViewClickEvent | undefined): void;
  (e: "onSceneMapClick", event: __esri.ViewClickEvent | undefined): void;
}>();

/**
 * 定义props
 */
const props = withDefaults(defineProps<TArcgisProps>(), {
  container: "t-arcgis-box",
  mapType: "MapView",
  qualityProfile: "low",
});
/**
 * 地图实例 宽度 高度
 */
const ArcgisMap = new Arcgis();
const width = computed(() => props.width || "100%");
const height = computed(() => props.height || "100vh");

/**
 * mapViewClick点击事件(2D)
 */
ArcgisMap.mapViewClick((e: __esri.ViewClickEvent) => {
  emits("onMapClick", e);
});

/**
 * sceneViewClick点击事件(3D)
 */
ArcgisMap.sceneViewClick((e: __esri.ViewClickEvent) => {
  emits("onSceneMapClick", e);
});

/**
 * 加载并初始化地图
 */
onMounted(() => {
  if (props.container && props.mapType) {
    ArcgisMap.initMap(containerId.value, props.mapType, {
      ...props.mapOptions,
      qualityProfile:
        props.mapType === "SceneView" ? props.qualityProfile : undefined,
    }).then((res) => {
      emits("onMapLoaded", res);
    });
  }
});

/**
 * 销毁地图
 */
onBeforeUnmount(() => {
  ArcgisMap.destroyed()
    .then((res) => {
      if (res) {
        console.log("地图销毁成功");
      }
      console.log("地图销毁失败");
    })
    .catch((err) => {
      console.log("地图销毁失败", err);
    });
});
</script>

<template>
  <!-- 地图外部盒子 -->
  <div class="t-arcgis">
    <!-- 地图盒子 -->
    <div
      :id="containerId"
      :style="{
        width: width,
        height: height,
        background: 'radial-gradient(#12bff2, #045c8a)',
      }"
    ></div>
  </div>
</template>

<style lang="less" scoped>
.t-arcgis-box {
  width: v-bind(width);
  height: v-bind(height);
  background: radial-gradient(
    #12bff2,
    #045c8a
  ) !important; // 作用于地图背景 充当星空色
}
</style>
<style lang="less">
body {
  margin: 0;
  padding: 0;
}
</style>
..
