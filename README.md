
# Flat3D

Tools for HTML canvas that can make 3D view object in 2D
 


## Installation

Install Flat3D with npm

```bash
  npm install flat3d
```
    
## Function

| Method             | Description                                                                |
| ----------------- | ------------------------------------------------------------------ |
| init() | initialize canvas ID |
| color() | set line color |
| draw() | generate the object |


## Usage/Examples

```javascript
import {Flat3D} from 'flat3d'
```

```javascript
const fd = new Flat3D
fd.init("canvasID");    //initialize canvas id
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

