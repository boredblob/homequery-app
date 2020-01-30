import {loadFilms} from "/scripts/results.mjs";
import {getSignature} from "/scripts/crypto.mjs";

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
    }
  }
}