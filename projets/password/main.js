// *************** Variables **************
const form = document.querySelector("form");
const inputs = document.querySelectorAll(
  'input[type="text"],input[type="password"]'
);

let pseudo, password;
let polo = false;

// *************** Functions *************
const errordisplay = (tag, message, valid) => {
  const Container = document.querySelector("." + tag + "-container");
  const span = document.querySelector("." + tag + "-container > span");

  if (!valid) {
    Container.classList.add("error");
    span.textContent = message;
  } else {
    Container.classList.remove("error");
    span.textContent = message;
  }
};
const pseudoChecker = (value) => {
  if (value.length > 0 && (value.length < 3 || value.length > 20)) {
    errordisplay("pseudo", "le pseudo doit faire entre 3 et 20 caractères");
    pseudo = null;
  } else if (!value.match(/^[a-zA-Z0-9_.-]*$/)) {
    errordisplay(
      "pseudo",
      "Le pseudo ne doit doit pas contenire de caractères spéciaux."
    );
    pseudo = null;
  } else {
    errordisplay("pseudo", "", true);
    pseudo = value;
  }
};

const passwordChecker = (value) => {
  if (value.length <= 4) {
    errordisplay(
      "password",
      "Le mot de passe doit faire au minimum 4 caractère."
    );
    password = null;
  } else if (!value.match(/[A-Z]/)) {
    errordisplay("password", "Le mot de passe doit contenir une majuscule.");
    password = null;
  } else if (!value.match(/[0-9]/)) {
    errordisplay("password", "Le mot de passe doit contenir un nombre.");
  } else if (!value.match(/Boxe/i)) {
    errordisplay(
      "password",
      "Le mot de passe doit avoir la réponse de cette enigme : 'Quel est le sport le plus fruité ?' (En quatre lettre.)"
    );
    password = null;
  } else if (!value.match(/🥚/)) {
    errordisplay(
      "password",
      "Tu peux garder polo au frai dans ton mot de passe?🥚"
    );
  } else if (!value.match(/🪱/)) {
    errordisplay("password", "N'oublie pas de donner à manger des 🪱 à polo.");
  } else {
    errordisplay("password", "", true);
    password = value;
  }
  if (!polo && value.match(/🥚/)) {
    polo = true;
  } else if (polo && !value.match(/🥚/)) {
    alert(
      "Polo est mort je t'avais dit de le garder au frais!! Ducoup je reset ton mot de passe!!"
    );
    value = null;
  }
};

// ***************** Events **************

inputs.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "pseudo":
        pseudoChecker(e.target.value);
        break;
      case "password":
        passwordChecker(e.target.value);
        break;
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (pseudo && password) {
    const data = {
      pseudo,
      password,
    };
    console.log(data);
    alert("inscription validée");
  } else {
    alert("Veuillez remplire correctement le formulaire");
    pseudo = null;
    password = null;
  }
});
// ***************** code ****************
