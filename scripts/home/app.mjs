import {newGrowButton} from "/scripts/home/buttons.mjs";
import {newAccountForm} from "/scripts/home/forms.mjs";
import {showError} from "/scripts/error.mjs";
import {updateState, apiURL, token, user} from "/scripts/state.mjs";

const container = document.querySelector("main .account")
const signup = container.querySelector(".signup");
const signin = container.querySelector(".signin");

let oldSignupForm;
let oldSigninForm;

newGrowButton(signup, () => {
  signup.innerHTML = "";
  signup.style.background = "";
  signup.append(newAccountForm("Sign up", oldSignupForm, SignUp));
}, () => {
  const form = signup.querySelector("form");
  if (form) {
    oldSignupForm = new FormData(form);
  }
});

newGrowButton(signin, () => {
  if (signedIn()) return true;
  signin.innerHTML = "";
  signin.style.background = "";
  signin.append(newAccountForm("Sign in", oldSigninForm, SignIn));
}, () => {
  const form = signin.querySelector("form");
  oldSigninForm = new FormData(form);
});

function getFormData(e) {
  const form = e.srcElement;
  const data = new FormData(form);
  return {
    username: data.get("username"),
    password: data.get("password")
  }
}

function SignUp(e) {
  const data = getFormData(e);
  console.log("")
  const options = {
    method: "POST",
    body: JSON.stringify({
      username: data.username,
      password: data.password
    }),
    headers: {
      "content-type": "application/json"
    }
  }
  fetch(apiURL + "user/signup", options)
    .then(async response => {
      if (response.ok) {
        SignIn(data);
      } else {
        const err = await response.json();
        console.log("Error signing up: " + (err.message || err));
        if (err.message) showError(err.message);
      }
    })
    .catch(err => {
      console.log("Error signing up: " + (err.message || err));
      if (err.message) showError(err.message);
    });
}

function SignIn(e) {
  const {username, password} = (!e.username || !e.password) ? getFormData(e) : e;
  const options = {
    method: "POST",
    body: JSON.stringify({
      username: username,
      password: password
    }),
    headers: {
      "Content-type": "application/json"
    }
  }
  fetch(apiURL + "user/signin", options)
    .then(async response => {
      if (response.ok) {
        const data = await response.json();
        if (data.token) {
          window.localStorage.setItem("token", data.token);
          window.localStorage.setItem("user", username);
          window.location.href = "/dvds";
        }
      } else {
        const err = await response.json();
        console.log("Error signing in: " + (err.message || err));
        if (err.message) showError(err.message);
      }
    })
    .catch(err => {
      console.log("Error signing in: " + (err.message || err));
      if (err.message) showError(err.message);
    });
}

function signedIn() {
  updateState();
  if (token && user) {
    window.location.href = "/dvds";
    return true;
  }
  return false;
}