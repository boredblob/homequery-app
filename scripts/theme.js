let theme = getCookie("theme") || ((window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light");

const themeBtn = document.querySelector(".settings .theme button");
const themeBtnImage = themeBtn.querySelector("img");
themeBtn.onclick = toggleTheme;

function toggleTheme() {
  if (theme === "dark") {
    theme = "light";
  } else {
    theme = "dark";
  }
  document.cookie = "theme=" + theme + ";path='/';samesite=strict";
  updateUI();
}

function updateUI() {
  if (theme === "dark") {
    document.body.style = "--primary: #fbffff; --background: #111414; --heavy-border: 1px solid rgba(255, 202, 186, 0.3);"

    themeBtnImage.src = "/images/moon.svg";
    themeBtnImage.alt = "Dark";
  } else {
    document.body.style = "";

    themeBtnImage.src = "/images/sun.svg";
    themeBtnImage.alt = "Light";
  }
}

function getCookie(name) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

updateUI();