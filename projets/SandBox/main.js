// *************** Variables **************
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let map = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
];
// *************** Functions *************
function frame() {
  console.log("");

  ctx.fillRect(0, 0, 10, 10);
}
// ***************** Events **************

// ***************** code ****************
frame();
