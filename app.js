let theme = window.localStorage.getItem("theme") || ((window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light");

const themeBtn = document.querySelector(".theme button");
const wordmark = document.querySelector("main .wordmark");
themeBtn.onclick = toggleTheme;

function toggleTheme() {
  if (theme === "dark") {
    theme = "light";
  } else {
    theme = "dark";
  }
  window.localStorage.setItem("theme", theme);
  updateUI();
}

function updateUI() {
  if (theme === "dark") {
    document.body.style = "--text: #fbffff; --background: #111414; --github-background: #2b2f2f;"

    setTimeout(() => {
      themeBtn.style = "--image: url('/images/moon.svg'); --hue: 40;";
      wordmark.src = "/images/wordmark-dark.svg";
    }, 150);
  } else {
    setTimeout(() => {
      themeBtn.style = document.body.style = "";
      wordmark.src = "/images/wordmark.svg";
    }, 150);
  }
}

updateUI();