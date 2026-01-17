const PIXEL_SIZE = 12, SCAN_SPEED = 3, PIXELATION_MULTIPLIER = 2.25;
const c = document.getElementById("c"), ctx = c.getContext("2d");
const btn = document.getElementById("cta"), wrapper = document.querySelector(".wrapper");

let y = 0, anim = null, pixelatedCanvas = null, isAnimating = false;
let canvasWidth = 0, canvasHeight = 0, imageDrawParams = null;

const img = new Image();
img.src = "gengar.jpg";
img.onerror = () => console.error("Erreur lors du chargement de l'image");

img.onload = () => {
  canvasWidth = wrapper.clientWidth || 420;
  canvasHeight = wrapper.clientHeight || 420;
  c.width = canvasWidth;
  c.height = canvasHeight;
  imageDrawParams = calculateCoverDimensions(img.width, img.height, canvasWidth, canvasHeight);
  drawImageCover(img, imageDrawParams);
  pixelatedCanvas = createPixelatedImage(img, canvasWidth, canvasHeight, imageDrawParams);
};

function calculateCoverDimensions(imgW, imgH, cW, cH) {
  const imgR = imgW / imgH, cR = cW / cH;
  const isWider = imgR > cR;
  return {
    sx: isWider ? (imgW - imgH * cR) / 2 : 0,
    sy: isWider ? 0 : (imgH - imgW / cR) / 2,
    sWidth: isWider ? imgH * cR : imgW,
    sHeight: isWider ? imgH : imgW / cR,
    dx: 0, dy: 0, dWidth: cW, dHeight: cH
  };
}

function drawImageCover(image, p) {
  ctx.drawImage(image, p.sx, p.sy, p.sWidth, p.sHeight, p.dx, p.dy, p.dWidth, p.dHeight);
}

function createPixelatedImage(image, w, h, params) {
  const pixelated = document.createElement("canvas");
  pixelated.width = w;
  pixelated.height = h;
  const pCtx = pixelated.getContext("2d");
  
  const temp = document.createElement("canvas");
  temp.width = w / PIXEL_SIZE;
  temp.height = h / PIXEL_SIZE;
  const tCtx = temp.getContext("2d");
  tCtx.imageSmoothingEnabled = pCtx.imageSmoothingEnabled = false;
  
  tCtx.drawImage(image, params.sx, params.sy, params.sWidth, params.sHeight, 0, 0, temp.width, temp.height);
  pCtx.drawImage(temp, 0, 0, temp.width, temp.height, 0, 0, w, h);
  return pixelated;
}

function pixelate() {
  if (!pixelatedCanvas || !imageDrawParams) return;
  drawImageCover(img, imageDrawParams);
  const pixelatedHeight = Math.min(y * PIXELATION_MULTIPLIER, c.height);
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, c.width, pixelatedHeight);
  ctx.clip();
  ctx.drawImage(pixelatedCanvas, 0, 0);
  ctx.restore();
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, pixelatedHeight);
  ctx.lineTo(c.width, pixelatedHeight);
  ctx.stroke();
}

function animate() {
  if (!isAnimating) return;
  y += SCAN_SPEED;
  pixelate();
  y < canvasHeight ? anim = requestAnimationFrame(animate) : stopAnimation();
}

function stopAnimation() {
  if (anim) cancelAnimationFrame(anim);
  anim = null;
  isAnimating = false;
  y = 0;
}

function startAnimation() {
  stopAnimation();
  isAnimating = true;
  if (imageDrawParams) drawImageCover(img, imageDrawParams);
  animate();
}

btn.addEventListener("click", startAnimation);
