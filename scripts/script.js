//Variable Initialization
const cursorCoordEl = document.querySelector("#cursor-coord");
const canvasDimensionEl = document.querySelector("#canvas-dimension");
const heightInputEl = document.querySelector("#height-input");
const widthInputEl = document.querySelector("#width-input");
const sizesEl = document.querySelector("#sizes");
const saveImg = document.querySelector("#save-img");
const colorPickers = document.querySelectorAll(
  ".color-container .color-picker"
);
const switchModeBtn = document.querySelector("#switch-mode-btn");
const fillColorBtn = document.querySelector("#fill-color");
const modalityBtns = document.querySelectorAll(".current-modality-btn");
const brushes = document.querySelector("#brushes");
const shapes = document.querySelector("#shapes");
const clearAllBtn = document.querySelector("#clear-all-btn");
const backgroundCanvasEl = document.querySelector("#canvas-background");
const undoBtn = document.querySelector("#undo-btn");
const redoBtn = document.querySelector("#redo-btn");
const exportTypeSelect = document.querySelector("#download-export-type-select");
const downloadManualBtn = document.querySelector("#download-manual");
const saveSectionBtn = document.querySelector("#save-section");
const navbarItems = document.querySelectorAll(".navbar-item");
const generalInfoEl = document.querySelector("#general-info");
const overlay = document.querySelector(".overlay");

const saveContextMenu = document.querySelector(".save-context-menu");
const saveDeleteBtn = document.querySelector("#save-delete-btn");
const saveDownloadBtn = document.querySelector("#save-download-btn");
const savePropertyBtn = document.querySelector("#save-property-btn");
const saveContainer = document.querySelector(".save-container");
const saveNewImageBtn = document.querySelector("#save-new-image-btn");
const saveViewAllBtn = document.querySelector("#save-view-all-btn");
const fileTitleInput = document.querySelector("#file-title");
const fileDescriptionInput = document.querySelector("#file-description");
const newFileBtn = document.querySelector("#new-file-btn");
const viewAllTable = document.querySelector("#view-all-table");

const textAreaInput = document.querySelector("#text-input");
const textBoldBtn = document.querySelector("#text-bold");
const textItalicBtn = document.querySelector("#text-italic");
const textFontSizeSelect = document.querySelector("#font-text-size");
const textFontFamilySelect = document.querySelector("#font-family-select");
const textColorSelect = document.querySelector("#text-color");
const textStyleBtns = document.querySelectorAll(".text-style-btn");
const textPanelContainer = document.querySelector(".text-panel-container");
const textPanelUpDown = document.querySelector("#text-panel-up-down");


const propertyContainerEl = document.querySelector(".property-container");
const propertyFileNameEl = document.querySelector("#property-file-name");
const propertyFileDescriptionEl = document.querySelector(
  "#property-file-description"
);
const propertyCreationDateEl = document.querySelector(
  "#property-creation-date"
);
const propertyLastEditEl = document.querySelector("#property-last-edit");
const propertyResolutionImageEl = document.querySelector(
  "#property-resolution-image"
);

const propertySaveBtn = document.querySelector("#property-save-btn");
const propertyCancelBtn = document.querySelector("#property-cancel-btn");

const initialScaleBtn = document.querySelector("#initial-scale");
const zoomSelectEl = document.querySelector("#zoom-select");
const zoomMinusBtn = document.querySelector("#zoom-minus");
const zoomPlusBtn = document.querySelector("#zoom-plus");
const zoomRangeInput = document.querySelector("#zoom-range-input");

const autosaveModeBtn = document.querySelector("#autosave-mode-btn");
const autosaveTimeSelect = document.querySelector("#autosave-time");
const autosaveStatus = document.querySelector("#autosave-status");

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

//Var Settings
const defaultSize = 1;
const defaultModality = "brush-mode";
const doubleClickIntervalMax = 300;

let width = 3561;
let height = 1536;
let canvasBackgroundColor;
let currentModality = defaultModality;
//!General
//General Info
let messageQueue = [];
let isDisplayingMessage = false;

function generalInfo(infoText, color, time) {
  messageQueue.push({ text: infoText, color: color, time: time });

  if (!isDisplayingMessage) {
    displayNextMessage();
  }
}

function displayNextMessage() {
  if (messageQueue.length > 0) {
    const message = messageQueue.shift();
    isDisplayingMessage = true;

    generalInfoEl.textContent = message.text;
    generalInfoEl.style.backgroundColor = message.color;
    generalInfoEl.classList.add("open");
    generalInfoEl.classList.remove("close");

    setTimeout(() => {
      generalInfoEl.classList.add("close");
      generalInfoEl.classList.remove("open");

      setTimeout(() => {
        isDisplayingMessage = false;
        displayNextMessage();
      }, 1000);
    }, message.time);
  }
}

//Downaload Manual
downloadManualBtn.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "Manuale_d'uso_Applicazione-di-disegno.pdf";

  link.href = "../src/Manuale_d'uso_Applicazione-di-disegno.pdf";

  link.click();
});

//Section Change Menu
document.addEventListener("DOMContentLoaded", showSection("home-section"));

function showSection(sectionId) {
  let sections = document.querySelectorAll(".sections");
  sections.forEach((section) => {
    section.style.display = "none";
  });

  let selectedSection = document.getElementById(sectionId);
  if (selectedSection) {
    selectedSection.style.display = "flex";
  }
}

