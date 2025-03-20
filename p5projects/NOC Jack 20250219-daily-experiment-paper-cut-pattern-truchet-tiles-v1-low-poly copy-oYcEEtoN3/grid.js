class Grid {
  constructor(p, options) {
    this.p = p;
    this.x = options?.x ?? 0;
    this.y = options?.y ?? 0;
    this.w = options?.w ?? p.width;
    this.h = options?.h ?? p.height;
    this.colsNum = options?.colsNum ?? 8;
    this.rowsNum = options?.rowsNum ?? 8;
    this.loopFramesNum = options?.loopFramesNum ?? 120;
    this.choices = options?.choices ?? [0];
    this.innerDetails = options?.innerDetails ?? 9;
    this.outterDetails = options?.outterDetails ?? 9;
    this.toothDetails = options?.toothDetails ?? 5;
    this.minCutWidth = options?.minCutWidth ?? 0.1;
    this.maxCutWidth = options?.maxCutWidth ?? 1 / 3;
    this.innerToothed = options?.innerToothed ?? false;
    this.outterToothed = options?.outterToothed ?? false;
    this.scaleFactor = options?.scaleFactor ?? 0.9;
    this.init();
  }

  init() {
    this.tileWidth = this.w / this.colsNum;
    this.tileHeight = this.h / this.rowsNum;
    this.tiles = this.makeGrid();
  }

  makeGrid() {
    const tiles = [];
    for (let r = 0; r < this.rowsNum; r++) {
      for (let c = 0; c < this.colsNum; c++) {
        const x = this.tileWidth * c;
        const y = this.tileHeight * r;
        const tileOptions = {
          innerDetails: this.innerDetails,
          outterDetails: this.outterDetails,
          // shape: c % 2 == r % 2 ? 0 : 1,
          shape: this.p.random(this.choices),
          innerToothed: this.innerToothed,
          outterToothed: this.outterToothed,
          scaleFactor: this.scaleFactor,
        };
        const tile = new Tile(
          this.p,
          x + this.tileWidth / 2,
          y + this.tileHeight / 2,
          this.tileWidth,
          this.tileHeight,
          tileOptions
        );
        tiles.push(tile);
      }
    }
    return tiles;
  }

  draw() {
    for (const tile of this.tiles) {
      if (tile.highlighted) {
        this.pfill(0);
      } else {
        this.pfill(255);
      }
      tile.draw();
    }
  }

  cut() {
    this.p.background("#e01b0d");
    this.p.stroke(220);
    this.tiles.forEach((tile, index) => {
      const c = index % this.colsNum;
      const r = Math.floor(index / this.colsNum);
      // tile.cutWidth = this.p.map(noise(c/4, r/4, frameCount / 100), 0, 1, 0.1, 0.9);
      // tile.cutWidth = this.p.map(
      //   cos((c / this.colsNum) * TWO_PI - PI) *
      //     cos((r / this.rowsNum) * TWO_PI - PI),
      //   -1,
      //   1,
      //   0.1,
      //   0.9
      // );
      const cProgress = c / this.colsNum - 0.5;
      const rProgress = r / this.rowsNum - 0.5;
      tile.cutWidth = this.p.map(
        Math.cos(
          Math.PI *
            2 *
            Math.sqrt(cProgress * cProgress + rProgress * rProgress) +
            (this.p.frameCount / this.loopFramesNum) * Math.PI * 2
        ),
        -1,
        1,
        this.minCutWidth,
        this.maxCutWidth
      );
      this.p.stroke(0);
      this.p.fill(255);
      tile.cut();
    });
  }

  clearHighlights() {
    for (const tile of this.tiles) {
      tile.highlighted = false;
    }
  }

  highlightOverlap(vertices) {
    const threshold = max(this.tileWidth, this.tileHeight) / 2;
    for (const vertex of vertices) {
      for (const tile of this.tiles) {
        if (this.p.dist(vertex.x, vertex.y, tile.x, tile.y) < threshold) {
          tile.highlighted = true;
        }
      }
    }
  }

  canvasResized(options) {
    this.w = options?.w ?? this.p.width;
    this.h = options?.w ?? this.p.height;
    this.init();
  }
}

class Tile {
  constructor(p, x, y, w, h, options) {
    this.p = p;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.innerDetails = options?.innerDetails ?? 9;
    this.outterDetails = options?.outterDetails ?? 9;
    this.highlighted = false;
    this.shape = options?.shape ?? 0;
    this.scaleFactor = options?.scaleFactor ?? 0.9;
    this.cutWidth = options?.cutWidth ?? 0.5;
    this.innerToothed = options?.innerToothed ?? false;
    this.outterToothed = options?.outterToothed ?? false;
  }

  attachNeigbor(name, tile) {
    this[name] = tile;
  }

  draw() {
    // rect(this.x, this.y, this.w, this.h);
    this.p.ellipse(this.x, this.y, this.w, this.h);
  }

