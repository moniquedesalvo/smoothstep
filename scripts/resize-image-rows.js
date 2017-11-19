var paddingSize = 3;

function getAspectRatio(image) {
  return image.naturalWidth / image.naturalHeight;
}

function resizeImageRow(imageRow) {
  if (imageRow.style.display === "block") return; // already successfully resized
  var images = imageRow.querySelectorAll("img")
  var totalAspectRatio = 0;
  for (var i = 0; i < images.length; i++) {
    var image = images[i];
    if (image.naturalHeight === 0) return; // image not done loading, quit
    totalAspectRatio += getAspectRatio(image);
  }
  var totalPadding = paddingSize * images.length;
  for (var i = 0; i < images.length; i++) {
    var image = images[i];
    var fractionalWidth = getAspectRatio(image) / totalAspectRatio;
    image.style.width = "calc((100% - "+totalPadding+"px) * "+fractionalWidth+")";
  }
  imageRow.style.display = "block";
}

function resizeAllImageRows() {
  var imageRows = document.querySelectorAll(".image-row");
  for (var i = 0; i < imageRows.length; i++) {
    var imageRow = imageRows[i];
    resizeImageRow(imageRow);
  }
}

setInterval(resizeAllImageRows, 100);