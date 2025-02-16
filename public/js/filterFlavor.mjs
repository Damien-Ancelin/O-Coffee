const formElement = document.querySelector(".flavor__form");
const selectElements = document.querySelector("#flavor");

const handleSubmitFlavor = function (event) {
  // ? console.dir(event.target);
  const targetIndex = event.target.selectedIndex;
  if (targetIndex !== 0) {
    formElement.action = `http://localhost:8000/catalog/${targetIndex}`;
    formElement.submit();
  }
};

export const init = function () {
  if (selectElements) {
    selectElements.addEventListener("click", handleSubmitFlavor);
  }
};
