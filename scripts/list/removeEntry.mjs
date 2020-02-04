import {loadEntries} from "/scripts/list/results.mjs";
import {getSignature} from "/scripts/crypto.mjs";
import {showError} from "/scripts/error.mjs";

export async function removeEntry(type, srcbutton, confirmed = false) {
  if (confirmed) {
    const id = srcbutton.parentElement.getAttribute("_id");
    if (!id || !type) return;
  
    const body = {id: id};
    const str = JSON.stringify(body);
  
    const options = {
      method: "POST",
      headers: {
        "x-app-signature": await getSignature(str),
        "content-type": "application/json"
      },
      body: str
    };
  
    fetch("https://homequery.herokuapp.com/" + type + "/remove", options)
      .then(response => {
        if (response.ok) {
          loadEntries(null, type);
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