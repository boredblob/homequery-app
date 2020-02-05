import {createElement} from "/scripts/createElement.mjs";
import {loadEntries} from "/scripts/list/results.mjs";
import {authURL, token} from "/scripts/state.mjs";
import {showError} from "/scripts/error.mjs";

const results = document.querySelector("main .results");
const addEntryBtn = document.querySelector("main .searchbar button");
let noResults;

export function loadAddButton(type) {
  if (!type) return;
  function newEntry() {
    addEntryBtn.onclick = null;

    noResults = document.querySelector(".no-results");
    if (noResults) noResults.remove();

    const wrapper = createElement("div", "new-entry result");
    const form = createElement("form");
    const titleInput = createElement("input");
    const submitBtn = createElement("button");
    const tick = createElement("img");
    
    wrapper.style.maxHeight = "0px";
    
    form.onsubmit = e => {e.preventDefault(); submitNewEntry(e, type); return false;};
  
    titleInput.type = "text";
    titleInput.autocomplete = "off";
    titleInput.spellcheck = false;
    titleInput.placeholder = "Title";
    titleInput.id = titleInput.name = "title";
    titleInput.maxLength = 50;
  
    submitBtn.type = "submit";
    tick.src = "/images/check.svg";
  
    submitBtn.append(tick);
    form.append(titleInput, submitBtn);
    wrapper.appendChild(form);
    results.insertBefore(wrapper, results.firstChild);
  
    setTimeout(() => {
      requestAnimationFrame(() => {
        wrapper.style = "";
      });
    });
  
    titleInput.focus();
  
    function removeNewEntryForm(e) {
      if (!wrapper.contains(e.target)) {
        wrapper.style.maxHeight = "0px";
        setTimeout(() => wrapper.remove(), 120);
        addEntryBtn.onclick = newEntry; 
        document.body.onclick = null;
        if (noResults) {
          results.append(noResults);
          noResults = null;
        }
      }
    }
  
    requestAnimationFrame(() => {document.body.onclick = removeNewEntryForm;});
  }

  async function submitNewEntry(e, type) {
    const form = e.srcElement;
    const title = new FormData(form).get("title");
    if (title) {
      const body = {title: title};
      const str = JSON.stringify(body);
  
      const options = {
        method: "POST",
        headers: {
          "token": token,
          "content-type": "application/json"
        },
        body: str
      };
  
      fetch(authURL + type + "/add", options)
        .then(response => {
          if (response.ok) {
            loadEntries(null, type);
            addEntryBtn.onclick = newEntry; 
          }
        })
        .catch(err => {
          console.log("Error adding entry:\n" + err);
          if (!navigator.onLine) {
            showError("Sorry, modifiying the list isn't possible while offline.");
          }
        });
    }
  }

  addEntryBtn.onclick = newEntry;
};