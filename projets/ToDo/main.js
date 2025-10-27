// *************** Variables **************
const form = document.body.querySelector("form");
const input = document.body.querySelector("input");
const list = document.body.querySelector("ul");

// *************** Functions *************

const addThingInToDoList = (value) => {
  list.innerHTML += `<li>${value}</li>`;
  const li = list.querySelectorAll("li");

  li.forEach((li) => {
    li.addEventListener("click", () => {
      if (!li.classList.contains("checked")) {
        li.classList.add("checked");
      } else {
        li.remove();
      }
    });
  });
};
// ***************** Events **************

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addThingInToDoList(input.value);
  input.value = null;
});

// ***************** code ****************
