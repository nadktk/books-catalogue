import cataloguePage from "./catalogue.js";
import editPage from "./edit.js";

const endpoint = "assets/static/books.json";

// init Books Catalogue object;
let BC = {};

BC.getBooks = function() {
  if (localStorage.getItem("books")) {
    this.books = JSON.parse(localStorage.getItem("books"));
    this.setCategories();
  } else {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        localStorage.setItem("books", JSON.stringify(data));
        this.books = data;
        this.setCategories();
      });
  }
};

BC.setCategories = function() {
  this.categories = [...this.books]
    .map(book => book.category)
    .filter((category, i, arr) => arr.indexOf(category) === i);

  switch (window.location.pathname) {
    case "/edit.html":
      editPage(BC.books);
      break;
    default:
      cataloguePage(BC.books, BC.categories);
  }
};

BC.getBooks();
