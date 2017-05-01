"use strict";

const Art = require("./art")
const Mapping = require("./mapping")
const Palette = require("./palette")
const Square = require("./square")
const Point = require("./point")
const Size = require("./size")
const randomInt = require("lib/randomInt")

class Project {
  constructor(options = {}) {
    this.canvas = options.canvas
    this.canvasSize = options.canvasSize
    this.paletteSize = options.paletteSize
    this.squareWidth = options.squareWidth
    this.art = new Art(
      this.canvas,
      this.canvasSize.width,
      this.canvasSize.height
    )
    this.mapping = new Mapping(this.canvasSize)
    this.squares = []
    this.palette = new Palette(this.paletteSize)

  }

  handleFreePoint(point) {
    // console.log(`${x},${y} IS free`)
    let nearestSize = this.mapping.findNearestSquareSize(point, this.squareWidth)
    // console.log(`${x},${y} nearestSize: ${nearestSize}`)
    let size = this.randomSize(nearestSize + 1)
    // console.log(`${x},${y} size: `, size)
    let nearColorIndexes = this.mapping.getNearColors(point, size)

    if (nearColorIndexes.length == this.paletteSize) {
      return -1
    }
    // console.log(`${x},${y} nearColorIndexes: `, nearColorIndexes)
    let color = this.palette.randomExcept(nearColorIndexes)
    // console.log(`${x},${y} color: `, color)
    let square = new Square(size, color, point, this.squares.length)
    // console.log(`${x},${y} square: `, square)
    this.squares.push(square)
    // console.log(`${squares.length} squares`)
    this.mapping.occupy(square)
    // console.log(mapping.data)
    this.art.drawSquare(square)
    // console.log(`${x},${y} IS free: [nearestSize:${nearestSize}] [size:${size.width}x${size.height}]`);
  }

  run() {
    for (var y = 0; y < this.canvasSize.height; ++y) {
      // console.log(`y:${y}`)
      for (var x = 0; x < this.canvasSize.width; ++x) {
        // console.log(`x:${x}`)
        let point = new Point(x, y)
        if (this.mapping.isFree(point)) {
          let result = this.handleFreePoint(point)
          if (result == -1) {
            return result
          }
        } else {
          // console.log(`${x},${y} IS NOT free, skipping`);
        }
      }
    }
    this.art.draw()
  }

  randomSize(max) {
    let value
    if (randomInt(3) > 1) {
      value = randomInt(max - 1) + 1;
    } else {
      value = randomInt(max / 2) + 1;
    }
    return new Size(value, value);
  }
}

module.exports = Project
