var lightboxImages = document.querySelectorAll(".image-row img");
var lightboxEl = document.querySelector("#lightbox");
var overlayLeftEl = document.querySelector("#overlayLeftEl");
var overlayRightEl = document.querySelector("#overlayRightEl");
var currentImage = null;


function imageWasClicked (e) {
	var el = e.target;
	if (el.matches(".image-row img")) {
		activateLightbox(el);
	}
}

document.addEventListener("click", imageWasClicked);

function activateLightbox(currentImg) {
	lightboxEl.classList.remove("image-row");
	lightboxEl.style.display = "block";
	lightboxEl.innerHTML = "<div id='lightboxImg'><img src=" + currentImg.getAttribute("src") + "></div>";
	currentImage = currentImg;
	addOverlayLeftEl();
	addOverlayRightEl();
}

function addOverlayLeftEl () {
	var currentLightboxImg = document.querySelector("#lightboxImg img");
	var rect = currentLightboxImg.getBoundingClientRect();
	overlayLeftEl.style.visibility = "visible";
	overlayLeftEl.style.left = rect.left + "px";
	overlayLeftEl.style.top = rect.top + "px";
	overlayLeftEl.style.width = (rect.width/2) + "px";
	overlayLeftEl.style.height = rect.height + "px";
}

function addOverlayRightEl () {
	var currentLightboxImg = document.querySelector("#lightboxImg img");
	var rect = currentLightboxImg.getBoundingClientRect();
	overlayRightEl.style.visibility = "visible";
	overlayRightEl.style.right = rect.left + "px";
	overlayRightEl.style.top = rect.top + "px";
	overlayRightEl.style.width = (rect.width/2) + "px";
	overlayRightEl.style.height = rect.height + "px";
}

function goToPreviousImg () {
	var prevImg = null;
	for (var i = 0; i < lightboxImages.length; i++) {
		var lightboxImage = lightboxImages[i];
		if (currentImage === lightboxImage) {
			if (lightboxImages[i - 1] === undefined) {
				lightboxEl.innerHTML = "<div id='lightboxImg'><img src=" + lightboxImages[lightboxImages.length - 1].getAttribute("src") + "></div>";
				prevImg = lightboxImages[lightboxImages.length - 1];
			} else {
				lightboxEl.innerHTML = "<div id='lightboxImg'><img src=" + lightboxImages[i - 1].getAttribute("src") + "></div>";
				prevImg = lightboxImages[i - 1];
			}
		} 
	}
	currentImage = prevImg;
	addOverlayLeftEl();
	addOverlayRightEl();
}

function goToNextImg (currentImg) {
	var nextImg = null;
	for (var i = 0; i < lightboxImages.length; i++) {
		var lightboxImage = lightboxImages[i];
		if (currentImage === lightboxImage) {
			if (lightboxImages[i + 1] === undefined) {
				lightboxEl.innerHTML = "<div id='lightboxImg'><img src=" + lightboxImages[0].getAttribute("src") + "></div>";
				nextImg = lightboxImages[0];
			} else {
				lightboxEl.innerHTML = "<div id='lightboxImg'><img src=" + lightboxImages[i + 1].getAttribute("src") + "></div>";
				nextImg = lightboxImages[i + 1];
			}
		}
	}
	currentImage = nextImg;
	addOverlayLeftEl();
	addOverlayRightEl();
}

function backgroundWasClicked (e) {
	var el = e.target;
	if (el.matches("#lightbox")) {
		lightboxEl.style.display = "none";
		overlayLeftEl.style.visibility = "hidden";
		overlayRightEl.style.visibility = "hidden";
	}
}

document.addEventListener("click", backgroundWasClicked);

function leftArrowWasPressed (e) {
	var keyName = e.key;
	if (keyName === "ArrowLeft") {
		goToPreviousImg();
	}
} 

document.addEventListener("keydown", leftArrowWasPressed);

function rightArrowWasPressed (e) {
	var keyName = e.key;
	if (keyName === "ArrowRight" && lightboxEl.style.display === "block" ) {
		goToNextImg();
	}
}

document.addEventListener("keydown", rightArrowWasPressed);

function overlayLeftElWasClicked (e) {
	var el = e.target;
	if (el.matches("#overlayLeftEl")) {
		goToPreviousImg();
	}
}

document.addEventListener("click", overlayLeftElWasClicked);

function overlayRightElWasClicked (e) {
	var el = e.target;
	if (el.matches("#overlayRightEl")) {
		goToNextImg();
	}
}

document.addEventListener("click", overlayRightElWasClicked);






