"use strict";

class Art {
  constructor(canvas, width, height) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.context = this.canvas.getContext("2d");
    this.canvas.width = width; // window.outerWidth;
    this.canvas.height = height; // window.outerHeight;
    this.imageData = this.context.createImageData(this.width, this.height);
  }

  setPixel(point, color) {
    var index = (point.x + point.y * this.width) * 4;
    this.imageData.data[index + 0] = color.red;
    this.imageData.data[index + 1] = color.green;
    this.imageData.data[index + 2] = color.blue;
    this.imageData.data[index + 3] = color.alpha;
  }

  drawSquare(square) {
    let xEnd = square.offset.x + square.size.width - 1
    if (xEnd >= this.width) {
      xEnd = this.width - 1
    }
    let yEnd = square.offset.y + square.size.height - 1;
    if (yEnd >= this.height) {
      yEnd = this.height - 1
    }
    var point = Object.create(square.offset);
    for (let x = square.offset.x; x <= xEnd; ++x) {
      point.x = x
      for (let y = square.offset.y; y <= yEnd; ++y) {
        point.y = y
        this.setPixel(point, square.color)
      }
    }
  }

  draw() {
    this.context.putImageData(this.imageData, 0, 0);
  }
}

module.exports = Art
