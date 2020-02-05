import {loadAddButton} from "/scripts/list/addEntry.mjs";
import {loadEntries, getEntries} from "/scripts/list/results.mjs";
import {token, user} from "/scripts/state.mjs";

export default function init(type) {
  if (!token || !user) {
    window.location.href = "/";
  }
  if (!type) return;
  const searchbar = document.querySelector("main .searchbar input");
  loadAddButton(type);

  async function app() {
    const data = await getEntries(type);
    loadEntries(data, type);
    searchbar.addEventListener("input", function(e) {
      const searchData = [];
      if (this.value) {
        for (const d of data) {
          if (d.title.toLowerCase().includes(this.value.toLowerCase())) {
            searchData.push(d);
          }
        }
        loadEntries(searchData, type);
      } else {
        loadEntries(data, type);
      }
    });
  }

  window.onload = app;
}