<script setup lang="ts">
import { onMounted, computed, onBeforeUnmount } from "vue";
import Arcgis from "..";

interface TArcgisProps {
  mapType: "MapView" | "SceneView";
  container?: string;
  mapOptions?: __esri.MapProperties | __esri.SceneViewProperties;
  width?: string;
  height?: string;
}

const emits = defineEmits<{
  (e: "onMapLoaded", map: __esri.SceneView | __esri.MapView): void;
}>();

const props = withDefaults(defineProps<TArcgisProps>(), {
  container: "t-arcgis-box",
  mapType: "MapView",
});

const ArcgisMap = new Arcgis();

const width = computed(() => props.width || "100%");
const height = computed(() => props.height || "100vh");

onMounted(() => {
  if (props.container && props.mapType) {
    ArcgisMap.initMap(props.container, props.mapType, props.mapOptions).then(
      (res) => {
        emits("onMapLoaded", res);
        // 启用地图点击事件
        ArcgisMap.onMapClick();
      }
    );
  }
});

onBeforeUnmount(() => {
  ArcgisMap.destroyed().then((res)=>{
    if(res){
      console.log("地图销毁成功")
    }else{
      console.log("地图销毁失败")
    }

  }).catch((err)=>{
    console.log("地图销毁失败",err)
  })

})
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
..
