// ********** Variables *************
const btn = document.body.querySelector(".toggle-btn");
const sidebar = document.body.querySelector("#side-bar");
const content = document.body.querySelector(".content");
let toggle = false;

// ********** Events ****************
btn.addEventListener("click", () => {
  if (toggle === false) {
    sidebar.classList.toggle("active");
    toggle = true;
  } else {
    sidebar.classList.toggle("active");
    toggle = false;
  }
});
content.addEventListener("click", () => {
  if (toggle === true) {
    sidebar.classList.toggle("active");
    toggle = false;
  }
});