//Light/Dark Theme
switchModeBtn.addEventListener("change", () => {
  if (switchModeBtn.checked) {
    document.documentElement.classList.remove("light-theme");
    document.documentElement.classList.add("dark-theme");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark-theme");
    document.documentElement.classList.add("light-theme");
    localStorage.setItem("theme", "light");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const getTheme = localStorage.getItem("theme");

  if (getTheme == "dark") {
    switchModeBtn.checked = true;
    document.documentElement.classList.remove("light-theme");
    document.documentElement.classList.add("dark-theme");
  } else {
    switchModeBtn.checked = false;
    document.documentElement.classList.remove("dark-theme");
    document.documentElement.classList.add("light-theme");
  }
});

//Background Color Canvas
document.addEventListener("DOMContentLoaded", () => {
  const getBackgroundCanvas = localStorage.getItem("canvas-background");
  if (getBackgroundCanvas) {
    canvasBackgroundColor = getBackgroundCanvas;
    applyBackgroundColor();
    backgroundCanvasEl.value = getBackgroundCanvas;
  } else {
    canvasBackgroundColor = "#ffffff";
    backgroundCanvasEl.value = "#ffffff";
  }
});

backgroundCanvasEl.addEventListener("input", () => {
  canvasBackgroundColor = backgroundCanvasEl.value;
  applyBackgroundColor();
  localStorage.setItem("canvas-background", canvasBackgroundColor);
});

//Apply Bg Color Canvas
function applyBackgroundColor() {
  ctx.fillStyle = canvasBackgroundColor;
  ctx.fillRect(0, 0, width, height);
}

// Cursor Coord (STATUS BAR)
canvas.addEventListener("mousemove", (e) => {
  const rect = canvas.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;

  x = parseInt(x / currentZoom);
  y = parseInt(y / currentZoom);
  cursorCoordEl.textContent = `${x}, ${y}pixel`;
});
canvas.addEventListener("mouseout", () => {
  cursorCoordEl.textContent = ``;
});

//Canvas Dimension (STATUS BAR)
document.addEventListener("DOMContentLoaded", () => {
  canvasDimensionEl.textContent = `${width} x ${height} pixel`;
});

//Canvas Width and Height
document.addEventListener("DOMContentLoaded", () => {
  widthInputEl.value = width;
  heightInputEl.value = height;
});

widthInputEl.addEventListener("input", () => {
  if (widthInputEl.value < 1) {
    widthInputEl.value = 1;
    width = widthInputEl.value;
    initializeCanvas();
    canvasDimensionEl.textContent = `${width} x ${height} pixel`;
  } else if (widthInputEl.value > 10000) {
    widthInputEl.value = 10000;
    width = widthInputEl.value;
    initializeCanvas();
    canvasDimensionEl.textContent = `${width} x ${height} pixel`;
  } else {
    width = widthInputEl.value;
    initializeCanvas();
    canvasDimensionEl.textContent = `${width} x ${height} pixel`;
  }
});
heightInputEl.addEventListener("input", () => {
  if (heightInputEl.value < 1) {
    heightInputEl.value = 1;
    height = heightInputEl.value;
    initializeCanvas();
    canvasDimensionEl.textContent = `${width} x ${height} pixel`;
  } else if (heightInputEl.value > 10000) {
    heightInputEl.value = 10000;
    height = heightInputEl.value;
    initializeCanvas();
    canvasDimensionEl.textContent = `${width} x ${height} pixel`;
  } else {
    height = heightInputEl.value;
    initializeCanvas();
    canvasDimensionEl.textContent = `${width} x ${height} pixel`;
  }
});

// Initialize canvas
function initializeCanvas() {
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  canvas.width = width;
  canvas.height = height;
  applyBackgroundColor();
  ctx.putImageData(imageData, 0, 0);
}

initializeCanvas();

//Change Size
let size = defaultSize;
sizesEl.addEventListener("change", () => {
  size = parseInt(sizesEl.value);
});

//Sizes Up
function sizeUp() {
  const currentIndex = sizesEl.selectedIndex;
  if (currentIndex < sizesEl.options.length - 1) {
    sizesEl.selectedIndex = currentIndex + 1;
    size = parseInt(sizesEl.value);
  }
}

// Funzione per diminuire le dimensioni
function sizeDown() {
  const currentIndex = sizesEl.selectedIndex;
  if (currentIndex > 0) {
    sizesEl.selectedIndex = currentIndex - 1;
    size = parseInt(sizesEl.value);
  }
}

//Color Picker
let clickCount = 0;
let lastClickTime = 0;
let colorPickerSelected;
let color;

document.addEventListener("DOMContentLoaded", () => {
  colorPickerSelected = document.querySelector("#color-picker-1");
  color = colorPickerSelected.value;
  selectedColorPicker();
});

colorPickers.forEach((colorPicker) => {
  colorPicker.addEventListener("click", (e) => {
    const now = new Date().getTime();

    if (clickCount === 1 && now - lastClickTime <= doubleClickIntervalMax) {
      // Double click
      clickCount = 0;
      colorPickerSelected = e.target;
      selectedColorPicker();

      color = colorPickerSelected.value;
      ctx.strokeStyle = color;
    } else {
      // Single click
      clickCount = 1;
      e.preventDefault();
      colorPickerSelected = e.target;
      selectedColorPicker();
    }

    lastClickTime = now;
  });
});

// Update color when a color picker is clicked
colorPickers.forEach((colorPicker) => {
  colorPicker.addEventListener("click", () => {
    color = colorPicker.value;
  });
  colorPicker.addEventListener("change", () => {
    color = colorPicker.value;
  });
});

function selectedColorPicker() {
  colorPickers.forEach((colorPicker) => {
    colorPicker.style.border = "none";
  });
  colorPickerSelected.style.border = "solid 1px #9A505C";
}

//Draw Tool Selected
let selectedTool, selectedShape;
selectedTool = brushes.value;
selectedShape = shapes.value;

brushes.addEventListener("change", () => {
  selectedTool = brushes.value;
});

//Draw Shape Selected
shapes.addEventListener("change", () => {
  selectedShape = shapes.value;
});

//Modality
modalityBtns.forEach((modalityBtn) => {
  modalityBtn.addEventListener("click", (e) => {
    let modalityClicked = e.currentTarget.id;

    modalityBtns.forEach((btn) => {
      btn.style.border = "none";
    });

    switch (modalityClicked) {
      case "brush-mode":
        modalityBtns[0].style.border = "2px solid #9A505C";
        currentModality = "brush-mode";
        break;

      case "eraser-mode":
        modalityBtns[1].style.border = "2px solid #9A505C";
        currentModality = "eraser-mode";
        break;

      case "shape-mode":
        modalityBtns[2].style.border = "2px solid #9A505C";
        currentModality = "shape-mode";
        break;
      case "text-mode":
        modalityBtns[3].style.border = "2px solid #9A505C";
        currentModality = "text-mode";
        break;
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  modalityBtns[0].style.border = "2px solid #9A505C";
});

//Drawing Listening
let snapshot;
let endX;
let endY;
canvas.addEventListener("contextmenu", () => {
  isDrawing = false;
});
canvas.addEventListener("mousedown", (e) => {
  isDrawing = true;
  [lastX, lastY] = [e.offsetX, e.offsetY];

  if (currentModality == "shape-mode") {
    ctx.beginPath();
    snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  if (selectedTool == "shadow-graduate") {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
  }

  if(currentModality == "text-mode"){
    drawText(e);
  }
});

canvas.addEventListener("mousemove", (e) => {
  if (currentModality == "brush-mode") {
    draw(e);
  } else if (currentModality == "eraser-mode") {
    clear(e);
  } else if (currentModality == "shape-mode") {
    if (shapes.value == "rectangle") {
      drawRect(e);
    } else if (selectedShape == "circle") {
      drawCircle(e);
    } else if (selectedShape == "line") {
      drawLine(e);
    } else if (selectedShape == "triangle") {
      drawTriangle(e);
    } else if (selectedShape == "hexagon") {
      drawHexagon(e);
    } else if (selectedShape == "pentagon") {
      drawPentagon(e);
    } else if (selectedShape == "octagon") {
      drawOctagon(e);
    } else if (selectedShape == "arrow") {
      drawArrow(e);
    }
  }
});

canvas.addEventListener("mouseup", (e) => {
  isDrawing = false;
  if (currentModality == "select-mode") {
    endX = e.offsetX;
    endY = e.offsetY;
  }
});

canvas.addEventListener("mouseout", () => {
  isDrawing = false;
});

//Draw Function
let isDrawing = false;
let lastX = 0;
let lastY = 0;

//Draw (Brushes)
function draw(e) {
  if (!isDrawing) return;

  ctx.strokeStyle = color;
  ctx.lineWidth = size;

  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  // Draw based on selected tool
  if (selectedTool === "brush") {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    lastX = e.offsetX;
    lastY = e.offsetY;
  } else if (selectedTool === "bright-brush") {
    ctx.shadowBlur = 10;
    ctx.shadowColor = color;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    lastX = e.offsetX;
    lastY = e.offsetY;
    ctx.shadowBlur = 0;
  } else if (selectedTool === "shadow-graduate") {
    ctx.shadowBlur = 10 + size / 5;
    ctx.shadowColor = color;

    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    lastX = e.offsetX;
    lastY = e.offsetY;
    ctx.shadowBlur = 0;
  }
}

//Clear (Eraser)
function clear(e) {
  if (!isDrawing) return;

  ctx.strokeStyle = canvasBackgroundColor;
  ctx.lineWidth = size;

  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  lastX = e.offsetX;
  lastY = e.offsetY;
}

//Draw Rectangle
function drawRect(e) {
  if (!isDrawing) return;
  ctx.beginPath();
  // ctx.lineCap = "round";
  // ctx.lineJoin = "round";

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = size;

  ctx.putImageData(snapshot, 0, 0);

  if (!fillColorBtn.checked) {
    return ctx.strokeRect(
      e.offsetX,
      e.offsetY,
      lastX - e.offsetX,
      lastY - e.offsetY
    );
  }
  ctx.fillRect(e.offsetX, e.offsetY, lastX - e.offsetX, lastY - e.offsetY);
}

//Draw Circle
function drawCircle(e) {
  if (!isDrawing) return;
  ctx.beginPath();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = size;

  ctx.putImageData(snapshot, 0, 0);

  let radius = Math.sqrt(
    Math.pow(lastX - e.offsetX, 2) + Math.pow(lastY - e.offsetY, 2)
  );
  ctx.arc(lastX, lastY, radius, 0, 2 * Math.PI);
  if (fillColorBtn.checked) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
}

//Draw Line
function drawLine(e) {
  if (!isDrawing) return;
  ctx.beginPath();

  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = color;
  ctx.lineWidth = size;

  ctx.putImageData(snapshot, 0, 0);

  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
}

//Draw Triangle
function drawTriangle(e) {
  if (!isDrawing) return;
  ctx.beginPath();

  // ctx.lineCap = "round";
  // ctx.lineJoin = "round";
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.fillStyle = color;

  ctx.putImageData(snapshot, 0, 0);

  ctx.moveTo(lastX, lastY);
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.lineTo(lastX * 2 - e.offsetX, e.offsetY);
  ctx.closePath();
  ctx.stroke();
  if (fillColorBtn.checked) {
    ctx.fill();
  }
}

//Draw Esagon
function drawHexagon(e) {
  if (!isDrawing) return;
  ctx.beginPath();

  // ctx.lineCap = "round";
  // ctx.lineJoin = "round";
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.fillStyle = color;

  ctx.putImageData(snapshot, 0, 0);

  let radius = Math.sqrt(
    Math.pow(e.offsetX - lastX, 2) + Math.pow(e.offsetY - lastY, 2)
  );

  let angleIncrement = (Math.PI * 2) / 6;

  ctx.moveTo(lastX + radius, lastY);
  for (let i = 1; i <= 6; i++) {
    let angle = angleIncrement * i;
    let newX = lastX + radius * Math.cos(angle);
    let newY = lastY + radius * Math.sin(angle);
    ctx.lineTo(newX, newY);
  }
  ctx.closePath();
  ctx.stroke();
  if (fillColorBtn.checked) {
    ctx.fill();
  }
}

//Draw Pentagon
function drawPentagon(e) {
  if (!isDrawing) return;
  ctx.beginPath();

  // ctx.lineCap = "round";
  // ctx.lineJoin = "round";
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.fillStyle = color;

  ctx.putImageData(snapshot, 0, 0);

  let radius = Math.sqrt(
    Math.pow(e.offsetX - lastX, 2) + Math.pow(e.offsetY - lastY, 2)
  );

  let startAngle = -Math.PI / 2;

  let angleIncrement = (Math.PI * 2) / 5;

  ctx.moveTo(
    lastX + radius * Math.cos(startAngle),
    lastY + radius * Math.sin(startAngle)
  );

  for (let i = 1; i <= 5; i++) {
    let angle = startAngle + angleIncrement * i;
    let newX = lastX + radius * Math.cos(angle);
    let newY = lastY + radius * Math.sin(angle);
    ctx.lineTo(newX, newY);
  }
  ctx.closePath();
  ctx.stroke();
  if (fillColorBtn.checked) {
    ctx.fill();
  }
}

//Draw Octagon
function drawOctagon(e) {
  if (!isDrawing) return;
  ctx.beginPath();

  // ctx.lineCap = "round";
  // ctx.lineJoin = "round";
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.fillStyle = color;

  ctx.putImageData(snapshot, 0, 0);

  let radius = Math.sqrt(
    Math.pow(e.offsetX - lastX, 2) + Math.pow(e.offsetY - lastY, 2)
  );

  let startAngle = -Math.PI / 8;

  let angleIncrement = (Math.PI * 2) / 8;

  ctx.moveTo(
    lastX + radius * Math.cos(startAngle),
    lastY + radius * Math.sin(startAngle)
  );

  for (let i = 1; i <= 8; i++) {
    let angle = startAngle + angleIncrement * i;
    let newX = lastX + radius * Math.cos(angle);
    let newY = lastY + radius * Math.sin(angle);
    ctx.lineTo(newX, newY);
  }
  ctx.closePath();
  ctx.stroke();
  if (fillColorBtn.checked) {
    ctx.fill();
  }
}

//Draw Arrow
function drawArrow(e) {
  if (!isDrawing) return;
  ctx.beginPath();

  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.strokeStyle = color;
  ctx.lineWidth = size;
  ctx.fillStyle = color;

  ctx.putImageData(snapshot, 0, 0);

  let arrowLength = Math.sqrt(
    Math.pow(e.offsetX - lastX, 2) + Math.pow(e.offsetY - lastY, 2)
  );

  let angle = Math.atan2(e.offsetY - lastY, e.offsetX - lastX);

  let arrowheadLength = 20;

  ctx.moveTo(lastX, lastY);
  ctx.lineTo(
    lastX + arrowLength * Math.cos(angle),
    lastY + arrowLength * Math.sin(angle)
  );

  let arrowheadX1 = e.offsetX - arrowheadLength * Math.cos(angle - Math.PI / 6);
  let arrowheadY1 = e.offsetY - arrowheadLength * Math.sin(angle - Math.PI / 6);
  let arrowheadX2 = e.offsetX - arrowheadLength * Math.cos(angle + Math.PI / 6);
  let arrowheadY2 = e.offsetY - arrowheadLength * Math.sin(angle + Math.PI / 6);

  ctx.moveTo(e.offsetX, e.offsetY);
  ctx.lineTo(arrowheadX1, arrowheadY1);
  ctx.moveTo(e.offsetX, e.offsetY);
  ctx.lineTo(arrowheadX2, arrowheadY2);

  ctx.stroke();
}

//Clear All
clearAllBtn.addEventListener("click", () => {
  clearCanvas();
});

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = canvasBackgroundColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

//Text Panel
modalityBtns.forEach(modalityBtn => {
  modalityBtn.addEventListener("click", ()=>{
    if(currentModality == "text-mode"){
      displayTextPanel();
    }else{
      hideTextPanel();
    }
  });
});

//Display Panel
function displayTextPanel(){
  if(window.getComputedStyle(textPanelContainer).display == "none"){
    textPanelContainer.classList.add("show");
    textPanelContainer.classList.remove("hidden");
  }
}

//Hide panel
function hideTextPanel(){
  textPanelContainer.classList.add("hidden");
  textPanelContainer.classList.remove("show");
}

//verify if bold and italic btns is selected
let isTextBoldSelect = false;
let isTextItalicSelect = false;
textStyleBtns.forEach((textBtn)=>{
  textBtn.addEventListener("click", (e)=>{
    if(window.getComputedStyle(e.currentTarget).borderWidth == "0px"){
      e.currentTarget.style.border = "solid 2px #9A505C";

      if(e.currentTarget.id == "text-bold"){
        isTextBoldSelect = true;
        textAreaInput.style.fontWeight = "bold";
      }else{
        isTextItalicSelect = true;
        textAreaInput.style.fontStyle = "italic";
      }
    }else{
      e.currentTarget.style.border = "none";

      if(e.currentTarget.id == "text-bold"){
        isTextBoldSelect = false;
        textAreaInput.style.fontWeight = "normal";
      }else{
        isTextItalicSelect = false;
        textAreaInput.style.fontStyle = "normal";
      }
    }
  });
});

//Font Family text panel
let textFontFamilyCurrent = "Arial";

textFontFamilySelect.addEventListener("change", ()=>{
  textFontFamilyCurrent = textFontFamilySelect.value;
  textAreaInput.style.fontFamily = textFontFamilyCurrent;
});

//Text Panel Up Down
textPanelUpDown.addEventListener("click", ()=>{
  if(textPanelUpDown.classList.contains("fa-angle-up")){
    textPanelContainer.style.top = "5vh";
    textPanelUpDown.classList.add("fa-angle-down");
    textPanelUpDown.classList.remove("fa-angle-up");
  }else{
    textPanelContainer.style.top = "20vh";
    textPanelUpDown.classList.add("fa-angle-up");
    textPanelUpDown.classList.remove("fa-angle-down");
  }
});

//Font Size text panel
let textFontSizeCurrent = "16";

textFontSizeSelect.addEventListener("change", ()=>{
  textFontSizeCurrent = textFontSizeSelect.value;
});

//Text color panel
let textColorCurrent = "#000000";

textColorSelect.addEventListener("input", ()=>{
  textColorCurrent = textColorSelect.value;
});

//Draw Text Function
function drawText(e){
  ctx.font = `${(isTextBoldSelect == true) ? "bold" : ""} ${(isTextItalicSelect == true) ? "italic" : ""} ${textFontSizeCurrent}px ${textFontFamilyCurrent}`;
  ctx.fillStyle = textColorCurrent;

  const lines = textAreaInput.value.split("\n");

  if(textAreaInput.value == ""){

  }
  lines.forEach((line, index)=>{
    ctx.fillText(line, e.offsetX, e.offsetY + (textFontSizeCurrent * index));
  });
}

//Zoom Functions
let currentZoom = 1;
let minZoom = 0.5;
let maxZoom = 8;
let zoomStep = 0.5;

function zoomIn() {
  const newZoom = currentZoom + zoomStep;
  currentZoom = Math.min(newZoom, maxZoom); // Limita il valore massimo a maxZoom
  applyZoom();
  displayValueZoom();
}

function zoomOut() {
  const newZoom = currentZoom - zoomStep;
  currentZoom = Math.max(newZoom, minZoom); // Limita il valore minimo a minZoom
  applyZoom();
  displayValueZoom();
}

function applyZoom() {
  canvas.style.transform = `scale(${currentZoom})`;
}

function displayValueZoom() {
  let currentZoomPercent = currentZoom * 100;

  zoomRangeInput.value = currentZoomPercent;
  zoomSelectEl.value = currentZoomPercent;
}

//Zoom Range Input
zoomRangeInput.addEventListener("input", (e) => {
  currentZoom = e.target.value / 100;
  applyZoom();
  displayValueZoom();
});

//Zoom Btn Input
zoomMinusBtn.addEventListener("click", () => {
  zoomOut();
});
zoomPlusBtn.addEventListener("click", () => {
  zoomIn();
});

//Zoom Select Input
zoomSelectEl.addEventListener("change", (e) => {
  currentZoom = e.target.value / 100;
  applyZoom();
  displayValueZoom();
});

//Initial Zoom Default
initialScaleBtn.addEventListener("click", () => {
  currentZoom = 1;
  applyZoom();
  displayValueZoom();
});

//History
let history = [];
let historyPointer = -1;

function saveState() {
  historyPointer++;

  if (historyPointer < history.length - 1) {
    history.splice(historyPointer);
  }

  const currentState = canvas.toDataURL();
  history.push(currentState);
}

function undo() {
  if (historyPointer > 0) {
    historyPointer -= 2;

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    img.src = history[historyPointer];
  }
}

function redo() {
  if (historyPointer < history.length - 1) {
    historyPointer += 2;

    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    };
    img.src = history[historyPointer];
  }
}

//Event for Undo & Redo click
undoBtn.addEventListener("click", undo);
redoBtn.addEventListener("click", redo);

//Event for Undo & Redo shortcut

window.addEventListener("keydown", (e) => {
  if (e.ctrlKey) {
    e.preventDefault();
    if (e.key === "z") {
      undo();
    } else if (e.key === "y") {
      redo();
    }
  }
});

canvas.addEventListener("mouseup", saveState);
canvas.addEventListener("mouseout", saveState);
canvas.addEventListener("mousedown", saveState);
canvas.addEventListener("touchend", saveState);

//!Save
//Save section Show
function saveSectionShow(sectionId) {
  let saveSections = document.querySelectorAll(".save-sections");
  saveSections.forEach((section) => {
    section.style.display = "none";
    document.querySelector(".save-navbar-item").style.color =
      "var(--text-color)";
  });
  let selectedSection = document.getElementById(sectionId);
  if (selectedSection) {
    selectedSection.style.display = "flex";
    document.querySelector(".save-navbar-item").style.color = "var(--selected)";
  }
}

//Selected section color save-navbar-item
document.querySelectorAll(".save-navbar-item").forEach((section) => {
  section.style.color = "var(--text-color)";

  section.addEventListener("click", (e) => {
    document.querySelectorAll(".save-navbar-item").forEach((section) => {
      section.style.color = "var(--text-color)";
    });
    section.style.color = "var(--selected)";
  });
});

//Display Initial Section Save
document.addEventListener("DOMContentLoaded", saveSectionShow("save-view-all"));

//Shows/hidden Section Save
saveSectionBtn.addEventListener("click", () => {
  if (saveContainer.classList.contains("hidden")) {
    saveContainer.classList.add("show");
    saveContainer.classList.remove("hidden");
  } else {
    saveContainer.classList.add("hidden");
    saveContainer.classList.remove("show");
  }
});

//Close save container
navbarItems.forEach((item) => {
  item.addEventListener("click", () => {
    if (saveContainer.classList.contains("show")) {
      saveContainer.classList.remove("show");
      saveContainer.classList.add("hidden");
    }
  });
});

//Create New File Logic
newFileBtn.addEventListener("click", () => {
  if (fileTitleInput.value == "" || fileDescriptionInput.value == "") {
    generalInfo("Devi compilare tutti i campi!", "#ff3333", 3000);
  } else {
    putFileInLocalstorage();
    addFileInViewAll();
  }
});

//Put file in localstorage when user ceate new file
function putFileInLocalstorage() {
  const title = fileTitleInput.value;
  const description = fileDescriptionInput.value;
  const canvasImage = canvas.toDataURL();
  const currentBgCanvas = canvasBackgroundColor;

  const existingFiles = JSON.parse(localStorage.getItem("files")) || [];

  const isDuplidate = existingFiles.some((file) => file.title === title);

  if (isDuplidate) {
    generalInfo("Esiste già un file con questo nome!", "#ff3333", 3000);
  } else {
    const newFile = {
      title: fileTitleInput.value,
      description: fileDescriptionInput.value,
      canvasImage: canvas.toDataURL(),
      canvasBg: currentBgCanvas,
      creationDate: dateTimeNow(),
      lastEdit: dateTimeNow(),
    };

    existingFiles.push(newFile);

    localStorage.setItem("files", JSON.stringify(existingFiles));

    generalInfo("File creato con successo!", "#04d904", 3000);

    fileTitleInput.value = "";
    fileDescriptionInput.value = "";
  }
} 

//Put file in table in view all section
let targetTrSaveContext = "";

function addFileInViewAll() {
  const getFiles = JSON.parse(localStorage.getItem("files"));
  viewAllTable.innerHTML = "";

  let trEl = document.createElement("tr");
  let titleHeadEl = document.createElement("th");
  let descriptionHeadEl = document.createElement("th");

  titleHeadEl.textContent = "Titolo";
  descriptionHeadEl.textContent = "Descrizione";

  viewAllTable.appendChild(trEl);
  trEl.appendChild(titleHeadEl);
  trEl.appendChild(descriptionHeadEl);

  getFiles.forEach((file) => {
    let title = file.title;
    let description = file.description;

    let newLine = document.createElement("tr");
    viewAllTable.appendChild(newLine);

    let titleTd = document.createElement("td");
    titleTd.textContent = title;

    let descriptionTd = document.createElement("td");
    descriptionTd.textContent = description;

    newLine.appendChild(titleTd);
    newLine.appendChild(descriptionTd);

    newLine.addEventListener("click", selectFile);

    newLine.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      saveContextMenu.classList.remove("hidden");
      saveContextMenu.style.top = e.clientY + "px";
      saveContextMenu.style.left = e.clientX + "px";
      targetTrSaveContext = e.currentTarget;
    });
  });
}

//Close context menu save if user click outside the tr
window.addEventListener("click", (e) => {
  if (!saveContextMenu.matches(":hover")) {
    closeContextMenuSave();
  }
});

document.addEventListener("DOMContentLoaded", addFileInViewAll);

//Enter key create new file
document.addEventListener("keydown", (e) => {
  const saveNewImage = saveContainer.querySelector("#save-new-image");

  if (saveNewImage && getComputedStyle(saveNewImage).display === "flex") {
    if (e.key == "Enter") {
      newFileBtn.click();
    }
  }
});

//Close context menu save
function closeContextMenuSave() {
  saveContextMenu.classList.add("hidden");
}

//Delete Files Listener
saveDeleteBtn.addEventListener("click", (e) => {
  deleteFile(targetTrSaveContext);
  closeContextMenuSave();
});

//Delete File Function
function deleteFile(target) {
  const getFiles = JSON.parse(localStorage.getItem("files"));

  const filesToDelete = target;
  const filesToDeleteTitle =
    filesToDelete.querySelector("td:nth-child(1)").textContent;
  const indexToDelete = getFiles.findIndex(
    (file) => file.title === filesToDeleteTitle
  );

  filesToDelete.remove();

  generalInfo("File elimato con successo!", "#04d904", 3000);

  if (indexToDelete !== -1) {
    const deletedFile = getFiles.splice(indexToDelete, 1)[0];

    localStorage.setItem("files", JSON.stringify(getFiles));
  }
}

//Download files
saveDownloadBtn.addEventListener("click", () => {
  downloadFile(targetTrSaveContext);
  closeContextMenuSave();
});

//Download File Function
function downloadFile(target) {
  if(exportTypeSelect.value == "png"){
    let imgData = canvas.toDataURL("image/png");
    downloadImage(imgData, "drawing.png");
  }else if(exportTypeSelect.value == "jpeg"){
    let imgData = canvas.toDataURL("image/jpeg");
    downloadImage(imgData, "drawing.jpg");
  }
}

function downloadImage(data, filename) {
  let link = document.createElement("a");
  link.href = data;
  link.download = filename;
  link.click();
}


//Date Time Now
function dateTimeNow() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const dayStr = day < 10 ? "0" + day : day;
  const monthStr = month < 10 ? "0" + month : month;
  const hoursStr = hours < 10 ? "0" + hours : hours;
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;

  return `${dayStr}/${monthStr}/${year} - ${hoursStr}:${minutesStr}`;
}

//Selected File
let currentFileSelected;
function selectFile(e) {
  const filesToSelect = e.currentTarget;
  const title = filesToSelect.querySelector("td:nth-child(1)").textContent;
  const getFiles = JSON.parse(localStorage.getItem("files"));

  const selectedFile = getFiles.find((file) => file.title === title);

  if (selectedFile) {
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      width = img.width;
      height = img.width;

      canvasDimensionEl.textContent = `${img.width} x ${img.height} pixel`;

      widthInputEl.value = img.width;
      heightInputEl.value = img.height;

      canvasBackgroundColor = selectedFile.canvasBg;
      backgroundCanvasEl.value = canvasBackgroundColor;
      localStorage.setItem("canvas-background", canvasBackgroundColor);
    };
    img.src = selectedFile.canvasImage;
  }

  viewAllTable.querySelectorAll("tr:not(:first-child)").forEach((tr) => {
    tr.style.backgroundColor = "var(--tr-bg)";
  });

  filesToSelect.style.backgroundColor = "var(--tr-bg-selected)";

  currentFileSelected = selectedFile;
}

