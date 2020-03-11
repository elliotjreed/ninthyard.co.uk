import "./scss/styles.scss";
import "whatwg-fetch";

const form: HTMLFormElement = document.getElementById(
  "form"
) as HTMLFormElement;
const emailInput = document.getElementById("email") as HTMLInputElement;
const nameInput = document.getElementById("name") as HTMLInputElement;
form.addEventListener("submit", async function(event) {
  event.preventDefault();

  const successArea = document.getElementById("success");
  const errorArea = document.getElementById("error");

  const result = await fetch(form.action, {
    method: form.method,
    body: new URLSearchParams(new FormData(form) as any)
  })
    .then((response: Response) => {
      if (!response.ok) throw Error(response.statusText);
      return response;
    })
    .then((response: Response) => response.json())
    .then((json: string | boolean) => {
      if (json === true) {
        errorArea.innerHTML = "";
        successArea.innerHTML =
          '<div class="alert alert-success">Thank you! We will get back to you shortly.</div>';
        nameInput.value = "";
        emailInput.value = "";
      } else {
        successArea.innerHTML = "";
        errorArea.innerHTML =
          '<div class="alert alert-warning">' + json + "</div>";
      }
    })
    .catch(error => console.log(error));
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", (): void => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}
