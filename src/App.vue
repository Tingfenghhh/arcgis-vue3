<script setup lang="ts">
import __esri from "@arcgis/core/intl"; // 引入ArcGis的TS所有类型合集

const mapLoaded = (map: __esri.SceneView | __esri.MapView) => {
  console.log("地图加载完毕", map);
};

const mapClick = (event: __esri.ViewClickEvent | undefined) => {
  console.log("2d地图点击事件", event);
};

const mapMouseMove = (event: __esri.ViewPointerMoveEvent | undefined) => {
  console.log("2d地图鼠标移动事件", event);
};

const sceneClick = (event: __esri.ViewClickEvent | undefined) => {
  console.log("3d地图点击事件", event);
};

const sceneMouseMove = (event: __esri.ViewPointerMoveEvent | undefined) => {
  console.log("3d地图鼠标移动事件", event);
};
</script>

<template>
  <T-ArcGis
    :map-type="'MapView'"
    :map-options="{
    zoom: 3,
    constraints: {
      minZoom: 3,
      maxZoom: 18,
    },
  } as __esri.MapProperties
    "
    @onMapLoaded="mapLoaded"
    @onMapClick="mapClick"
    @onMapMouseMove="mapMouseMove"
  />
  <T-ArcGis
    :map-type="'SceneView'"
    :quality-profile="'low'"
    @onMapLoaded="mapLoaded"
    @onSceneMapClick="sceneClick"
    @onSceneMapMouseMove="sceneMouseMove"
  />
</template>

<style lang="less" scoped></style>