//Save File
function saveFile() {
  if (!currentFileSelected) {
    generalInfo("Nessun file selezionato!", "#ff8000", 3000);
    return;
  }

  const canvasImage = canvas.toDataURL();
  const getFiles = JSON.parse(localStorage.getItem("files")) || [];

  const indexToUpdate = getFiles.findIndex(
    (file) => file.title === currentFileSelected.title
  );

  if (indexToUpdate !== -1) {
    const updatedFile = { ...getFiles[indexToUpdate] };

    updatedFile.canvasImage = canvasImage;
    updatedFile.canvasBg = canvasBackgroundColor;
    updatedFile.lastEdit = dateTimeNow();

    getFiles[indexToUpdate] = updatedFile;

    localStorage.setItem("files", JSON.stringify(getFiles));

    if (!autosaveModeBtn.checked) {
      generalInfo("File salvato con successo!", "#04d904", 3000);
    }
  }
}

saveImg.addEventListener("click", () => {
  saveFile();
});

window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key == "s") {
    saveFile();
  }
});

//Autosave Mode
let autosaveInterval;
autosaveModeBtn.addEventListener("change", () => {
  if (autosaveModeBtn.checked) {
    autosave();
    autosaveStatus.style.display = "block";
  } else {
    stopAutosave();
    autosaveStatus.style.display = "none";
  }
});

