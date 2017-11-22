//swipe
var swipeOverlayRight = new Hammer(overlayRightEl);
var swipeOverlayLeft = new Hammer(overlayLeftEl);


swipeOverlayLeft.get('swipe').set({direction: Hammer.DIRECTION_ALL});

swipeOverlayRight.get('swipe').set({direction: Hammer.DIRECTION_ALL});


swipeOverlayLeft.on("swipeleft", function () {
	if (lightboxEl.style.display === "block") {
		goToNextImg();
	}
});

swipeOverlayLeft.on("swiperight", function () {
	if (lightboxEl.style.display === "block") {
		goToPreviousImg();
	}
});

swipeOverlayRight.on("swipeleft", function () {
	if (lightboxEl.style.display === "block") {
		goToNextImg();
	}
});

swipeOverlayRight.on("swiperight", function () {
	if (lightboxEl.style.display === "block") {
		goToPreviousImg();
	}
});



