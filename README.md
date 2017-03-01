mindmap-layouts
===============

automatic layout algorithms for mindmaps

## input

```json
{
    "root": {
        "name": "root",
        "children": [
            {
                "name": "child-1",
                "children": [
                    {
                        "name": "child-1-1"
                    },
                    {
                        "name": "child-1-2",
                        "children": [
                            {
                                "name": "child-1-2-1"
                            }
                        ]
                    }
                ]
            },
            {
                "name": "child-2"
            },
            {
                "name": "child-3"
            },
            {
                "name": "child-4",
                "children": [
                    {
                        "name": "child-4-1"
                    },
                    {
                        "name": "child-4-2"
                    }
                ]
            }
        ]
    },
    "links": [
        {
            "source": "child-1-1",
            "name": "special link",
            "target": "child-2"
        }
    ]
}
```

> Root and each of its descendants are nodes in a mindmap, like Topic in XMind.

> Links are extra edges that connects two nodes in a mindmap, like Relationship in XMind.

Checkout more about .xmind file: [xmind-sdk-javascript](https://github.com/leungwensen/xmind-sdk-javascript)

## Install

```shell
$ npm install mindmap-layouts --save
```

## API

```javascript
const MindmapLayouts = require('mindmap-layouts')
const layout = new MindmapLayouts.Standard(root, options) // root is tree node like above
const rootNode = layout.doLayout() // you have x, y, centX, centY, actualHeight, actualWidth, etc.
```

checkout [here](https://github.com/leungwensen/mindmap-layouts/tree/master/demo/src) for a real world demo

## [demo](http://leungwensen.github.io/mindmap-layouts/demo/)

## layouts

### standard

![standard](./assets/standard.png)

### right logical

![right-logical](./assets/right-logical.png)

### left logical

![left-logical](./assets/left-logical.png)

### downward organizational

![downward-organizational](./assets/downward-organizational.png)

### upward organizational

![upward-organizational](./assets/upward-organizational.png)

### [TODO] right fishbone

### [TODO] left fishbone

### [TODO] indented

### [TODO] arc tree

### [TODO] elbow tree

### [TODO] horizontal Timeline

### [TODO] vertical Timeline

## links

- [思维导图自动布局算法](http://leungwensen.github.io/blog/2017/mindmap-drawing-algorithms.html)
