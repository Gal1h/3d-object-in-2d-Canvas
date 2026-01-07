
# Flat3D

Tools for HTML canvas that can make 3D view object in 2D
    
## Function

| Method             | Description                                                                |
| ----------------- | ------------------------------------------------------------------ |
| init() | initialize canvas ID, size, and background color |
| color() | set line color |
| draw() | generate the object |
| clear() | clear the canvas |



## Usage/Examples

HTML
```html
<canvas id="cont"> </canvas> <!--your canvas-->
<script type="module" src="script.js"></script> <!--use import here--> 
```

JavaScript
```javascript
import {Flat3D} from 'https://cdn.jsdelivr.net/npm/flat3d@1.1.6'
```

```javascript
const fd = new Flat3D
fd.init("canvasID", 1000, "gray");    //initialize (canvas ID, size, color)
fd.color("lime");   //set line color

fd.draw(
  { x: -200, y: 100 }, //position
  { x: 300, y: 0 }, //viewport
  [
    [-0.3, 0.3, 0.11],  //vertex coordinates
    [0.3, 0.3, 0.11],
    [0.3, -0.3, 0.11],
    [-0.3, -0.3, 0.11],

    [-0.3, 0.3, 0.22],
    [0.3, 0.3, 0.22],
    [0.3, -0.3, 0.22],
    [-0.3, -0.3, 0.22],

    [0.3, 0.7, 0.2],
    [-0.3, 0.7, 0.2],
  ],
  [
    [0, 1, 2, 3],   //line connection per index
    [4, 5, 6, 7],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
    [8, 9],
    [1, 8, 5],
    [0, 9, 4],
  ],
);
```