  cut() {
    const w = this.cutWidth;
    const makeArc = (
      x,
      y,
      radius,
      startAngle,
      endAngle,
      reversed = false,
      details = 9,
      toothOffset = 0,
      toothReversed = false
    ) => {
      return new Array(details).fill(0).map((element, index, array) => {
        const r =
          (index % 2 == 1) == !toothReversed ? radius + toothOffset : radius;
        const progress = index / (array.length - 1);
        const angle = reversed
          ? this.p.map(progress, 1, 0, startAngle, endAngle)
          : this.p.map(progress, 0, 1, startAngle, endAngle);
        const vx = Math.sin(angle) * r + x;
        const vy = Math.cos(angle) * r + y;
        return [vx, vy];
      });
    };
    const inR = (1 - w) / 2;
    const outR = (1 - w) / 2 + w;
    const middleR = (inR + outR) / 2;
    const inOffset = this.innerToothed ? middleR - inR : 0;
    const outOffset = this.outterToothed ? middleR - outR : 0;

    const pointA = [-0.5, -0.5];
    const pointB = [0.5, -0.5];
    const pointC = [0.5, 0.5];
    const pointD = [-0.5, 0.5];

    const arcInA = makeArc(
      -0.5,
      -0.5,
      inR,
      (Math.PI / 2) * 0,
      (Math.PI / 2) * 1,
      0,
      this.innerDetails,
      inOffset
    );
    const arcInB = makeArc(
      -0.5,
      0.5,
      inR,
      (Math.PI / 2) * 1,
      (Math.PI / 2) * 2,
      0,
      this.innerDetails,
      inOffset
    );
    const arcInC = makeArc(
      0.5,
      0.5,
      inR,
      (Math.PI / 2) * 2,
      (Math.PI / 2) * 3,
      0,
      this.innerDetails,
      inOffset
    );
    const arcInD = makeArc(
      0.5,
      -0.5,
      inR,
      (Math.PI / 2) * 3,
      (Math.PI / 2) * 4,
      0,
      this.innerDetails,
      inOffset
    );

    const arcOutA = makeArc(
      -0.5,
      -0.5,
      outR,
      (Math.PI / 2) * 0,
      (Math.PI / 2) * 1,
      -1,
      this.outterDetails,
      outOffset,
      true
    );
    const arcOutB = makeArc(
      -0.5,
      0.5,
      outR,
      (Math.PI / 2) * 1,
      (Math.PI / 2) * 2,
      -1,
      this.outterDetails,
      outOffset,
      true
    );
    const arcOutC = makeArc(
      0.5,
      0.5,
      outR,
      (Math.PI / 2) * 2,
      (Math.PI / 2) * 3,
      -1,
      this.outterDetails,
      outOffset,
      true
    );
    const arcOutD = makeArc(
      0.5,
      -0.5,
      outR,
      (Math.PI / 2) * 3,
      (Math.PI / 2) * 4,
      -1,
      this.outterDetails,
      outOffset,
      true
    );

    const patterns = [
      {
        name: "arcs-ac",
        paths: [
          [...arcInA, ...arcOutA],
          [...arcInC, ...arcOutC],
        ],
      },
      {
        name: "arcs-bd",
        paths: [
          [...arcInB, ...arcOutB],
          [...arcInD, ...arcOutD],
        ],
      },
      {
        name: "cross",
        paths: [
          [
            [-w / 2, -0.5],
            [w / 2, -0.5],
            [w / 2, -w / 2],
            [0.5, -w / 2],
            [0.5, w / 2],
            [w / 2, w / 2],
            [w / 2, 0.5],
            [-w / 2, 0.5],
            [-w / 2, w / 2],
            [-0.5, w / 2],
            [-0.5, -w / 2],
            [-w / 2, -w / 2],
          ],
        ],
      },
      {
        name: "arcs-ac-inverse",
        paths: [
          [...arcInA, pointA],
          [pointB, ...arcOutA, pointD, ...arcOutC],
          [...arcInC, pointC],
        ],
      },
      {
        name: "arcs-bd-inverse",
        paths: [
          [...arcInB, pointD],
          [pointA, ...arcOutB, pointC, ...arcOutD],
          [...arcInD, pointB],
        ],
      },
      {
        name: "cross-inverse",
        paths: [
          [pointA, [-w / 2, -0.5], [-w / 2, -w / 2], [-0.5, -w / 2]],
          [pointB, [0.5, -w / 2], [w / 2, -w / 2], [w / 2, -0.5]],
          [pointC, [w / 2, 0.5], [w / 2, w / 2], [0.5, w / 2]],
          [pointD, [-0.5, w / 2], [-w / 2, w / 2], [-w / 2, 0.5]],
        ],
      },
    ];
    this.p.push();
    this.p.translate(this.x, this.y);
    this.p.scale(this.w * this.scaleFactor, this.h * this.scaleFactor);
    this.p.strokeWeight(0.02);

    patterns[this.shape].paths.forEach((path) => {
      this.p.beginShape();
      path.forEach((v) => this.p.vertex(v[0], v[1]));
      this.p.endShape(this.p.CLOSE);
    });
    this.p.pop();
  }
}
