// for node.js
// const fs = require("fs");
// const { start } = require("repl");
// const data = JSON.parse(fs.readFileSync("./javascript/data.json", "utf-8"));

// for browser
async function loaddata(path) {
  const response = await fetch(path);
  return await response.json();
}
let data;
async function init() {
  data = await loaddata("./javascript/data.json");
  console.log("Model loaded");
}

init();

console.log(data);
function tokenize(data) {
  data = data.toLowerCase();
  data = data.replace(/-/g, " "); // vire les -
  data = data.replace(/\n/g, " "); // vire les retours a la ligne
  data = data.replace(/\r/g, ""); // vire les "\r" qui se rajoute
  data = data.split(" "); // transforme en liste
  data = data.filter((data) => data !== ""); // vire les elements vide
  return data;
}

function NextWord(input, data) {
  let len = input.length;
  let lastTwoWords =
  `${input[len - 2]}|${input[len - 1]}`.toLowerCase();
  console.log("lastTwoWords:", lastTwoWords);

    let NextWord = data[lastTwoWords];

    if (typeof NextWord === "string") {
      return NextWord;
    }else{
      try {
      let length = NextWord.length;
      let wordnum = Math.floor(Math.random() * 1000 % length - 1);
      let finalWord = NextWord[wordnum]
      console.log("finalWord:", finalWord);
      return finalWord;
    } catch (err) {
      return null;  
    }
  }

}
// console.log(NextWord(["<start>"," je"],data))

export default function runModel(prompt,showAll=false) {
  let input = prompt.toLowerCase();
  let inputTokens = tokenize(input);
  if (typeof inputTokens === "string") {
    inputTokens = [inputTokens];
    log("inputTokens:", inputTokens);
  }
  if (inputTokens.length < 2) {
    let startword = ["<start>"];
    inputTokens = startword.concat(inputTokens);
  }
  // log("inputTokens:", inputTokens);
  let answer = [];
  while(true) {
    let nextWord = NextWord(inputTokens, data);
    if (nextWord === null || nextWord === undefined) {
      inputTokens =["<start>","<start>"];
      continue;
    }
    if (answer.length < 1 && nextWord === "<end>" ) {
      continue;
      
    }
    if (nextWord === "<end>" || !nextWord) {
      break;
    }
    answer.push(nextWord);
    inputTokens.push(nextWord);
  }

  let answerStr = answer.join(" ");
  return answerStr;
}
// console.log(runModel("<start> je", data, showAll = true));
// runModel("<start> je", data);