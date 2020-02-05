import {loadEntries} from "/scripts/list/results.mjs";
import {createElement} from "/scripts/createElement.mjs";
import {showError} from "/scripts/error.mjs";
import {authURL, token} from "/scripts/state.mjs";

const results = document.querySelector("main .results");

export async function editEntry(type, srcbutton) {
  if (!type) return;
  const id = srcbutton.parentElement.getAttribute("_id");
  const oldResult = srcbutton.parentElement;

  const wrapper = createElement("div", "new-entry result");
  const filmForm = createElement("form");
  const titleInput = createElement("input");
  const submitBtn = createElement("button");
  const tick = createElement("img");
  
  filmForm.onsubmit = e => {e.preventDefault(); submitEdit(e, id, type); return false;};

  titleInput.type = "text";
  titleInput.autocomplete = "off";
  titleInput.spellcheck = false;
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

async function submitEdit(e, id, type) {
  const form = e.srcElement;
  const title = new FormData(form).get("title");
  if (id && title) {
    const body = {id: id, title: title};
    const str = JSON.stringify(body);

    const options = {
      method: "POST",
      headers: {
        "token": token,
        "content-type": "application/json"
      },
      body: str
    };

    fetch(authURL + type + "/edit", options)
      .then(response => {
        if (response.ok) {
          loadEntries(null, type);
          document.body.onclick = null;
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