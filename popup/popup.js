document.addEventListener('DOMContentLoaded', async () => {
  const toggle = document.getElementById('mapToggle');
  const providerText = document.getElementById('currentProvider');

  // Загружаем сохраненные настройки
  const { mapProvider } = await chrome.storage.sync.get('mapProvider');
  const isYandex = mapProvider === 'yandex';
  
  toggle.checked = isYandex;
  providerText.textContent = isYandex ? 'Яндекс' : 'Google';

  // Обработка переключения
  toggle.addEventListener('change', async (e) => {
    const provider = e.target.checked ? 'yandex' : 'google';
    await chrome.storage.sync.set({ mapProvider: provider });
    providerText.textContent = provider === 'yandex' ? 'Яндекс' : 'Google';
  });
});