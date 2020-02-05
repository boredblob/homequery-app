{
  const accountSettings = document.querySelector(".settings .account");
  accountSettings.querySelector("span").innerHTML += window.localStorage.getItem("user");
  accountSettings.querySelector("button").onclick = () => {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user");
    window.location.href = "/";
  }
}