function autosave() {
  const autosaveTime = parseInt(autosaveTimeSelect.value);
  autosaveInterval = setInterval(() => {
    saveFile();
  }, autosaveTime * 1000);
}

function stopAutosave() {
  clearInterval(autosaveInterval);
}

autosaveTimeSelect.addEventListener("change", () => {
  if (autosaveModeBtn.checked) {
    stopAutosave();
    autosave();
  }
});

//Property Listener
savePropertyBtn.addEventListener("click", (e) => {
  displayProperty(targetTrSaveContext);
  closeContextMenuSave();
});

function displayProperty(target) {
  propertyContainerEl.classList.remove("hidden");
  propertyContainerEl.classList.add("show");
  document.querySelector(".overlay").classList.remove("hidden");
  document.querySelector(".overlay").classList.add("show");

  const getFiles = JSON.parse(localStorage.getItem("files")) || [];
  const title = target.querySelector("td:nth-child(1)").textContent;
  const selectedFile = getFiles.find((file) => file.title === title);

  if (selectedFile) {
    propertyFileNameEl.value = selectedFile.title;
    propertyFileDescriptionEl.value = selectedFile.description;
    propertyCreationDateEl.textContent = selectedFile.creationDate;
    propertyLastEditEl.textContent = selectedFile.lastEdit;

    const img = new Image();
    img.src = selectedFile.canvasImage;

    img.onload = () => {
      const resolutionText = `${img.width} x ${img.height} pixel`;
      propertyResolutionImageEl.textContent = resolutionText;
    };
  }
}

