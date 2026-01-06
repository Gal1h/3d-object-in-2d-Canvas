let canvas;
let ctx;

// class Meth {
//   sin(num) {
//     return Math.sin((num * Math.PI) / 180);
//   }
//   cos(num) {
//     return Math.cos((num * Math.PI) / 180);
//   }
//   tan(num) {
//     return Math.tan((num * Math.PI) / 180);
//   }
// }
// const meth = new Meth();

export class Flat3D {
  #viewPort;
  #points;
  #strokeConnect;
  #pos;
  #strokeColor;

  constructor() {}
  init(context) {
    canvas = document.getElementById(context);
    ctx = canvas.getContext("2d");
    console.log(context);


    canvas.width = 1000;
    canvas.height = 1000;
    canvas.style.backgroundColor = "#121212";
    canvas.style.border = "3px white solid";
  }

  draw(position, viewPort, points, strokeConnect) {
    this.#points = points;
    this.#pos = position;
    this.#viewPort = viewPort;
    this.#strokeConnect = strokeConnect;

    this.#pos.x += canvas.width / 2;
    this.#pos.y += canvas.height / 2;

    ctx.setTransform(1, 0, 0, 1, this.#pos.x, this.#pos.y);
    this.drawPoint(this.#pos.x, this.#pos.y);
    console.log(this.#pos);
  }

  color(color) {
    this.#strokeColor = color;
  }

  normalized(x, y, z) {
    x = x * (canvas.width - 0) + 0;
    y = y * (canvas.height - 0) + 0;
    z = z * (canvas.height * 0.01 - 1) + 1;
    return { x, y, z };
  }

  zFormula(x, y, z) {
    x = x / z;
    y = y / z;
    return { x, y };
  }
  drawPoint(x, y) {
    for (let n in this.#points) {
      this.#points[n][0] = this.normalized(
        this.#points[n][0],
        this.#points[n][1],
        this.#points[n][2],
      ).x;
      this.#points[n][1] = this.normalized(
        this.#points[n][0],
        this.#points[n][1],
        this.#points[n][2],
      ).y;
      this.#points[n][2] = this.normalized(
        this.#points[n][0],
        this.#points[n][1],
        this.#points[n][2],
      ).z;
    }

    for (let i in this.#points) {
      this.#points[i][0] = this.zFormula(
        this.#points[i][0],
        this.#points[i][1],
        this.#points[i][2],
      ).x;
      this.#points[i][1] = this.zFormula(
        this.#points[i][0],
        this.#points[i][1],
        this.#points[i][2],
      ).y;
      this.#points[i][0] -= this.#viewPort.x;
      this.#points[i][1] += this.#viewPort.y;
      this.#points[i][1] = -this.#points[i][1];
    }

    ctx.beginPath();

    ctx.strokeStyle = this.#strokeColor;
    ctx.fillStyle = "red";

    // show dots
    // for (let l = 0; l <= this.#points.length - 1; l++) {
    //   if (l > 3) {
    //     ctx.fillStyle = "green";
    //   }

    //   ctx.fillRect(
    //     this.zFormula(
    //       this.#points[l][0],
    //       this.#points[l][1],
    //       this.#points[l][2],
    //     ).x,
    //     this.zFormula(
    //       this.#points[l][0],
    //       this.#points[l][1],
    //       this.#points[l][2],
    //     ).y,
    //     10,
    //     10,
    //   );
    // }

    for (let s = 0; s <= this.#strokeConnect.length - 1; s++) {
      if (!(s == this.#strokeConnect))
        for (let t = 0; t <= this.#strokeConnect[s].length - 1; t++) {
          if (!(t == this.#strokeConnect[s].length - 1)) {
            let drawLine1 = {
              x: this.zFormula(
                this.#points[this.#strokeConnect[s][t]][0],
                this.#points[this.#strokeConnect[s][t]][1],
                this.#points[this.#strokeConnect[s][t]][2],
              ).x,
              y: this.zFormula(
                this.#points[this.#strokeConnect[s][t]][0],
                this.#points[this.#strokeConnect[s][t]][1],
                this.#points[this.#strokeConnect[s][t]][2],
              ).y,
            };
            let drawLine2 = {
              x: this.zFormula(
                this.#points[this.#strokeConnect[s][t + 1]][0],
                this.#points[this.#strokeConnect[s][t + 1]][1],
                this.#points[this.#strokeConnect[s][t + 1]][2],
              ).x,
              y: this.zFormula(
                this.#points[this.#strokeConnect[s][t + 1]][0],
                this.#points[this.#strokeConnect[s][t + 1]][1],
                this.#points[this.#strokeConnect[s][t + 1]][2],
              ).y,
            };
            this.drawStroke(drawLine1, drawLine2);
          } else {
            let drawLine1 = {
              x: this.zFormula(
                this.#points[this.#strokeConnect[s][t]][0],
                this.#points[this.#strokeConnect[s][t]][1],
                this.#points[this.#strokeConnect[s][t]][2],
              ).x,
              y: this.zFormula(
                this.#points[this.#strokeConnect[s][t]][0],
                this.#points[this.#strokeConnect[s][t]][1],
                this.#points[this.#strokeConnect[s][t]][2],
              ).y,
            };
            let endLine = {
              x: this.zFormula(
                this.#points[this.#strokeConnect[s][0]][0],
                this.#points[this.#strokeConnect[s][0]][1],
                this.#points[this.#strokeConnect[s][0]][2],
              ).x,
              y: this.zFormula(
                this.#points[this.#strokeConnect[s][0]][0],
                this.#points[this.#strokeConnect[s][0]][1],
                this.#points[this.#strokeConnect[s][0]][2],
              ).y,
            };
            this.drawStroke(drawLine1, endLine);
          }
        }
    }
  }

  drawStroke(p1, p2) {
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }
}



