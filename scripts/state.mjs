export function updateState() {
  user = window.localStorage.getItem("user");
  token = window.localStorage.getItem("token");
  authURL = apiURL + user + "/";
}

export let user = window.localStorage.getItem("user");
export let token = window.localStorage.getItem("token");
export let apiURL = "https://homequery.herokuapp.com/";
export let authURL = apiURL + user + "/";