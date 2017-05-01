const Size = require("lib/size")
const Project = require("lib/project")

document.addEventListener("DOMContentLoaded", () => {
  console.log("Initialized app")
  let project = new Project({
    canvas: document.querySelector("#canvas"),
    canvasSize: new Size(100, 100),
    paletteSize: 5,
    squareWidth: 5
  })
  window.project = project
  let counter = 1
  let result
  do {
    result = project.run()
    if (result == -1) {
      console.log(`failed ${counter++}`)
    }
  } while (result == -1)
});
