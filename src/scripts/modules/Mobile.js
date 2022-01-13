const advantagesSection = document.querySelector(".advantages .section__content");
const advantagesBlock = document.querySelector(".advantages .block");
const advantagesImage = document.querySelector(".advantages .image");

function hideImageCheck() {
  if (advantagesSection.clientHeight - advantagesBlock.clientHeight < 150) {
    advantagesImage.classList.add("hide");
  } else {
    advantagesImage.classList.remove("hide");
  }
}

hideImageCheck();

window.addEventListener('resize', () => {
  hideImageCheck();
});

document.getElementsByTagName("BODY")[0].onselectstart = function (e) {
  e.preventDefault();
  return false;
};
