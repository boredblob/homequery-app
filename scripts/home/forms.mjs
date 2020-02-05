import {createElement} from "/scripts/createElement.mjs";

export function newAccountForm(submitBtnText = "", oldSignupForm, submitCallback) {
  const wrapper = createElement("div");
  const form = createElement("form", "account-form");
  const usernameInput = createElement("input", "username");
  const passwordInput = createElement("input", "password");
  const submitBtn = createElement("button", "submit", submitBtnText);

  form.onsubmit = e => {
    e.preventDefault();
    if (submitCallback) submitCallback(e);
    return false;
  };
  
  for (const input of [usernameInput, passwordInput]) {
    input.autocomplete = "off";
    input.spellcheck = false;
    input.maxLength = 50;
    input.required = "true";
  }

  passwordInput.type = "password";
  passwordInput.placeholder = "Password";
  passwordInput.id = passwordInput.name = "password";

  usernameInput.type = "text";
  usernameInput.placeholder = "Username";
  usernameInput.id = usernameInput.name = "username";

  submitBtn.type = "submit";

  if (oldSignupForm) {
    usernameInput.value = oldSignupForm.get("username");
    passwordInput.value = oldSignupForm.get("password");
  }

  form.append(usernameInput, passwordInput, submitBtn);
  wrapper.append(form);
  return wrapper;
}