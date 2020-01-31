import {createElement} from "/scripts/createElement.mjs";
import {removeEntry} from "/scripts/books/removeBook.mjs";
import {editEntry} from "/scripts/books/editBook.mjs";

const results = document.querySelector("main .results");

export async function loadBooks(data_) {
  const data = data_ || await getBooks();
  while (results.children.length) {
    results.firstChild.remove();
  }

  for (let i = data.length - 1; i >= 0; i--) {
    const d = data[i];
    const result = createElement("div", "result");
    const title = createElement("span", "title", d.title);
    const removeButton = createElement("button", "remove");
    const removeImage = createElement("img");
    const editButton = createElement("button", "edit");
    const editImage = createElement("img");

    result.setAttribute("_id", d._id);

    removeButton.onclick = removeEntry;
    removeImage.src = "/images/x.svg";
    removeImage.alt = "Remove";

    editButton.onclick = editEntry;
    editImage.src = "/images/edit.svg";
    removeImage.alt = "Edit";

    editButton.appendChild(editImage);
    removeButton.appendChild(removeImage);
    result.append(title, editButton, removeButton);
    results.appendChild(result);
  }
}

export async function getBooks() {
  const response = await fetch("https://homequery.herokuapp.com/book")
    .catch(err => console.log("Error while fetching data.\n", err));
  if (response.ok) {
    const data = await response.json();
    return data;
  }
}