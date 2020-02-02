let theme = window.localStorage.getItem("theme") || ((window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light");

if (theme === "dark") {
  document.body.style = 
    `--text: #f0f0f2;
    --background: #0a0b0d;
    --button: #f0f0f2;
    --hover: #b0b0c0;
    --button-text: var(--background);
    --dark-filter: brightness(0.8);
    --circle-filter: saturate(0.4) opacity(0.2);
    `;
}