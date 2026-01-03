const canvas = document.getElementById("cont");
const ctx = canvas.getContext("2d");
canvasInitialize();

class Meth{
  sin(num) {
    return Math.sin(num * Math.PI/180);
  }
  cos(num) {
    return Math.cos(num * Math.PI/180);
  }
  tan(num) {
    return Math.tan(num * Math.PI/180);
  }
}
const meth = new Meth();

const viewPort = {
  x: 500,
  y: 500,
};

const screenCenter = {
  x: window.innerWidth / 2,
  y: -window.innerHeight / 2,
};

function canvasInitialize() {
  canvas.width = 1000;
  canvas.height = 1000;
  canvas.style.backgroundColor = "#121212";
  canvas.style.border = "3px white solid";
}
class CubeRender {
  #points;
  #strokeConnect;
  #pos;

  constructor() {
    document.addEventListener("mousedown", (event) => {
      // ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      this.#pos = [canvas.width / 2, canvas.height / 2];
      this.#pos = [mouseX, mouseY];
      ctx.setTransform(1, 0, 0, 1, this.#pos[0], this.#pos[1]);
      this.drawCube(this.#pos[0], this.#pos[1], 1);
      console.log(this.#pos);
    });
  }

  normalized(x, y, z) {
    x = x * (canvas.width - 0) + 0;
    y = y * (canvas.height - 0) + 0;
    z = z * (canvas.height * 0.01 - 1) + 1;
    // z = z*((canvas.height*0.01)-1)+1
    return { x, y, z };
  }

  zFormula(x, y, z) {
    x = x / z;
    y = y / z;
    // y = -y;
    // x = -x;
    return { x, y };
  }
  drawCube(x, y) {
    this.#points = [
      [-0.3, 0.3, 0.31],
      [0.3, 0.3, 0.31],
      [0.3, -0.3, 0.31],
      [-0.3, -0.3, 0.31],

      [-0.3, 0.3, 0.42],
      [0.3, 0.3, 0.42],
      [0.3, -0.3, 0.42],
      [-0.3, -0.3, 0.42],
    ];

    this.#strokeConnect = [
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7],
    ];

    for (let n in this.#points) {
      console.log("norm");
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
      this.#points[i][0] += x - viewPort.x;
      this.#points[i][1] += y - viewPort.y;
      this.#points[i][1] = this.#points[i][1];
    }

    ctx.beginPath();
    console.log(this.#points);

    ctx.strokeStyle = "lime";
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

    console.log(
      this.zFormula(this.#points[0][0], this.#points[0][1], this.#points[0][2])
        .x,
    );

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



const cr = new CubeRender();
cr;

console.log(meth.cos(30));
ctx.fillStyle = 'red'
    ctx.fillRect(canvas.width/2, canvas.height/2, 10, 10);