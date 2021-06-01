import {createElement} from "/scripts/createElement.mjs";
import {removeEntry} from "/scripts/list/removeEntry.mjs";
import {editEntry} from "/scripts/list/editEntry.mjs";
import {authURL} from "/scripts/state.mjs"

const results = document.querySelector("main .results");

export async function loadEntries(data_, type) {
  if (!type) return;

  const data = data_ || await getEntries(type);
  while (results.children.length) {
    results.firstChild.remove();
  }

  if (data.length > 0) {
    for (let i = data.length - 1; i >= 0; i--) {
      const d = data[i];
      const result = createElement("div", "result");
      const title = createElement("span", "title", d.title);
      const removeButton = createElement("button", "remove");
      const removeImage = createElement("img");
      const editButton = createElement("button", "edit");
      const editImage = createElement("img");
  
      result.setAttribute("_id", d._id);
  
      removeButton.onclick = function() {removeEntry(type, this);};
      removeImage.src = "/images/x.svg";
      removeImage.alt = "Remove";
  
      editButton.onclick = function() {editEntry(type, this);};
      editImage.src = "/images/edit.svg";
      removeImage.alt = "Edit";
  
      editButton.appendChild(editImage);
      removeButton.appendChild(removeImage);
      result.append(title, editButton, removeButton);
      results.appendChild(result);
    }
  } else {
    results.append(createElement("span", "no-results", "Add some things to see them here!"));
  }
}

export async function getEntries(type) {
  if (!type) return;
  const user = window.localStorage.getItem("user");
  const options = {
    method: "GET",
    headers: {
      "token": window.localStorage.getItem("token")
    }
  };

  try {
    const response = await fetch(authURL + type, options);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch(err) {
    console.log("Error while fetching data.\n", err);
  }
}