var popupColorPicker;
var defaultColor = "#0000ff";
window.addEventListener("load", startup, false);


function startup() {
    popupColorPicker = document.querySelector("#popupColorPicker");
    popupColorPicker.value = defaultColor;
    popupColorPicker.addEventListener("input", update_popup_BG_Color, false);
    popupColorPicker.select();
  }

  
function update_popup_BG_Color(event) {
    document.body.style.backgroundColor = event.target.value;
 };
  
  
/*
colorPicker.addEventListener("input", updateFirst, false);
    console.log("AAAAAAAAAAA");

});

function colorChanged()
{
    console.log("AAAAAAAA");
    document.body.style.backgroundColor = "#00000";
}
*/