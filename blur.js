var canvasWidth=window.innerWidth;
var canvasHeight=window.innerHeight;
var radius=50;
var canvas=document.getElementById("canvas");
var context=canvas.getContext("2d");

canvas.width=canvasWidth;
canvas.height=canvasHeight;

var image=new Image();
var clippingRegion={x:-1,y:-1,r:radius};
var leftMargin=0,topMargin=0;

var theAnimation;

image.src="image.png";
image.onload=function(e){
	$("#blur-div").css({
		"width":canvasWidth+"px",
		"height":canvasHeight+"px"
	});
	topMargin=(image.height-image.height)/2;
	leftMargin=(image.width-canvas.width)/2;
	$("#blur-image").css({
		"width":image.width+"px",
		"height":image.height+"px",
		"top":String(-topMargin)+"px",
		"left":String(-leftMargin)+"px"
	});
	initCanvas();
}
function initCanvas(){
	clearInterval(theAnimation);
	var theleft=leftMargin<0?-leftMargin:0;
	var thetop=topMargin<0?-topMargin:0;
	clippingRegion={x:Math.random()*(canvas.width-2*radius)+radius+theleft,y:Math.random()*(canvas.height-2*radius)+radius+thetop,r:radius};
	draw(image,clippingRegion);
}
function setClippingRegion(clippingRegion){
	context.beginPath();
	context.arc(clippingRegion.x,clippingRegion.y,clippingRegion.r,0,Math.PI*2,false);
	context.clip();
}
function draw(image,clippingRegion){
	context.clearRect(0,0,canvas.width,canvas.height);

	context.save();
	setClippingRegion(clippingRegion);
	context.drawImage(image,Math.max(leftMargin,0),Math.max(topMargin,0),Math.min(canvas.width,image.width),Math.min(canvas.height,image.height),leftMargin<0?-leftMargin:0,topMargin<0?-topMargin:0,Math.min(canvas.width,image.width),Math.min(canvas.height,image.height));
	context.restore();
}

function reset(){
	initCanvas();
}
function show(){
	
	theAnimation=setInterval(function(){
		clippingRegion.r+=20;
		if(clippingRegion.r>Math.max(canvas.width,canvas.height)*2){
			clearInterval(theAnimation);
		}
		draw(image,clippingRegion);
	},30);

}
canvas.addEventListener("touchstart",function(e){
	e.preventDefault();
})