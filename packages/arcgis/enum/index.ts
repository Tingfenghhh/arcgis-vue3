// 天地图key
const MapKey = import.meta.env.VITE_APP_MAP_TOKEN

/**
 * 加载完成
 */
const LOADEND = Symbol('LOADEND')

/**
 * 点击事件(包含点击到的实体和地图点)
 */
const SCENE_VIEW_MAP_CLICK = Symbol('SCENE_VIEW_MAP_CLICK')

const MAP_VIEW_CLICK = Symbol('MAP_VIEW_CLICK')

/**
 * 左键点击事件(只包含地图点)
 */

const LEFT_CLICK = Symbol('LEFT_CLICK')

/**
 * 右键点击事件(只包含地图点)
 */

const RIGHT_CLICK = Symbol('RIGHT_CLICK')

/**
 * 摄像机高度变化事件
 */
const CAMREAHEIGHT = Symbol('camera.position.z')

/**
 * 点击类型
 */
type ClickType = 'CLICK' | 'MOUSEMOVE' | 'RIGHTCLICK'

export { MapKey, LOADEND, SCENE_VIEW_MAP_CLICK, MAP_VIEW_CLICK, LEFT_CLICK, RIGHT_CLICK, CAMREAHEIGHT }
export type { ClickType }