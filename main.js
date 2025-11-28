// ********** Variables *************
const btn = document.body.querySelector(".toggle-btn");
const sidebar = document.body.querySelector("#side-bar");
const content = document.body.querySelector(".content");
const alebot = document.body.querySelector("#Alebot");
const list = document.getElementById("project-list");

let toggle = false;
let folderList = {};
// ********** Function **************
async function FetchProject() {
  await fetch("./file_list.json")
    .then((res) => res.json())
    .then((data) => (folderList = data));
  projectsDisplay();
}
function projectsDisplay() {
  for (key in folderList.visible) {
    list.innerHTML += `
    <li><i class="fa-solid fa-folder"></i>${key}</li>
    `;
  }
}
// ********** Events ****************
window.addEventListener("load", () => {
  FetchProject();
});
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
alebot.addEventListener("click", () => {
  location.replace("./Alebot%20v2/");
});
list.addEventListener("click", (e) => {
  let clicked = e.target.outerText;
  console.log(clicked);

  location.replace(`./projets/?src=${folderList.visible[clicked]}`);
});
// *************** code ********************
