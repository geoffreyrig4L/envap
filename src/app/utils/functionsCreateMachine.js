export function displayMessageWhenButtonClick(element) {
  return new Promise((resolve) => {
    const copyElement = document.getElementById(element);
    copyElement.classList.remove("hide");
    setTimeout(() => {
      copyElement.classList.add("hide");
      resolve(); // Résoud la promesse une fois que le délai d'attente est terminé
    }, 1500);
  });
}

export function disableCreateButton() {
  const createButton = document.getElementById("createButton");
  createButton.setAttribute("disabled", "");
  createButton.classList.add("disabled");
  createButton.classList.remove("enabled");
}
