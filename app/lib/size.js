"use strict";

class Size {
  constructor(width, height) {
    this.width = width;
    if (height === undefined) {
      this.height = width;
    } else {
      this.height = height;
    }
  }
}

module.exports = Size
