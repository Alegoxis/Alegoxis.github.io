import logic from "./js/logic.js";
// *************** Variables **************
const Form = document.getElementById("promptForm");
const promptArea = document.getElementById("prompt");
const ButtonSubmit = document.getElementById("buttonSubmit");
const messageArea = document.getElementById("message");
const chat = document.querySelector(".chat-container");
console.log(messageArea);

let prompt;

// *************** Functions *************
function displayMessage(content, target) {
  messageArea.innerHTML += `<li class="${target}">${content}</li>`;
}
// ***************** Events **************
Form.addEventListener("submit", (e) => {
  e.preventDefault();
  prompt = e.target[0].value;
  promptArea.value = null;
  displayMessage(prompt, "user");
  let answer = logic(prompt);
  displayMessage(answer.answer, "bot");
});
ButtonSubmit.addEventListener("onclick", () => {
  prompt = promptArea.value;
  promptArea.value = null;

  displayMessage(prompt, "user");
  let answer = logic(prompt);
  displayMessage(answer.answer, "bot");
});

promptArea.addEventListener("focus", () => {
  setTimeout(() => {
    chat.scrollTop = chat.scrollHeight;
  }, 300); // laisse le temps au clavier de s'ouvrir
});
// ***************** code ****************

//Put your code here
