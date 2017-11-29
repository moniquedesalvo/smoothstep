var lightboxImages = document.querySelectorAll(".image-row img");
var lightboxEl = document.querySelector("#lightbox");
var overlayLeftEl = document.querySelector("#overlayLeftEl");
var overlayRightEl = document.querySelector("#overlayRightEl");
var bodyEl = document.querySelector("body");
var currentImage = null;

function imageWasClicked(e) {
	var el = e.target;
	if (el.matches(".image-row img")) {
		activateLightbox(el);
	}
}
document.addEventListener("click", imageWasClicked);

function activateLightbox(currentImg) {
	var currentLightboxImg = document.querySelector("#lightboxImg img");
	var fullSizedImage = removeTn(currentImg.getAttribute("src")); //string
	bodyEl.classList.add("disableScroll");
	lightboxEl.classList.remove("image-row");
	lightboxEl.style.display = "block";
	lightboxEl.innerHTML = "<div id='lightboxImg'><img src=" + fullSizedImage + "></div>";
	currentImage = currentImg;
	addOverlays();
}

function removeTn(src) {
  var beginning = src.match(/[^_]*/);
  var ending = src.match(/\.(.*)/)[0];
  return beginning + ending;
}

function addOverlays() {
	var currentLightboxImg = document.querySelector("#lightboxImg img");
	currentLightboxImg.onload = function() {
		addOverlayLeftEl();
		addOverlayRightEl();		
	}
}

function addOverlayLeftEl() {
	var currentLightboxImg = document.querySelector("#lightboxImg img");
	var rect = currentLightboxImg.getBoundingClientRect();
	overlayLeftEl.style.visibility = "visible";
	overlayLeftEl.style.left = rect.left + "px";
	overlayLeftEl.style.top = rect.top + "px";
	overlayLeftEl.style.width = (rect.width/2) + "px";
	overlayLeftEl.style.height = rect.height + "px";	
}

function addOverlayRightEl() {
	var currentLightboxImg = document.querySelector("#lightboxImg img");
	var rect = currentLightboxImg.getBoundingClientRect();
	overlayRightEl.style.visibility = "visible";
	overlayRightEl.style.right = rect.left + "px";
	overlayRightEl.style.top = rect.top + "px";
	overlayRightEl.style.width = (rect.width/2) + "px";
	overlayRightEl.style.height = rect.height + "px";
}

function goToPreviousImg() {
	var prevImg = null;
	for (var i = 0; i < lightboxImages.length; i++) {
		var lightboxImage = lightboxImages[i];
		if (currentImage === lightboxImage) {
			if (lightboxImages[i - 1] === undefined) {
				prevImg = lightboxImages[lightboxImages.length - 1];
			} else {
				prevImg = lightboxImages[i - 1];		}
		} 
	}
	activateLightbox(prevImg);
}

function goToNextImg(currentImg) {
	var nextImg = null;
	for (var i = 0; i < lightboxImages.length; i++) {
		var lightboxImage = lightboxImages[i];
		if (currentImage === lightboxImage) {
			if (lightboxImages[i + 1] === undefined) {
				nextImg = lightboxImages[0];
			} else {
				nextImg = lightboxImages[i + 1];
			}
		}
	}
	activateLightbox(nextImg);
}

function deactivateLightbox(e) {
	var el = e.target;
	var keyCode = e.keyCode;
	if (el.matches("#lightbox") || keyCode === 27) {
		lightboxEl.style.display = "none";
		overlayLeftEl.style.visibility = "hidden";
		overlayRightEl.style.visibility = "hidden";
		bodyEl.classList.remove("disableScroll");
	}
}

document.addEventListener("click", deactivateLightbox);

document.addEventListener("keydown", deactivateLightbox);

//prevents scrolling when lightbox is activated on mobile
lightboxEl.addEventListener('touchmove', function(e) {
	e.preventDefault();
});


function keyWasPressed(e) {
	var keyCode = e.keyCode;
	if (keyCode === 37 && lightboxEl.style.display === "block") {
		goToPreviousImg();
	} else if (keyCode === 39 && lightboxEl.style.display === "block") {
		goToNextImg();
	}
} 

document.addEventListener("keydown", keyWasPressed);

overlayLeftEl.addEventListener("click", goToPreviousImg);

overlayRightEl.addEventListener("click", goToNextImg);



