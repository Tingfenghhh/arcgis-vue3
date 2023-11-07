<script setup lang="ts">
import { ref } from "vue";

const mapLoaded = (map: __esri.SceneView | __esri.MapView) => {
  console.log("地图加载完毕", map);
};
const show = ref(true);
// setTimeout(() => {
//   show.value = false;
// }, 5000);
</script>

<template>
  <T-ArcGis v-if="show" :map-type="'SceneView'" @onMapLoaded="mapLoaded" />
</template>

<style lang="less" scoped></style>
