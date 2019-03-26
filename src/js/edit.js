export default function(books) {
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  const addForm = document.getElementById("add-book-form");

  if (id && books[id]) {
    const {
      title,
      authors,
      year,
      publisher,
      address,
      category,
      photo,
      phone
    } = books[id];

    addForm.title.value = title;
    addForm.authors.value = authors;
    addForm.year.value = year;
    addForm.publisher.value = publisher;
    addForm.phone.value = phone;
    addForm.category.value = category;
    addForm.photo.value = photo;
    addForm.address.value = address;
  }

  addForm.addEventListener("submit", id ? editBook : addBook);

  function addBook(e) {
    e.preventDefault();

    const newBook = {
      title: e.target.title.value,
      authors: e.target.authors.value,
      year: e.target.year.value,
      publisher: e.target.publisher.value,
      address: e.target.address.value,
      phone: e.target.phone.value,
      photo: [e.target.photo.value],
      category: e.target.category.value
    };

    books.push(newBook);
    // save to localstorage or replace with request
    localStorage.setItem("books", JSON.stringify(books));

    // redirect to catalogue
    window.location.href = "/index.html";
  }

  function editBook(e) {
    e.preventDefault();

    const newBook = {
      title: e.target.title.value,
      authors: e.target.authors.value,
      year: e.target.year.value,
      publisher: e.target.publisher.value,
      address: e.target.address.value,
      phone: e.target.phone.value,
      photo: [e.target.photo.value],
      category: e.target.category.value
    };

    books.splice(id, 1, newBook);
    // save to localstorage or replace with request
    localStorage.setItem("books", JSON.stringify(books));

    // redirect to catalogue
    window.location.href = "/index.html";
  }
}
