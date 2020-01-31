{
  const sidepanel = document.querySelector(".sidepanel");
  const settings = document.querySelector(".settings");
  const prompt = installPrompt();
  const btn = prompt.querySelector(".install-btn");
  let deferredPrompt;
  if (!window.sessionStorage.getItem("hidePrompt")) {
    window.sessionStorage.setItem("hidePrompt", "false");
  }

  window.addEventListener('beforeinstallprompt', e => {
    e.preventDefault();
    deferredPrompt = e;
    if (window.sessionStorage.getItem("hidePrompt") === "false") {
      settings.style.marginTop = "4rem";
      sidepanel.insertBefore(prompt, settings);
    }
  });

  btn.addEventListener('click', () => {
    prompt.style.display = "";
    if (deferredPrompt) {deferredPrompt.prompt();
      deferredPrompt.userChoice
      .then(choice => {
        if (choice.outcome === "accepted") {
          prompt.remove();
        }
        deferredPrompt = null;
      });
    }
  });

  function installPrompt() {
    const wrapper = document.createElement("div");
    const text = document.createElement("span");
    const installBtn = document.createElement("button");
    const rejectBtn = document.createElement("button");

    installBtn.innerHTML = "Install";
    installBtn.className = "install-btn";
    
    rejectBtn.innerHTML = "Not now";
    rejectBtn.className = "reject-btn";

    rejectBtn.onclick = () => {
      window.sessionStorage.setItem("hidePrompt", "true");
      wrapper.remove();
      settings.style.marginTop = "";
    }


    text.innerHTML = "Use this site offline with the web app!";

    wrapper.className = "install"

    wrapper.append(text, rejectBtn, installBtn);
    return wrapper;
  }
}