"use strict";

const Point = require("./point")

class Mapping {
  constructor(size) {
    this.size = size
    this.data = new Array(size.width * size.height)
  }

  isFree(point) {
    return this.getSquare(point) === undefined
  }

  occupy(square) {
    let xEnd = square.offset.x + square.size.width - 1
    if (xEnd >= this.size.width) {
      xEnd = this.size.width - 1
    }
    let yEnd = square.offset.y + square.size.height - 1
    if (yEnd >= this.size.height) {
      yEnd = this.size.height - 1
    }
    var point = Object.create(square.offset);
    for (let x = square.offset.x; x <= xEnd; ++x) {
      point.x = x
      for (let y = square.offset.y; y <= yEnd; ++y) {
        point.y = y
        this.data[this.offset(point)] = square
      }
    }
  }

  getSquare(point) {
    return this.data[this.offset(point)]
  }

  offset(point) {
    return point.x + point.y * this.size.width
  }

  findNearestSquareSize(point, squareWidth) {
    for (var i = 0; i < squareWidth && point.x + i < this.size.width; ++i) {
      if (!this.isFree(new Point(point.x + i, point.y))) {
        return i
      }
    }
    return squareWidth
  }

  getNearColors(point, size) {
    let pointList = []
    let x, y;
    let yEnd, xEnd;

    x = point.x - 1
    if (x < 0) { x = 0 }
    y = point.y - 1
    if (y < 0) { y = 0 }
    yEnd = point.y + size.height
    if (yEnd >= this.size.height) {
      yEnd = this.size.height - 1
    }
    for (; y <= yEnd; ++y) {
      pointList.push(new Point(x, y))
    }

    x = point.x + size.width
    if (x >= this.size.width) { x = this.size.width - 1 }
    y = point.y - 1
    if (y < 0) { y = 0 }
    yEnd = point.y + size.height
    if (yEnd >= this.size.height) {
      yEnd = this.size.height - 1
    }
    for (; y <= yEnd; ++y) {
      pointList.push(new Point(x, y))
    }

    x = point.x
    y = point.y - 1
    if (y < 0) { y = 0 }
    xEnd = point.x + size.width - 1
    if (xEnd >= this.size.widht) {
      xEnd = this.size.width - 1
    }
    for (; x <= xEnd; ++x) {
      pointList.push(new Point(x, y))
    }

    let result = pointList.
      filter(point => !this.isFree(point)).
      map(point => this.getSquare(point)).
      map(square => square.color).
      filter(color => color !== undefined).
      map(color => color.paletteIndex).
      filter((paletteIndex, index, list) => list.indexOf(paletteIndex) === index)
    return result
  }
}

module.exports = Mapping
