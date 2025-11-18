// *************** Variables **************
const btn = document.body.querySelector(".toggle-btn");
const sidebar = document.body.querySelector("#side-bar");
const content = document.body.querySelector(".content");
const projectClass = document.body.querySelector(".project");
const buttonFullscreen = document.getElementById("fullscreen");
const moreInfoBtn = document.getElementById("more-info");
const rightPart = document.body.querySelector(".right-part");
const params = new URLSearchParams(window.location.search);
const projectUrl = params.get("src");

let toggle = false;
let moreInfo = false;

// *************** Functions *************

// ***************** Events **************
btn.addEventListener("click", () => {
  if (toggle === false) {
    sidebar.classList.toggle("active");
    toggle = true;
  } else {
    sidebar.classList.toggle("active");
    toggle = false;
  }
});
moreInfoBtn.addEventListener("click", () => {
  if (moreInfo === false) {
    rightPart.classList.toggle("button-clicked");
    moreInfo = true;
  } else {
    rightPart.classList.toggle("button-clicked");
    moreInfo = false;
  }
});
content.addEventListener("click", () => {
  if (toggle === true) {
    sidebar.classList.toggle("active");
    toggle = false;
  }
});
window.addEventListener("load", () => {
  console.log(projectUrl);
  projectClass.innerHTML = `<iframe src="./${projectUrl}/" id="project"></iframe>`;
});
buttonFullscreen.addEventListener("click", () => {
  projectClass.requestFullscreen();
});
// ***************** code ****************

//Put your code here
