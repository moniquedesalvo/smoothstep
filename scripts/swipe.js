//swipe
var swipeLeft = new Hammer(overlayRightEl);
var swipeRight = new Hammer(overlayLeftEl);


swipeLeft.get('swipe').set({direction: Hammer.DIRECTION_ALL});

swipeRight.get('swipe').set({direction: Hammer.DIRECTION_ALL});


swipeLeft.on("swipeleft", function () {
	if (lightboxEl.style.display === "block") {
		goToNextImg();
	}
});

swipeRight.on("swiperight", function () {
	if (lightboxEl.style.display === "block") {
		goToPreviousImg();
	}
});

