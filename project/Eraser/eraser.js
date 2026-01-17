const canvas = paint;
const brush = canvas.getContext("2d");
brush.fillStyle = "#fff";
brush.fillRect(0, 0, innerwidth, innerheight);
brush.lineCap = "round";
brush.lineWidth = 80;
brush.globalCompositeOperation = "destination-out";