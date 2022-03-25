var popupColorPicker;
var pageColorPicker;
var defaultColor = "#0000ff";

let color = defaultColor;
let inv_color = invertColor(color, true)

window.addEventListener("load", startup, false);


function startup() {

    chrome.storage.sync.set({ color });

    popupColorPicker = document.querySelector("#popupColorPicker");
    popupColorPicker.value = defaultColor;
    popupColorPicker.addEventListener("input", update_popup_BG_Color, false);

    pageColorPicker = document.querySelector("#pageColorPicker");
    pageColorPicker.value = defaultColor;

    pageColorPicker.addEventListener("change", async () => {
        color = pageColorPicker.value
        inv_color = invertColor(color, true)

        chrome.storage.sync.set({ color });
        chrome.storage.sync.set({ inv_color });

        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: update_page_BG_Color,
          });
      });
      
  }

  
function update_popup_BG_Color(event) {
    console.log(event.target.value)
    document.body.style.backgroundColor = event.target.value;
 };

 function update_page_BG_Color(event) {
    chrome.storage.sync.get("color", ({ color }) => {
        document.body.style.backgroundColor = color;
      });

    chrome.storage.sync.get("inv_color", ({ inv_color }) => {
        document.body.style.color = inv_color;
      });

 };

 function invertHex(hex) {
    return (Number(`0x1${hex}`) ^ 0xFFFFFF).toString(16).substr(1).toUpperCase()
  }
  
 function invertColor(hex, bw) {
    if (hex.indexOf('#') === 0) {
        hex = hex.slice(1);
    }
    if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    if (hex.length !== 6) {
        throw new Error('Invalid HEX color.');
    }
    var r = parseInt(hex.slice(0, 2), 16),
        g = parseInt(hex.slice(2, 4), 16),
        b = parseInt(hex.slice(4, 6), 16);
    if (bw) {
        return (r * 0.299 + g * 0.587 + b * 0.114) > 186
            ? '#000000'
            : '#FFFFFF';
    }
    // invert color components
    r = (255 - r).toString(16);
    g = (255 - g).toString(16);
    b = (255 - b).toString(16);
    // pad each with zeros and return
    return "#" + padZero(r) + padZero(g) + padZero(b);
}