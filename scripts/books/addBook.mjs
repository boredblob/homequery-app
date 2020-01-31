import {createElement} from "/scripts/createElement.mjs";
import {loadBooks} from "/scripts/books/results.mjs";
import {getSignature} from "/scripts/crypto.mjs";
import {showError} from "/scripts/error.mjs";

const results = document.querySelector("main .results");
const addBookBtn = document.querySelector("main .searchbar button");

function newEntry() {
  addBookBtn.onclick = null;
  const wrapper = createElement("div", "new-entry result");
  const filmForm = createElement("form");
  const titleInput = createElement("input");
  const submitBtn = createElement("button");
  const tick = createElement("img");
  
  wrapper.style.maxHeight = "0px";
  
  filmForm.onsubmit = e => {addBook(e); return false;};

  titleInput.type = "text";
  titleInput.autocomplete = "off";
  titleInput.spellcheck = false;
  titleInput.placeholder = "Title";
  titleInput.id = titleInput.name = "title";
  titleInput.maxLength = 50;

  submitBtn.type = "submit";
  tick.src = "/images/check.svg";

  submitBtn.append(tick);
  filmForm.append(titleInput, submitBtn);
  wrapper.appendChild(filmForm);
  results.insertBefore(wrapper, results.firstChild);

  setTimeout(() => {
    requestAnimationFrame(() => {
      wrapper.style = "";
    });
  });

  titleInput.focus();

  function removeNewEntry(e) {
    if (!wrapper.contains(e.target)) {
      wrapper.style.maxHeight = "0px";
      setTimeout(() => wrapper.remove(), 120);
      addBookBtn.onclick = newEntry; 
      document.body.onclick = null;
    }
  }

  requestAnimationFrame(() => {document.body.onclick = removeNewEntry;});
}

async function addBook(e) {
  const form = e.srcElement;
  const title = new FormData(form).get("title");
  if (title) {
    const body = {title: title};
    const str = JSON.stringify(body);

    const options = {
      method: "POST",
      headers: {
        "x-app-signature": await getSignature(str),
        "content-type": "application/json"
      },
      body: str
    };

    fetch("https://homequery.herokuapp.com/book/add", options)
      .then(response => {
        if (response.ok) {
          loadBooks();
          addBookBtn.onclick = newEntry; 
        } else {
          if (response.status === 403) {
            if (window.localStorage.getItem("token")) {
              showError("Sorry, the client token is incorrect.");
            } else {
              showError("Please enter the client token to modify the list.");
            }
          }
        }
      })
      .catch(err => {
        console.log("Error adding film:\n" + err);
        if (!navigator.onLine) {
          showError("Sorry, modifiying the list isn't possible while offline.");
        }
      });
  }
}

export const empty = null;

addBookBtn.onclick = newEntry;