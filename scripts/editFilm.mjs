import {loadFilms} from "/scripts/results.mjs";
import {getSignature} from "/scripts/crypto.mjs";
import {createElement} from "/scripts/createElement.mjs";
import {showError} from "/scripts/error.mjs";

const results = document.querySelector("main .results");

export async function editEntry() {
  const id = this.parentElement.getAttribute("_id");
  const oldResult = this.parentElement;

  const wrapper = createElement("div", "new-film result");
  const filmForm = createElement("form");
  const titleInput = createElement("input");
  const submitBtn = createElement("button");
  const tick = createElement("img");
  
  filmForm.onsubmit = e => {editFilm(e, id); return false;};

  titleInput.type = "text";
  titleInput.autocomplete = "off";
  titleInput.spellcheck = "false";
  titleInput.placeholder = "Title";
  titleInput.id = titleInput.name = "title";
  titleInput.maxLength = 50;
  titleInput.value = oldResult.firstChild.innerHTML;

  submitBtn.type = "submit";
  tick.src = "/images/check.svg";

  submitBtn.append(tick);
  filmForm.append(titleInput, submitBtn);
  wrapper.appendChild(filmForm);
  results.replaceChild(wrapper, oldResult);

  titleInput.focus();

  function removeNewEntry(e) {
    if (!wrapper.contains(e.target)) {
      document.body.onclick = null;
      results.replaceChild(oldResult, wrapper);
    }
  }

  requestAnimationFrame(() => {document.body.onclick = removeNewEntry;});
}

async function editFilm(e, id) {
  const form = e.srcElement;
  const title = new FormData(form).get("title");
  if (id && title) {
    const body = {id: id, title: title};
    const str = JSON.stringify(body);

    const options = {
      method: "POST",
      headers: {
        "x-app-signature": await getSignature(str),
        "content-type": "application/json"
      },
      body: str
    };

    const response = await fetch("https://homequery.herokuapp.com/dvd/edit", options);
    if (response.ok) {
      loadFilms();
      document.body.onclick = null;
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