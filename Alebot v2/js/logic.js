let globalDb = fetchDb();
let info = fetchInfo();
let toLearn = false;
let oldPromt;

//https://json.extendsclass.com/bin/5de28267dab0
//../datas/db.json
async function fetchDb() {
  await fetch("https://json.extendsclass.com/bin/5de28267dab0")
    .then((res) => res.json())
    .then((json) => (globalDb = json));
  if (typeof globalDb === "string") {
    globalDb = JSON.parse(globalDb);
  }
  console.log(globalDb);
  return globalDb;
}
async function fetchInfo() {
  await fetch("../datas/infos.json")
    .then((res) => res.json())
    .then((json) => (info = json));
  console.log(info);
  return info;
}
function understandPrompt(prompt) {
  prompt = prompt.toLowerCase();
  prompt = prompt.replace(/-/g, " ");
  prompt = prompt.replace(/[?]/g, "=é");
  prompt = prompt.split(" ");
  prompt = prompt.filter((prompt) => prompt !== "");
  for (let i = 0; i <= prompt.length; i++) {
    const element = prompt[i];
    for (const key in info.synonyme) {
      if (element === key) {
        element.replace(key, info.synonyme[key]);
      }
    }
  }
  return prompt;
}
function answerPrompt(prompt) {
  let answer;
  let answerPoint = {};
  for (const key in globalDb) {
    if (prompt.length > 1) {
      for (let i = 0; i <= prompt.length; i++) {
        if (key.match(prompt[i]) && prompt[i] !== undefined) {
          // console.log(`${prompt[i]} match avec : ${key}`);

          if (answerPoint[key] <= 1) {
            answerPoint[key] = answerPoint[key] + 1;
          } else {
            answerPoint[key] = 1;
          }
        }
      }
    } else {
      if (key.match(prompt[0])) {
        // console.log(`${prompt[0]} match avec : ${key}`);

        if (answerPoint[key] <= 1) {
          answerPoint[key] = answerPoint[key] + 1;
        } else {
          answerPoint[key] = 1;
        }
      }
    }
  }
  let biggest = 0;
  console.log(answerPoint);

  for (const key in answerPoint) {
    if (answerPoint[key] >= biggest) {
      answer = globalDb[key];
      biggest = answerPoint[key];
    }
  }

  return answer;
}
function promptNormalizer(prompt) {
  prompt = prompt.toLowerCase();
  prompt = prompt.replace(/-/g, " ");
  prompt = prompt.replace(/’/g, " ");
  prompt = prompt.replace(/[?]/g, "=é");
}
async function learn(question, answer) {
  globalDb[question] = answer;
  const res = await fetch(`https://json.extendsclass.com/bin/5de28267dab0`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Security-key": "test123",
    },
    body: JSON.stringify(globalDb),
  });

  const result = await res.json();
  console.log("Mise à jour réussie :", result);
}
export default function logic(prompt) {
  let answer;
  if (toLearn) {
    learn(oldPromt, prompt);
    toLearn = false;
    answer = "Merci, je le retien !";
  } else {
    oldPromt = prompt;
    prompt = understandPrompt(prompt);
    answer = answerPrompt(prompt);

    if (answer === undefined) {
      toLearn = true;
      console.log("answer null");
      answer =
        "Je ne connais pas la réponse.(Le prochain prompt sera défini comme étant la réponse.)";
    } else {
      answer = answer.replace(/=è/g, "?");
    }
  }
  return { prompt: prompt, answer: answer };
}
