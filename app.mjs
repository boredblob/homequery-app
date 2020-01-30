import {empty} from "/scripts/addFilm.mjs";
import {loadFilms, getFilms} from "/scripts/results.mjs";

const searchbar = document.querySelector("main .searchbar input");

async function app() {
  const data = await getFilms();
  loadFilms(data);
  searchbar.addEventListener("input", function(e) {
    const searchData = [];
    if (this.value) {
      for (const d of data) {
        if (d.title.toLowerCase().includes(this.value.toLowerCase())) {
          searchData.push(d);
        }
      }
      loadFilms(searchData);
    } else {
      loadFilms(data);
    }
  });
}


window.onload = app;