# ArcGIS-vue3封装测试

## 下载

```js

    npm install tingfeng_arcgis

    yarn add tingfeng_arcgis

```

## 使用

main.ts中引入

```ts

    import TingfengArcgis from "tingfeng_arcgis"

    import 'tingfeng_arcgis/css'

    app.use(TingfengArcgis);

```

## ts类型支持

在tsconfig.json中添加

```json

    "types": [
      "tingfeng_arcgis/src/packages/components.d.ts"
    ],

```
