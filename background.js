let color = '#ffffff';
let inv_color = '#000000';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  chrome.storage.sync.set({ inv_color });
});