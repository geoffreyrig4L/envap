export function displayMessageWhenButtonClick(element, time) {
  return new Promise((resolve) => {
    const copyElement = document.getElementById(element);
    copyElement.classList.remove("hide");
    setTimeout(() => {
      copyElement.classList.add("hide");
      resolve();
    }, time);
  });
}

export function disableButton(element) {
  const createButton = document.getElementById(element);
  createButton.setAttribute("disabled", "");
  createButton.classList.add("disabled");
  createButton.classList.remove("enabled");
}
