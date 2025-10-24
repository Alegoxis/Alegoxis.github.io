// **************** Variables ***************
const counterDisplay = document.querySelector("h3");
let counter = 0;
// **************** Function ****************

const bubbleMachine = () => {
  const bubble = document.createElement("span");
  const size = Math.random() * 200 + 100 + "px";
  const plusMinus = Math.random() > 0.5 ? 1 : -1;
  bubble.classList.add("bubble");

  bubble.style.height = size;
  bubble.style.width = size;
  document.body.appendChild(bubble);

  bubble.style.top = Math.random() * 100 + 50 + "%";
  bubble.style.left = Math.random() * 100 + "%";

  bubble.style.setProperty("--left", Math.random() * 100 + plusMinus + "%");
  bubble.addEventListener("click", () => {
    bubble.remove();
    counter++;
    counterDisplay.textContent = counter;
  });

  setTimeout(() => {
    bubble.remove();
  }, 8000);
};
// **************** Bubbles ******************
setInterval(bubbleMachine, 300);
