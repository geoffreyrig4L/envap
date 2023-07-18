export function displayMessageWhenButtonClick() {
  const copyElement = document.getElementById("spendNotification");
  copyElement.classList.remove("hide");
  setTimeout(() => {
    copyElement.classList.add("hide");
  }, 3000);
}
