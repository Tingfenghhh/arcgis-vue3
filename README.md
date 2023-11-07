# ArcGIS-vue3封装测试

## 下载

```js

    npm install arcgis-vue3

    yarn add arcgis-vue3

```

## 使用

main.ts中引入

```ts

    import TingfengArcgis from "arcgis-vue3"

    import 'arcgis-vue3/css'

    app.use(TingfengArcgis);

```

## ts类型支持

在tsconfig.json中添加

```json

    "types": [
      "arcgis-vue3/src/packages/components.d.ts"
    ],

```

## 基础组件使用

创建第一个地图

```vue

<script setup lang="ts">
import __esri from '@arcgis/core/intl' // 引入ArcGis的TS所有类型合集

const mapLoaded = (map: __esri.SceneView | __esri.MapView) => {
  console.log("地图加载完毕", map);
};

const mapClick = (event: __esri.ViewClickEvent | undefined) => {
  console.log("2d地图点击事件", event);
};
const sceneClick = (event: __esri.ViewClickEvent | undefined) => {
  console.log("3d地图点击事件", event);
};
</script>

<template>
  <!-- 2D地图 -->
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
  />
  <!-- 3D地图 -->
  <T-ArcGis
    :map-type="'SceneView'"
    :quality-profile="'low'"
    @onMapLoaded="mapLoaded"
    @onSceneMapClick="sceneClick"
  />
</template>

<style lang="less" scoped></style>

```

## 地图组件属性

|      属性名      |   类型   |     默认值     |                                                              说明                                                               |
| :--------------: | :------: | :------------: | :-----------------------------------------------------------------------------------------------------------------------------: |
|    `mapType`     | `string` |    MapView     |                                          地图类型，MapView为2D地图，SceneView为3D地图                                           |
|   `container`    | `string` | 自动生成唯一ID |                                                ID选择器的名称，用于指定地图容器                                                 |
|     `width`      | `string` |      100%      |                                                            容器的高                                                             |
|     `height`     | `string` |     100vh      |                                                            容器的宽                                                             |
|   `mapOptions`   | `Object` |       {}       | 地图初始化参数，具体参数请参考[官方文档](https://developers.arcgis.com/javascript/latest/api-reference/esri-views-MapView.html) |
| `qualityProfile` | `string` |      low       |                                               地图质量，low为低质量，high为高质量                                               |


## 地图组件事件

|      事件名       | 函数携带默认的参数类型  | 说明                             |
| :---------------: | :---------------------: | :------------------------------- |
|   `onMapLoaded`   |    `__esri.MapView`     | 地图加载完毕事件，返回地图实例   |
|   `onMapClick`    | `__esri.ViewClickEvent` | 2D地图点击事件，返回点击事件对象 |
| `onSceneMapClick` | `__esri.ViewClickEvent` | 3D地图点击事件，返回点击事件对象 |