//Cancel property
propertyCancelBtn.addEventListener("click", () => {
  closeProperty(targetTrSaveContext);
});

function closeProperty(target) {
  propertyContainerEl.classList.add("hidden");
  propertyContainerEl.classList.remove("show");
  overlay.classList.remove("show");
  overlay.classList.add("hidden");
}

//Save Property
propertySaveBtn.addEventListener("click", () => {
  saveProperty(targetTrSaveContext);
});

function saveProperty(target) {
  const propertyFileNameValue = propertyFileNameEl.value;
  const propertyFileDescriptionValue = propertyFileDescriptionEl.value;

  const getFiles = JSON.parse(localStorage.getItem("files")) || [];
  const title = target.querySelector("td:nth-child(1)").textContent;
  const selectedFileIndex = getFiles.findIndex((file) => file.title === title);

  const fileWithTitleExists = getFiles.some((file, index) => {
    return index !== selectedFileIndex && file.title === propertyFileNameValue;
  });

  if (selectedFileIndex !== -1) {
    getFiles[selectedFileIndex].title = propertyFileNameValue;
    getFiles[selectedFileIndex].description = propertyFileDescriptionValue;

    if (
      propertyFileNameValue != "" &&
      propertyFileDescriptionValue != "" &&
      !fileWithTitleExists
    ) {
      localStorage.setItem("files", JSON.stringify(getFiles));

      generalInfo("Proprietà del file salvate con successo!", "#04d904", 3000);

      addFileInViewAll();
      closeProperty();
    } else {
      if (
        (propertyFileNameValue == "" || propertyFileDescriptionValue == "") &&
        fileWithTitleExists
      ) {
        generalInfo(
          "Esiste già un file con questo nome e devi compilare tutti i campi!",
          "#ff3333",
          3000
        );
      } else if (
        propertyFileNameValue == "" ||
        propertyFileDescriptionValue == ""
      ) {
        generalInfo("Devi compilare tutti i campi!", "#ff3333", 3000);
      } else if (fileWithTitleExists) {
        generalInfo("Esiste già un file con questo nome!", "#ff3333", 3000);
      }
    }
  }
}

