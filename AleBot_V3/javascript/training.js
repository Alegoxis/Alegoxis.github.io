const fs = require("fs");

function tokenize(data) {
  data = data.toLowerCase();
  data = data.replace(/-/g, " "); // vire les -
  data = data.replace(/\n/g, " "); // vire les retours a la ligne
  data = data.replace(/\r/g, ""); // vire les "\r" qui se rajoute
  data = data.split(" "); // transforme en liste
  data = data.filter((data) => data !== ""); // vire les elements vide
  return data;
}
// const data = tokenize(fs.readFileSync("./javascript/data.txt", "utf-8"));
const data = tokenize(fs.readFileSync("./javascript/opti corpus.txt", "utf-8"));
// const data = tokenize(fs.readFileSync("./javascript/data_fr&en.txt", "utf-8"));
// console.log(data);

function trainModel(data) {
  let readydata = {};
  let step = 0;
  data.forEach((element) => {
    let before = data[step - 1];
    let nextWord = data[step + 1]
    if (before) {
      let wordpair = `${before}|${element}`.toLowerCase();
      if (!readydata[wordpair]) {
        readydata[wordpair] = nextWord;
      } else {
        if (typeof readydata[wordpair] === "string") {
          readydata[wordpair] = [readydata[wordpair]];
        }
        readydata[wordpair] = readydata[wordpair].concat(nextWord);
      }
    }
    step++;
    console.log(`step:${step}/${data.length}`)
    if (step % 100000 === 0) {
      fs.writeFileSync("./javascript/data.json", JSON.stringify(readydata), "utf-8");
      console.log("step 100000");
    }
  });
  // console.log(readydata);
  console.log("model trained");
}

trainModel(data);
