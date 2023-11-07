<script setup lang="ts">
import { onMounted } from "vue";
import Arcgis from "../packages/src/arcgis";

const ArcgisMap = new Arcgis();

onMounted(() => {
  // 初始化地图(2d)
  // ArcgisMap.initMap("t-arcgis-box", "MapView", {
  //   zoom: 3,
  //   constraints: {
  //     minZoom: 3,
  //     maxZoom: 18,
  //   },
  // } as __esri.MapProperties);
  ArcgisMap.initMap("t-arcgis-box", "SceneView", {
    zoom: 3,
  } as __esri.SceneViewProperties);
});
</script>

<template>
  <div id="t-arcgis-box"></div>
</template>

<style lang="less" scoped>
#t-arcgis-box {
  width: 100%;
  height: 100vh;
  background: radial-gradient(#12bff2, #045c8a) !important; // 作用于地图背景 充当星空色
}
</style>
<style lang="less">
body {
  margin: 0;
  padding: 0;
}
</style>
