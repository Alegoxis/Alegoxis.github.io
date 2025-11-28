async function corigeDb() {
  await fetch("./datas/db.json")
    .then((res) => res.json())
    .then((json) => (globalDb = json));
  if (typeof globalDb === "string") {
    globalDb = JSON.parse(globalDb);
  }
  console.log(globalDb);
  const res = await fetch(`https://json.extendsclass.com/bin/5de28267dab0`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Security-key": "test123",
    },
    body: JSON.stringify(globalDb),
  });
  return globalDb;
}
corigeDb();
