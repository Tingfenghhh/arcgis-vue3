import mitt from 'mitt'

// 返回一个mitt实例

const mapViewEmitter = mitt()
const sceneViewEmitter = mitt()

export {
    mapViewEmitter,
    sceneViewEmitter
}

