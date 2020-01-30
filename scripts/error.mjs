const errorText = document.querySelector(".error");

export function showError(err = "") {
  errorText.innerHTML = err;
  errorText.style.opacity = 1;
  setTimeout(() => {errorText.style.opacity = 0;}, 10000);
}