const sidepanel = document.querySelector(".sidepanel");
const overlay = document.querySelector(".overlay");
const main = document.querySelector("main");
const sidepanelBtn = document.querySelector(".sidepanel-btn");
let panelOpen = false;

function toggleSidepanel() {
  if (panelOpen) {
    sidepanel.style = "";
    overlay.style = "";
    main.onclick = null;
    panelOpen = false;
    sidepanelBtn.removeAttribute("checked");
    sidepanelBtn.firstElementChild.src = "/images/menu.svg";
  } else {
    sidepanel.style = "transform: none;";
    overlay.style = "background-color: rgba(0,0,0,0.5);";
    main.onclick = toggleSidepanel;
    panelOpen = true;
    sidepanelBtn.setAttribute("checked", "");
    sidepanelBtn.firstElementChild.src = "/images/x.svg";
  }
}

sidepanelBtn.onclick = toggleSidepanel;