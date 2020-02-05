export function newGrowButton(btn, openCallback, closeCallback) {
  let initialContents = btn.innerHTML;
  btn.onclick = function onButtonClick() {
    btn.onclick = null;
    initialContents = btn.innerHTML;
    if (openCallback) {
      if (openCallback()) return;
    }
    const wideScreen = !window.matchMedia("(max-width: 800px)").matches;

    btn.style = "width: 80%; height: 12rem; cursor: default;";
    btn.setAttribute("open", "");
    btn.parentElement.style = "max-width: 700px";
    
    if (wideScreen) {
      for (const otherBtn of btn.parentElement.children) {
        if (btn !== otherBtn) {
          otherBtn.style = "width: 0; height: 0; pointer-events: none;";
        }
      }
    }

    btn.onblur = function reset(e) {
      if (closeCallback) {
        if (closeCallback()) return;
      }
      if (!btn.contains(e.relatedTarget)) {
        btn.onclick = onButtonClick;
        btn.removeAttribute("open");
        btn.parentElement.style = "";
        for (const elem of btn.parentElement.children) {
          elem.style = "";
        }
        setTimeout(() => {
          btn.innerHTML = initialContents;
        }, 150);
      } else {
        e.relatedTarget.onblur = reset;
      }
    };
  };
}