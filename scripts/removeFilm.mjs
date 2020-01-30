import {loadFilms} from "/scripts/results.mjs";
import {getSignature} from "/scripts/crypto.mjs";
import {showError} from "/scripts/error.mjs";

export async function removeEntry() {
  const id = this.parentElement.getAttribute("_id");
  if (id) {
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

    const response = await fetch("http://localhost:8080/dvd/remove", options);
    if (response.ok) {
      loadFilms();
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