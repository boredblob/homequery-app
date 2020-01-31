{
  const tokenSettings = document.querySelector(".settings .token");
  const tokenBtn = tokenSettings.querySelector("button");

  tokenBtn.onclick = () => {
    const btn = tokenBtn;
    const form = document.createElement("form");
    const input = document.createElement("input");
    
    form.onsubmit = input.onblur = resetBtn;

    input.type = "text";
    input.autocomplete = "off";
    input.spellcheck = "false";
    input.placeholder = "Token";
    input.id = input.name = "token";
    input.maxLength = 20;
    input.value = window.localStorage.getItem("token") || "";

    form.append(input);
    tokenSettings.replaceChild(form, btn);

    input.focus();


    function resetBtn() {
      input.onblur = null;
      window.localStorage.setItem("token", input.value);
      tokenSettings.replaceChild(btn, form);
      return false;
    }
  }
}