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

## API

## demos

- [right logical](http://leungwensen.github.io/mindmap-layouts/demo/right-logical.html)
- [downward organizational](http://leungwensen.github.io/mindmap-layouts/demo/downward-organizational.html)

## links

- [思维导图自动布局算法](http://leungwensen.github.io/blog/2017/mindmap-drawing-algorithms.html)
