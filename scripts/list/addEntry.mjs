import {createElement} from "/scripts/createElement.mjs";
import {loadEntries} from "/scripts/list/results.mjs";
import {getSignature} from "/scripts/crypto.mjs";
import {showError} from "/scripts/error.mjs";

const results = document.querySelector("main .results");
const addEntryBtn = document.querySelector("main .searchbar button");

export function loadAddButton(type) {
  if (!type) return;
  function newEntry() {
    addEntryBtn.onclick = null;
    const wrapper = createElement("div", "new-entry result");
    const form = createElement("form");
    const titleInput = createElement("input");
    const submitBtn = createElement("button");
    const tick = createElement("img");
    
    wrapper.style.maxHeight = "0px";
    
    form.onsubmit = e => {submitNewEntry(e, type); return false;};
  
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
          "x-app-signature": await getSignature(str),
          "content-type": "application/json"
        },
        body: str
      };
  
      fetch("https://homequery.herokuapp.com/" + type + "/add", options)
        .then(response => {
          if (response.ok) {
            loadEntries(null, type);
            addEntryBtn.onclick = newEntry; 
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
          console.log("Error adding entry:\n" + err);
          if (!navigator.onLine) {
            showError("Sorry, modifiying the list isn't possible while offline.");
          }
        });
    }
  }

  addEntryBtn.onclick = newEntry;
};