//!Shortcut
//(Ctrl + Alt + N New File)     (Ctrl + Alt + V)
window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "n" && e.altKey) {
    e.preventDefault();
    saveSectionBtn.click();
    saveNewImageBtn.click();
  }
  if (e.ctrlKey && e.key === "v" && e.altKey) {
    e.preventDefault();
    saveSectionBtn.click();
    saveViewAllBtn.click();
  }
});

//Ctrl + F, G, H, J
window.addEventListener("keydown", (e) => {
  if (e.ctrlKey) {
    if (e.key == "f") {
      e.preventDefault();
      modalityBtns[0].click();
      currentModality == "brush-mode";
    }

    if (e.key == "g") {
      e.preventDefault();
      modalityBtns[1].click();
      currentModality == "eraser-mode";
    }

    if (e.key == "h") {
      e.preventDefault();
      modalityBtns[2].click();
      currentModality == "shape-mode";
    }
    if (e.key == "j") {
      e.preventDefault();
      modalityBtns[3].click();
      currentModality == "text-mode";
    }
  }
});

//Ctrl + C
window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key == "c") {
    e.preventDefault();
    clearCanvas();
  }
});

//Ctrl + O, I
window.addEventListener("keydown", (e) => {
  if (e.ctrlKey) {
    if (e.key == "i") {
      e.preventDefault();
      sizeUp();
    }
    if (e.key == "o") {
      e.preventDefault();
      sizeDown();
    }
  }
});

//Zoom Ctrl + / Ctrl -
window.addEventListener("keydown", (e) => {
  if (e.ctrlKey) {
    e.preventDefault();
    if (e.key === "+") {
      zoomIn();
    } else if (e.key === "-") {
      zoomOut();
    }
  }
});

//Ctrl + L
window.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key == "l") {
    e.preventDefault();
    initialScaleBtn.click();
  }
});
