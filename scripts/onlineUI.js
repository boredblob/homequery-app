{
  const onlineIndicator = document.querySelector(".online-indicator");
  let online = navigator.onLine;

  window.ononline = window.onoffline = updateUI;

  function updateUI(e) {
    if (e) {
      online = (e.type === "online") ? true : false;
    }
    if (online) {
      onlineIndicator.style.background = "";
      onlineIndicator.innerHTML = "Online";
    } else {
      onlineIndicator.style.background = "lightcoral";
      onlineIndicator.innerHTML = "Offline";
    }
  }
  updateUI();
}