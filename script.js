const canvas = document.getElementById("cont");
const ctx = canvas.getContext("2d");
canvasInitialize();

const screenCenter = {
  x: window.innerWidth / 2,
  y: -window.innerHeight / 2,
};

function canvasInitialize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  canvas.style.backgroundColor = "#121212";
  canvas.style.border = "3px white solid";
}
class CubeRender {
  #points;
  #strokeConnect;
  #pos;

  constructor() {
    // this.#pos = [screenCenter.x, screenCenter.y];
    document.addEventListener("mousedown", (event) => {
      // ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      this.#pos = [mouseX, mouseY];
      ctx.setTransform(1, 0, 0, 1, this.#pos[0], this.#pos[1]);
      this.drawCube(this.#pos[0], this.#pos[1], 1);
      // this.drawStroke();
      console.log(this.#pos);
      // ctx.restore()
    });
  }
  zFormula(x, y, z) {
    x = x / z;
    y = y / z;
    y = -y;
    x = -x;
    return { x, y };
  }
  drawCube(x, y, z) {
    let dist = 1.2; //distancefrom camera

    this.#points = [
      [-100, 100],
      [100, 100],
      [100, 300],
      [-100, 300],
    ];

    this.#strokeConnect = [
      [0, 1, 2, 3],
      [0, 4],
      [1, 5],
      [2, 6],
      [3, 7],
    ];

    for (let i in this.#points) {
      this.#points[i][0] = this.zFormula(
        this.#points[i][0],
        this.#points[i][1],
        dist,
      ).x;
      this.#points[i][1] = this.zFormula(
        this.#points[i][0],
        this.#points[i][1],
        dist,
      ).y;
      this.#points[i][0] += x - window.innerWidth / 2;
      this.#points[i][1] += y - window.innerHeight / 3;
      this.#points[i][1] = this.#points[i][1];
    }

    ctx.beginPath();
    console.log(this.#points);

    ctx.strokeStyle = "lime";
    ctx.fillStyle = "red";

    for (let l = 0; l <= this.#points.length; l++) {
      if (l > 1) {
        ctx.fillStyle = "green";
      }
      if (!(l == this.#points.length)) {
        // ctx.fillRect(this.#points[l][0], this.#points[l][1],10,10);
        ctx.fillRect(
          this.zFormula(this.#points[1][0], this.#points[1][1], dist).x,
          this.zFormula(this.#points[1][0], this.#points[1][1], dist).y,
          10,
          10,
        );
        ctx.fillRect(
          this.zFormula(this.#points[2][0], this.#points[2][1], dist).x,
          this.zFormula(this.#points[2][0], this.#points[2][1], dist).y,
          10,
          10,
        );
        ctx.fillRect(
          this.zFormula(this.#points[3][0], this.#points[3][1], dist).x,
          this.zFormula(this.#points[3][0], this.#points[3][1], dist).y,
          10,
          10,
        );
        ctx.fillRect(
          this.zFormula(this.#points[0][0], this.#points[0][1], dist).x,
          this.zFormula(this.#points[0][0], this.#points[0][1], dist).y,
          10,
          10,
        );
        dist += 0.1;

        // console.log(dist)
      } else {
        // ctx.fillRect(this.#points[0][0], this.#points[0][1],10,10);
      }
    }
    console.log(this.zFormula(this.#points[0][0], this.#points[0][1], dist).x);

    for (let s = 0; s <= this.#strokeConnect.length - 1; s++) {
      if (!(s == this.#strokeConnect))
        for (let t = 0; t <= this.#strokeConnect[s].length - 1; t++) {
      if (!(t == this.#strokeConnect[s].length -1)){
          console.log(t)

          let drawLine1 = {
            x: this.zFormula(this.#points[t][0], this.#points[t][1], dist).x,
            y: this.zFormula(this.#points[t][0], this.#points[t][1], dist).y,
          };
          let drawLine2 = {
            x: this.zFormula(this.#points[t + 1][0],this.#points[t + 1][1],dist).x,
            y: this.zFormula(this.#points[t + 1][0],this.#points[t + 1][1],dist).y,
          };
          this.drawStroke(drawLine1, drawLine2);
          
        }
        else{
          let drawLine1 = {
            x: this.zFormula(this.#points[t][0], this.#points[t][1], dist).x,
            y: this.zFormula(this.#points[t][0], this.#points[t][1], dist).y,
          };
          let endLine = {
            x: this.zFormula(this.#points[0][0], this.#points[0][1], dist).x,
            y: this.zFormula(this.#points[0][0], this.#points[0][1], dist).y,
          };
          this.drawStroke(drawLine1, endLine);
        }
        
        }
      console.log("work");
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
