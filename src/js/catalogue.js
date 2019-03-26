export default function(books, categories) {
  const catalogue = document.getElementById("catalogue");
  const filterForm = document.getElementById("filter");
  const filterClearButton = document.getElementById("filter-clear");

  filterForm.category.innerHTML = [
    `<option value="">all</option>`,
    ...categories.map(
      category => `<option value="${category}">${category}</option>`
    )
  ].join``;

  const filters = {
    searchline: filterForm.searchline.value,
    category: filterForm.category.value
  };

  filterForm.addEventListener("submit", applyFilters);
  filterClearButton.addEventListener("click", clearFilters);

  function applyFilters(e) {
    e.preventDefault();

    filters.category = e.target.category.value;
    filters.searchline = e.target.searchline.value;

    let filteredBooks = [...books];

    if (filters.category) {
      filteredBooks = filteredBooks.filter(
        book => book.category === filters.category
      );
    }

    if (filters.searchline) {
      const searchString = new RegExp(filters.searchline, "i");
      filteredBooks = filteredBooks.filter(book => {
        for (let field in book) {
          if (searchString.test(book[field])) return true;
        }
        return false;
      });
    }

    if (filteredBooks.length === 0) {
      catalogue.innerHTML =
        "<li><div><h3>Ooops... No books found</h3><p>Try to clear all filters or reload the page.</p></div></li>";
      return;
    }

    showBooks(filteredBooks);
  }

  function clearFilters(e) {
    e.preventDefault();

    filters.searchline = filterForm.searchline.value;
    filters.category = filterForm.category.value;

    showBooks(books);
  }

  function showBooks(books) {
    // show message if books array is empty
    if (books.length === 0) {
      catalogue.innerHTML =
        "<li><div><h3>Ooops... There are no books</h3><p>You can add books to this catalogue</p></div></li>";
      return;
    }

    catalogue.innerHTML = [...books].map((book, index) => {
      const {
        title,
        authors,
        year,
        publisher,
        address,
        category,
        photo,
        phone
      } = book;

      return `<li>
      <img src="${photo[0] ||
        "assets/img/no-image.png"}" alt="" class="cat-img" />
      <div class="cat-desc">
        <h3>${title}</h3>
        <p>${year}</p>
        <p>${authors}</p>
        <p><strong>Publisher:</strong> ${publisher}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Category:</strong> ${category}</p>
      </div>
      <div class="cat-btn">
        <a class="button" href="/edit.html?id=${index}"><i class="fas fa-pencil-alt"></i></a>
        <button class="danger" id="book-${index}">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </li>`;
    }).join``;

    books.forEach((book, index) => {
      document
        .querySelector(`#book-${index}`)
        .addEventListener("click", () => deleteBook(index));
    });
  }

  function deleteBook(id) {
    books.splice(id, 1);
    // save to localstorage or replace with request
    localStorage.setItem("books", JSON.stringify(books));

    showBooks(books);
  }

  showBooks(books);
}
