"use strict";

const Color = require("./color")
const randomInt = require("./randomInt")

class Palette {
  constructor(size) {
    this.size = size;
    this.colors = [];
    // this.colors.push(new Color(255,   0,   0, 255, 0))
    // this.colors.push(new Color(  0, 255,   0, 255, 1))
    // this.colors.push(new Color(  0,   0, 255, 255, 2))
    // this.colors.push(new Color(  0,   0,   0, 255, 3))
    // this.colors.push(new Color(255, 255, 255, 255, 4))
    this.colorIndexes = [];
    var stepsLength = this.size - 1;
    for (var i = 0; i <= stepsLength; ++i) {
      this.colorIndexes.push(i);
      var step = (255 / stepsLength) * i | 0;
      var color = new Color(step, step, step, 255, i);
      this.colors.push(color);
    }
  }

  randomExcept(list) {
    var available = this.colors.filter(function(item, index) {
      return !list.includes(index);
    });
    var randomIndex = randomInt(available.length);
    return available[randomIndex]
  }
}

module.exports = Palette
