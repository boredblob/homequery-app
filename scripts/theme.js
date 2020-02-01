{
  let theme = window.localStorage.getItem("theme") || ((window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light");

  const themeBtn = document.querySelector(".settings .theme button");
  const themeBtnImage = themeBtn.querySelector("img");
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
      document.body.style = "--primary: #fbffff; --background: #111414; --heavy-border: 1px solid rgba(255, 202, 186, 0.3); --error: #de495e;"

      themeBtnImage.src = "/images/moon.svg";
      themeBtnImage.alt = "Dark";
    } else {
      document.body.style = "";

      themeBtnImage.src = "/images/sun.svg";
      themeBtnImage.alt = "Light";
    }
  }

  updateUI();
}