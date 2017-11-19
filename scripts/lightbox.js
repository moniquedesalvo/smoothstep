		var lightboxImages = document.querySelectorAll(".image-row img");
		var lightboxEl = document.querySelector("#lightbox");
		var currentImage = null;


		function imageWasClicked (e) {
  			var el = e.target;
  			if (el.matches(".image-row img")) {
    			activateLightbox(el);
 			 }
		}
		document.addEventListener("click", imageWasClicked);
		

		function activateLightbox(currentImg) {
			//display image in lightbox div
			lightboxEl.classList.remove("image-row");
			lightboxEl.style.display = "block";
			lightboxEl.innerHTML = "<div id='lightboxImg'><img src=" + currentImg.getAttribute("src") + "></div>";
			currentImage = currentImg;
		}

		function backgroundWasClicked (e) {
			//set lightboxEl to display: none if outside of image is clicked (or if x is clicked)
			var el = e.target;
			if (el.matches("#lightbox")) {
				lightboxEl.style.display = "none";
			}
		}

		document.addEventListener("click", backgroundWasClicked);

		function nextWasClicked (e) {
			var keyName = e.key;
			if (keyName === "ArrowRight" && lightboxEl.style.display === "block" ) {
				console.log("right arrow was pressed");
				goToNextImg();
			}
		}

		document.addEventListener("keydown", nextWasClicked);

		function goToNextImg () {
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
		}

		function previousWasClicked (e) {
			var keyName = e.key;
			// console.log(keyName)
			if (keyName === "ArrowLeft") {
				console.log("left arrow was pressed");
				goToPreviousImg()
			}
		} 

		document.addEventListener("keydown", previousWasClicked);

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
		}