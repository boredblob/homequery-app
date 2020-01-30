import {createElement} from "/scripts/createElement.mjs";
import {loadFilms} from "/scripts/results.mjs";
import {getSignature} from "/scripts/crypto.mjs";
import {showError} from "/scripts/error.mjs";

const results = document.querySelector("main .results");
const addFilmBtn = document.querySelector("main .searchbar button");

function newEntry() {
  addFilmBtn.onclick = null;
  const wrapper = createElement("div", "new-film result");
  const filmForm = createElement("form");
  const titleInput = createElement("input");
  const submitBtn = createElement("button");
  const tick = createElement("img");
  
  wrapper.style.maxHeight = "0px";
  
  filmForm.onsubmit = e => {addFilm(e); return false;};

  titleInput.type = "text";
  titleInput.autocomplete = "off";
  titleInput.spellcheck = "false";
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
      addFilmBtn.onclick = newEntry; 
      document.body.onclick = null;
    }
  }

  requestAnimationFrame(() => {document.body.onclick = removeNewEntry;});
}

async function addFilm(e) {
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

    const response = await fetch("http://localhost:8080/dvd/add", options);
    if (response.ok) {
      loadFilms();
      addFilmBtn.onclick = newEntry; 
    } else {
      if (response.status === 403) {
        if (window.localStorage.getItem("token")) {
          showError("Sorry, the client token is incorrect.");
        } else {
          showError("Please enter the client token to modify the list.");
        }
      }
    }
  }
}

export const empty = null;

addFilmBtn.onclick = newEntry;