const imagesArea = document.querySelector(".images");
const gallery = document.querySelector(".gallery");
const galleryHeader = document.querySelector(".gallery-header");
const searchBtn = document.getElementById("search-btn");
const sliderBtn = document.getElementById("create-slider");
const sliderContainer = document.getElementById("sliders");
// selected image
let sliders = [];

const searchInput = document.getElementById("search");
searchInput.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    searchResult();
    loadingTimeOut();
    selectResultShow();
  }
});
const loadingTimeOut = () => {
  setTimeout(() => {
    document.getElementById("spinnerLoading").classList.add("d-none");
    imagesArea.style.display = "block";
  }, 1000);
};

// If this key doesn't work
// Find the name in the url and go to their website
// to create your own api key
const KEY = "15674931-a9d714b6e9d654524df198e00&q";

// show images
const showImages = (images) => {
  imagesArea.style.display = "none";
  gallery.innerHTML = "";
  // show gallery title
  galleryHeader.style.display = "flex";
  images.forEach((image) => {
    let div = document.createElement("div");
    div.className = "col-lg-3 col-md-4 col-xs-6 img-item mb-2";
    div.innerHTML = ` <img class="img-fluid img-thumbnail" onclick=selectItem(event,"${image.webformatURL}") src="${image.webformatURL}" alt="${image.tags}">`;
    gallery.appendChild(div);
  });
  spinnersLoading();
};

const getImages = (query) => {
  fetch(
    `https://pixabay.com/api/?key=${KEY}=${query}&image_type=photo&pretty=true`
  )
    .then((response) => response.json())
    .then((data) => showImages(data.hits))
    .catch((err) => console.log(err));
};

let slideIndex = 0;
const selectItem = (event, img) => {
  let element = event.target;
  element.classList.add("added");

  let item = sliders.indexOf(img);
  if (item === -1) {
    sliders.push(img);
    document.getElementById("selected-images").innerText = sliders.length;
    let selectedShow = document.getElementById("selectImage");
    selectedShow.classList.remove("d-none");
  } else {
    item = sliders.splice(item, 1);
    element.classList.remove("added");
    document.getElementById("selected-images").innerText =
      sliders.length - 1 + 1;
  }
};

var timer;
const createSlider = () => {
  setTimeout(() => {
    document.getElementById("spinnerLoading").classList.add("d-none");
    document.querySelector(".main").style.display = "block";
  }, 500);
  // check slider image length
  if (sliders.length < 2) {
    alert("Select at least 2 image.");
    return;
  }
  // crate slider previous next area
  sliderContainer.innerHTML = "";
  const prevNext = document.createElement("div");
  prevNext.className =
    "prev-next d-flex w-100 justify-content-between align-items-center";
  prevNext.innerHTML = ` 
  <span class="prev" onclick="changeItem(-1)"><i class="fas fa-chevron-left"></i></span>
  <span class="next" onclick="changeItem(1)"><i class="fas fa-chevron-right"></i></span>
  `;

  sliderContainer.appendChild(prevNext);
  document.querySelector(".main").style.display = "none";
  // hide image aria
  imagesArea.style.display = "none";
  const userdurationInput = document.getElementById("durationSlider").value;
  let durationSlider = Math.abs(userdurationInput) || false;
  if (durationSlider <= 0) {
    durationSlider = 1100;
  }
  sliders.forEach((slide) => {
    let item = document.createElement("div");
    item.className = "slider-item";
    item.innerHTML = `<img class="w-100"
    src="${slide}"
    alt="">`;
    sliderContainer.appendChild(item);
  });
  changeSlide(0);
  timer = setInterval(function () {
    slideIndex++;
    changeSlide(slideIndex);
  }, durationSlider);
  spinnersLoading();
};

// change slider index
const changeItem = (index) => {
  changeSlide((slideIndex += index));
};

// change slide item
const changeSlide = (index) => {
  const items = document.querySelectorAll(".slider-item");
  if (index < 0) {
    slideIndex = items.length - 1;
    index = slideIndex;
  }

  if (index >= items.length) {
    index = 0;
    slideIndex = 0;
  }

  items.forEach((item) => {
    item.style.display = "none";
  });

  items[index].style.display = "block";
};

searchBtn.addEventListener("click", function () {
  searchResult();
  loadingTimeOut();
  selectResultShow();
});

const searchResult = () => {
  document.querySelector(".main").style.display = "none";
  clearInterval(timer);
  const search = document.getElementById("search");
  getImages(search.value);
  sliders.length = 0;
};

sliderBtn.addEventListener("click", function () {
  createSlider();
});
// spinner function
const spinnersLoading = () => {
  const loadingDiv = document.getElementById("spinnerLoading");
  loadingDiv.classList.remove("d-none");
};
// image function
const selectResultShow = () => {
  document.getElementById("selected-images").innerText = sliders.length;
  let selectedShow = document.getElementById("selectImage");
  selectedShow.classList.add("d-none");
};