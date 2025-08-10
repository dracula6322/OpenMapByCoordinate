// Можно добавить кнопку в страницу, если нужно
document.addEventListener("mouseup", (event) => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText && isValidCoordinates(selectedText)) {
    // Можно добавить плавающую кнопку
    console.log("Выделены координаты:", selectedText);
  }
});

function isValidCoordinates(text) {
  const coordRegex = /^-?\d{1,3}\.\d+,\s*-?\d{1,3}\.\d+$/;
  return coordRegex.test(text);
}