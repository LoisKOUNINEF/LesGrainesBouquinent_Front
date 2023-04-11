export function revealPassword() {
    const password = (<HTMLInputElement>document.getElementById("password"));
    const confirm = (<HTMLInputElement>document.getElementById("confirm")) || undefined;
    if (password.type === "password") {
      password.type = "text";
      confirm ? confirm.type = "text" : null;
    } else {
      password.type = "password";
      confirm ? confirm.type = "text" : null;
    }
  } 