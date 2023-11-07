// import { toRaw } from 'vue'
import { MapEnum } from './enum/mapEnum'
// import { Handler } from 'mitt'
import _ from 'lodash' // 引入lodash
import Map from '@arcgis/core/Map' // 引入ArcGis地图
import SceneView from '@arcgis/core/views/SceneView' // 引入ArcGis地图视图(3D)
import MapView from '@arcgis/core/views/MapView' // 引入ArcGis地图视图(2D)
import WebTileLayer from '@arcgis/core/layers/WebTileLayer' // 引入ArcGis使用网络图层
// import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer' // GraphicsLayer
// import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol' // 引入ArcGis图片标记
// import TextSymbol from '@arcgis/core/symbols/TextSymbol' // 引入ArcGis文字标记
// import Graphic from '@arcgis/core/Graphic' // 引入ArcGis标记
// import Point from '@arcgis/core/geometry/Point' // 引入ArcGis点
import Color from '@arcgis/core/Color' // 引入ArcGis颜色
import __esri from '@arcgis/core/intl' // 引入ArcGis的TS所有类型合集
import { MapKey } from './enum' // 引入ArcGis的key
import "@arcgis/core/assets/esri/themes/light/main.css" // 引入ArcGis样式
import "./style/index.less" // 引入自定义样式

const { MAXIMUMZOOMDISTANCE, MINIMUMZOOMDISTANCE, DEFAULT_LONGITUDE, DEFAULT_LATITUDE } =
    MapEnum


export default class Arcgis {
    // 地图对象
    map: __esri.Map | null
    // 3D地图视图对象
    viewScene3D: __esri.SceneView | null
    // 2D地图视图对象
    viewScene2D: __esri.MapView | null
    // 当前地图类型
    mapType = ''

    constructor() {
        this.map = null
        this.viewScene3D = null
        this.viewScene2D = null
    }

    /**
     * 地图初始化
     * @param container 
     * @param type 
     * @param options 
     * @returns 
     */
    initMap = (container: string, type: "MapView" | "SceneView", options?: __esri.MapProperties | __esri.SceneViewProperties): Promise<__esri.SceneView | __esri.MapView> => {
        try {
            if (!container) return Promise.reject('container is null')
            this.mapType = type === 'MapView' ? '2D' : '3D'
            // 高德图层
            const gaodeLayer = new WebTileLayer({
                id: 'gaode',
                urlTemplate: 'https://webst01.is.autonavi.com/appmaptile?style=8&ltype=4&x={col}&y={row}&z={level}',
                opacity: 1,
                visible: false
            })

            // 天地图图层
            const tiandituLayer = new WebTileLayer({
                id: 'tianditu',
                urlTemplate: `http://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={level}&TILEROW={row}&TILECOL={col}&tk=${MapKey}`,
                opacity: 1,
                visible: true
            })

            // 地图
            this.map = new Map({
                layers: [tiandituLayer, gaodeLayer]
            })

            if (type === 'MapView') {
                // 2D地图视图
                this.viewScene2D = new MapView({
                    container,
                    map: this.map,
                    // 设置默认缩放层级
                    zoom: 1,
                    // 设置地图中心点
                    center: [DEFAULT_LONGITUDE, DEFAULT_LATITUDE],
                    ...options as __esri.MapViewProperties
                })
                return Promise.resolve(this.viewScene2D)
            }

            // 3D地图视图
            this.viewScene3D = new SceneView({
                // 设置容器 一个div 的 id
                container,
                // 设置地图
                map: this.map,
                // 设置默认缩放层级
                zoom: 1,
                // 设置地图中心点
                center: [DEFAULT_LONGITUDE, DEFAULT_LATITUDE],
                // 设置渲染质量
                qualityProfile: 'low',
                // 限制缩放层级高度
                constraints: {
                    altitude: {
                        max: MAXIMUMZOOMDISTANCE,
                        min: MINIMUMZOOMDISTANCE
                    }
                },
                // 地球透明度
                alphaCompositingEnabled: true,
                // 地球环境 设置背景颜色 (还需将地球盒子的div或者父级div的背景颜色设置想要的颜色即可)
                environment: {
                    background: {
                        type: 'color',
                        color: [255, 252, 244, 0]
                    },
                    // 星空启用
                    starsEnabled: true,
                    // 大气层启用
                    atmosphereEnabled: true,
                    // 光照模拟 sun 就是太阳有光照效果区分白天和黑夜 virtual 就是没有光照效果
                    lighting: {
                        type: 'virtual'
                    }
                },
                // 设置全局选中时的高亮样式
                highlightOptions: {
                    color: new Color({
                        r: 245,
                        g: 215,
                        b: 39,
                        a: 1
                    }),
                    haloOpacity: 0.9,
                    fillOpacity: 0.2
                },
                ...options
            })

            return Promise.resolve(this.viewScene3D)

        } catch (error) {
            throw new Error(error as string)
        }
    }

    /**
     * 地图点击事件监听
     */
    onMapClick = () => {
        try {
            if (this.mapType === '2D' && this.viewScene2D) {

            }

            if (this.mapType === '3D' && this.viewScene3D) {
                this.viewScene3D.on('click', _.throttle(async (event: __esri.ViewClickEvent) => {
                    const clickType = event.button // 0左键 1中键 2右键
                    const view = this.viewScene3D
                    // hitTest 方法在点击位置上如果存在 Graphic（线或点），即可获取 Graphic 对象的整个数据
                    if (clickType === 0 && view) {
                        view.hitTest(event).then((response: __esri.SceneViewHitTestResult) => {
                            try {
                                if (response.results.length > 0) {

                                } else {

                                }
                            } catch (error) {
                                throw new Error(error as string)
                            }
                        })
                    } else if (clickType === 2) {
                        // 右键点击事件

                    }

                }))
            }

            throw new Error("initMap Method not implemented.")

        } catch (error) {
            throw new Error(error as string)
        }
    }

}