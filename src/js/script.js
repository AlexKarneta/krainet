const $hamburger = document.querySelector(".hamburger");
const $menu = document.querySelector(".menu");
const $closeElem = document.querySelector(".menu__close");

$hamburger.addEventListener("click", () => {
  $menu.classList.add("active");
});

$closeElem.addEventListener("click", () => {
  $menu.classList.remove("active");
});

const $form = document.querySelector(".contacts__form");

function validation(form) {
  let res = true;

  function removeError(input) {
    const parent = input.parentNode;
    if (parent.classList.contains("error")) {
      parent.querySelector("label.error-label").remove();
      parent.classList.remove("error");
    }
  }
  function createError(input, text) {
    const parent = input.parentNode;

    const errorLabel = document.createElement("label");
    errorLabel.classList.add("error-label");
    errorLabel.textContent = text;

    parent.classList.add("error");
    parent.append(errorLabel);
  }
  const INPUTS = $form.querySelectorAll("input,textarea");
  const MAILFORMAT = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  for (const input of INPUTS) {
    removeError(input);

    if (input.dataset.email) {
      if (!input.value.match(MAILFORMAT)) {
        removeError(input);
        createError(input, "email введен некорректно");
        res = false;
      }
    }
    if (input.dataset.maxLength) {
      if (input.value.length > input.dataset.maxLength) {
        removeError(input);
        createError(input, `максимум ${input.dataset.maxLength} символов`);
        res = false;
      }
    }
    if (!input.value.length) {
      removeError(input);
      createError(input, "поле не заполнено");
      res = false;
    }
  }

  return res;
}

$form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (validation(this)) {
    let formData = new FormData(this);

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        msg: formData.get("text"),

        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }
});
