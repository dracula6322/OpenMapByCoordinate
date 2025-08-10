// Проверка координат
function isValidCoordinates(text) {
  if (!text) return false;
  return /^-?\d{1,3}\.\d+,\s*-?\d{1,3}\.\d+$/.test(text.trim());
}

// Создаем пункты меню
chrome.runtime.onInstalled.addListener(() => {
   
  chrome.contextMenus.create({
    id: "openLatLon",
    title: "Открыть (Широта, Долгота)",
    contexts: ["selection"]
  });
  
  chrome.contextMenus.create({
    id: "openLonLat",
    title: "Открыть (Долгота, Широта)",
    contexts: ["selection"]
  });
});

// Обработка клика
chrome.contextMenus.onClicked.addListener(async (info) => {
  const text = info.selectionText?.trim();
  if (!isValidCoordinates(text)) return;

  const [coord1, coord2] = text.split(',').map(s => s.trim());
  const { mapProvider } = await chrome.storage.sync.get('mapProvider');

  let url;
  if (info.menuItemId === "openLonLat") {
    url = mapProvider === 'yandex' 
      ? `https://yandex.ru/maps/?pt=${coord2},${coord1}`
      : `https://www.google.com/maps?q=${coord2},${coord1}`;
  } else {
    url = mapProvider === 'yandex'
      ? `https://yandex.ru/maps/?pt=${coord1},${coord2}`
      : `https://www.google.com/maps?q=${coord1},${coord2}`;
  }

  chrome.tabs.create({ url });
});