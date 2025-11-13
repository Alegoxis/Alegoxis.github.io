// *************** Variables **************
const categoriesList = document.getElementById("categories");
const blockCanvas = document.getElementById("block-canvas");
let categories;
// *************** Functions *************
async function fetchCategories() {
  await fetch("./assets/categories.json")
    .then((res) => res.json())
    .then((data) => {
      categories = data.categories;
    });
  console.log("");
}

function Categories() {
  fetchCategories().then(() => {
    console.log(categories);
    categoriesList.innerHTML = categories
      .map(
        (categorie) =>
          `
        <div class="categorie">
            <div class="categorie-color" style="background:${categorie.color};"></div>
            <p class="categorie-name">${categorie.displayName}</p>
        </div>
      `
      )
      .join("");
  });
}

// ***************** Events **************

// ***************** code ****************

Categories();
