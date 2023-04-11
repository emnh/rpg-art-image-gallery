const gallery = document.querySelector(".gallery");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

let index = 0;

function displayImages(images) {
  gallery.innerHTML = "";

  // Create a dictionary to group images by folder
  const folders = {};

  // Group the images by folder
  images.forEach((image) => {
    const folderPath = image.split("/").slice(0, -1).join("/");
    if (!folders[folderPath]) {
      folders[folderPath] = [];
    }
    folders[folderPath].push(image);
  });

  // Display the images by folder
  for (const folderPath in folders) {
    const folder = document.createElement("div");
    folder.classList.add("folder");

    const folderTitle = document.createElement("h2");
    folderTitle.textContent = folderPath;
    folder.appendChild(folderTitle);

    const folderImages = folders[folderPath];
    folderImages.forEach((image) => {
      const img = document.createElement("img");
      img.src = image;
      folder.appendChild(img);
    });

    gallery.appendChild(folder);
  }
}

function prevImage() {
  index--;

  if (index < 0) {
    index = images.length - 1;
  }

  displayImages(images);
}

function nextImage() {
  index++;

  if (index > images.length - 1) {
    index = 0;
  }

  displayImages(images);
}

prevBtn.addEventListener("click", prevImage);
nextBtn.addEventListener("click", nextImage);

// Fetch the JSON file containing the image paths
fetch("image_files.json")
  .then(response => response.json())
  .then(data => {
    images = data.image_files;
    displayImages(images);
  })
  .catch(error => console.error(error));
