export function revealPassword() {
    const password = (<HTMLInputElement>document.getElementById("password"));
    const confirm = (<HTMLInputElement>document.getElementById("confirm"));
    if (password.type === "password") {
      password.type = "text";
      confirm.type = "text";
    } else {
      password.type = "password";
      confirm.type = "password";
    }
  } 