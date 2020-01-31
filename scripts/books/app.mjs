import {empty} from "/scripts/books/addBook.mjs";
import {loadBooks, getBooks} from "/scripts/books/results.mjs";

const searchbar = document.querySelector("main .searchbar input");

async function app() {
  const data = await getBooks();
  loadBooks(data);
  searchbar.addEventListener("input", function(e) {
    const searchData = [];
    if (this.value) {
      for (const d of data) {
        if (d.title.toLowerCase().includes(this.value.toLowerCase())) {
          searchData.push(d);
        }
      }
      loadBooks(searchData);
    } else {
      loadBooks(data);
    }
  });
}


window.onload = app;