<script setup lang="ts">
import { onMounted, computed } from "vue";
import Arcgis from "../arcgis";

interface TArcgisProps {
  container: string;
  mapType: "MapView" | "SceneView";
  mapOptions?: __esri.MapProperties | __esri.SceneViewProperties;
  width?: string;
  height?: string;
}

const props = withDefaults(defineProps<TArcgisProps>(), {
  container: "t-arcgis-box",
  mapType: "MapView",
  mapOptions: {
    zoom: 3,
  } as __esri.MapProperties | __esri.SceneViewProperties,
});

const ArcgisMap = new Arcgis();

const width = computed(() => props.width || "100%");
const height = computed(() => props.height || "100vh");

onMounted(() => {
  if (props.container && props.mapType) {
    ArcgisMap.initMap(props.container, props.mapType, props.mapOptions);
  }
});
</script>

<template>
  <div id="t-arcgis-box"></div>
</template>

<style lang="less" scoped>
#t-arcgis-box {
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
