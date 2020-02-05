import {loadEntries} from "/scripts/list/results.mjs";
import {showError} from "/scripts/error.mjs";
import {authURL, token} from "/scripts/state.mjs";

export async function removeEntry(type, srcbutton, confirmed = false) {
  if (confirmed) {
    const id = srcbutton.parentElement.getAttribute("_id");
    if (!id || !type) return;
  
    const body = {id: id};
    const str = JSON.stringify(body);
  
    const options = {
      method: "POST",
      headers: {
        "token": token,
        "content-type": "application/json"
      },
      body: str
    };
  
    fetch(authURL + type + "/remove", options)
      .then(response => {
        if (response.ok) {
          loadEntries(null, type);
        }
      })
      .catch(err => {
        console.log("Error adding " + type + ":\n" + err);
        if (!navigator.onLine) {
          showError("Sorry, modifiying the list isn't possible while offline.");
        }
      });
  } else {
    srcbutton.style.background = "maroon";
    srcbutton.style.setProperty("--button-filter", "none");
    srcbutton.onclick = function() {removeEntry(type, this, true);};
    srcbutton.onblur = async e => {
      srcbutton.style.background = "";
      srcbutton.style.setProperty("--button-filter", "");
      srcbutton.onclick = function() {removeEntry(type, this);};
      srcbutton.onblur = null;
    }
  }
}